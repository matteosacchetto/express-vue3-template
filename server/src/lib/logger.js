// Modules
const winston = require('winston');
const root = require('app-root-path');
const path = require('path');

// Load App Configuration
const config = require('./config');

// Create the logger
const logger = winston.createLogger({
  level: 'info',
  transports: config.useStdout
    ? []
    : [
        new winston.transports.File({
          format: winston.format.combine(
            // We want to log timestamp + json
            winston.format.timestamp(),
            winston.format.json()
          ),
          filename: path.join(`${root}`, 'logs', 'error.log'),
          level: 'error',
        }),
        new winston.transports.File({
          format: winston.format.combine(
            // We want to log timestamp + json
            winston.format.timestamp(),
            winston.format.json()
          ),
          filename: path.join(`${root}`, '..', 'logs', 'app.log'),
        }),
      ],
});

// If we are not in production or if we want to log on stdout => then we log also to console
if (config.environment !== 'production' || config.useStdout) {
  logger.add(
    new winston.transports.Console({
      format: config.useStdout
        ? winston.format.combine(
            // We want to log only to stdout => timestamp + json
            winston.format.timestamp(),
            winston.format.json()
          )
        : winston.format.combine(
            // We are logging also on console => colorize + simple
            winston.format.colorize(),
            winston.format.simple()
          ),
    })
  );
}

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message.replace(/\n$/, ''));
  },
};

// Export the router
module.exports = logger;
