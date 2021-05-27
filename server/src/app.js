// Node modules
const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

// Loading App Configuration
const config = require('./lib/config');

// Custom modules
const logger = require('./lib/logger');
const httpUtils = require('./lib/http-utils');

// Custom middlewares
const responseStatus = require('./middlewares/response-status');

// Custom routes
const notFound = require('./routes/not-found');
const apiRoute = require('./routes/api');

// Define rate-limiter (`max` request per `windowsMs`)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 250, // limit each IP to 250 requests per windowMs
  message: httpUtils.createResponse(429), // Too many requests
});

// Create app
const app = express();

// Define middlewares
if (config.environment === 'development') {
  // Middlewares used in development
  app.use(morgan('tiny', { stream: logger.stream })); // Logger
} else if (config.environment === 'production') {
  // Middlewares used in production
  app.use(morgan('combined', { stream: logger.stream })); // Logger
  app.use(compression()); // G-Zip compression
}

app.use(express.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
app.use(express.json()); // Parse application/json
app.use(helmet()); // Security
app.use(hpp()); // Prevent HTTP Parameter Pollution

// Define custom middleware
if (config.useStatic) {
  // Define API middlewares
  app.use('/api', limiter); // Apply the limit to all API requests
  app.use('/', responseStatus); // HTTP response status is coherent with message status
} else {
  // Use the custom middlewares on all requests
  app.use('/', limiter); // Apply the limit to all API requests
  app.use('/', responseStatus); // HTTP response status is coherent with message status
}

// Define routes -> TODO: write here your code
app.use('/api/v1', apiRoute);

if (config.useStatic) {
  // Define static folder
  app.use(express.static(config.staticFolder));

  // Handle '*' on /api and children
  app.all(['/api', '/api/*'], notFound); // If a request for the /api/* has not been served => return 404

  // Serve SPA
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: config.staticFolder });
  });

  app.all('*', notFound);
} else {
  // Handle '*' on all requests
  app.all('*', notFound); // If a request for * has not been served => return 404
}

if (config.useHttp) {
  // Starting http server
  const httpServer = http.createServer(app);

  // It listens on port httpPort
  httpServer.listen(config.httpPort, () => {
    logger.info(`HTTP Server running on port ${config.httpPort}`);
  });
}

if (config.useHttps) {
  // Certificate
  const privateKey = fs.readFileSync(config.sslKeyPath, 'utf8');
  const certificate = fs.readFileSync(config.sslCertPath, 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
  };

  // Starting https server
  const httpsServer = https.createServer(credentials, app);

  // It listens on port httpsServer
  httpsServer.listen(config.httpsPort, () => {
    logger.info(`HTTPS Server running on port ${config.httpsPort}`);
  });
}
