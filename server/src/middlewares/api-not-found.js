const root = require('app-root-path');

const httpUtils = require(`${root}/lib/http-utils.js`);

const apiNotFound = (req, res, next) => {
  // Send a 404 HTTP Code
  res.send(httpUtils.createResponse(404));
  
  next();
};

module.exports = apiNotFound;
