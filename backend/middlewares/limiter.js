const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  legacyHeaders: false,
  windowMS: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
});

module.exports = limiter;
