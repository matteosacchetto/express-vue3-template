const root = require('app-root-path');

const httpUtils = require(`${root}/lib/http-utils.js`);

const notFound = (req, res) => {
  // Send a 404 HTTP Code
  res.send(httpUtils.createResponse(404));
};

module.exports = notFound;
