const jwt = require('jsonwebtoken');

const createAuthToken = ({ email, password }) => {
  const token = jwt.sign({ email }, password, { expiresIn: 60 * 60 * 24 * 7 * 30 });
  return token;
};

const checkAuthToken = ({ token, secret }) => {
  const isTokenCorrect = jwt.verify(token, secret);
  return isTokenCorrect;
};

const decodeAuthToken = ({ token }) => {
  const decodedToken = jwt.decode(token);
  return decodedToken;
};

module.exports = { createAuthToken, checkAuthToken, decodeAuthToken };
