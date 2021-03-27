const jwt = require('jsonwebtoken');
const secret = require('../utils/secret');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      res.status(403).send({ message: 'Authentication failed!' });
    }
    const decodedToken = jwt.verify(token, secret.secret);
    req.userData = { userId: decodedToken.userId };
    return next();
  } catch (err) {
    return res.status(403).send({ message: 'Authentication failed!' });
  }
};
