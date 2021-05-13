// Node modules
const httpStatusCodes = require('http-status-codes');

// Create utility object
const httpUtils = {};

// Create utility functions
httpUtils.createResponse = (code, data = undefined) => {
  const res = {
    statusCode: code,
    message: httpStatusCodes.getStatusText(code),
    data,
  };

  return res;
};

module.exports = httpUtils;
