const mung = require('express-mung');

const responseStatus = mung.json((body, req, res) => {
  if (body.status) {
    // Set response status code
    res.status(body.status);
  }

  return body;
});

module.exports = responseStatus;
