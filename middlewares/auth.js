const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');
const { needToAuthMsg, JWT_SECRET } = require('../constants/constants');

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization) {
    next(new UnauthorizedError(needToAuthMsg));
    return;
  }

  const token = authorization;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(needToAuthMsg));
    return;
  }

  req.user = payload;
  next();
};
