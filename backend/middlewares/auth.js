const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = async function (req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('Необходима авторизация');
    } else {
      const token = await extractBearerToken(authorization);
      const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
          throw new UnauthorizedError('Необходима авторизация');
        } else {
          req.user = decoded;
          next();
        }
      });
    }
  } catch (err) {
    next(err);
  }
};
