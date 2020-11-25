const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const expiresIn = '7d';

module.exports.genereteToken = (id) => jwt.sign(
  { _id: id },
  NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  { expiresIn },
);
