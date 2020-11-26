const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = async function (req, res, next) {
  try {
    const { authorization } = req.headers;
    console.log('==================== 1');
    console.log(authorization);
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('Необходима авторизация');
    } else {
      const token = await extractBearerToken(authorization);
      const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
      console.log(token);
      console.log('==================== 2');
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
    console.log(err);
    next(err);
  }
};
