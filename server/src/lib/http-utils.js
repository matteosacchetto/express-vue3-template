// Node modules
const httpStatusCodes = require('http-status-codes');

// Create utility object
const httpUtils = {
  // Create a response with a default message
  createResponse: (code, data = undefined) => {
    const res = {
      status: code,
      message: httpStatusCodes.getStatusText(code),
      data,
    };

    return res;
  },
  // Create a response with a custom message
  createResponseWithMessage: (code, message, data = undefined) => {
    const res = {
      status: code,
      message,
      data,
    };

    return res;
  },
};

module.exports = httpUtils;
