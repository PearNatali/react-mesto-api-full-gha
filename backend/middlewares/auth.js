const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = require('../app.config');

const { AuthError } = require('../errors/AuthError');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization: jwtToken } = req.headers;
  if (!jwtToken) {
    next(new AuthError('Необходима авторизация'));
    return;
  }
  const token = extractBearerToken(jwtToken);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new AuthError(err.message));
    return;
  }

  req.user = payload;

  next();
};
