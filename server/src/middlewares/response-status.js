const mung = require('express-mung');

const responseStatus = mung.json((body, req, res) => {
  if (body.statusCode) {
    // Set response status code
    res.status(body.statusCode);
  }

  return body;
});

module.exports = responseStatus;
