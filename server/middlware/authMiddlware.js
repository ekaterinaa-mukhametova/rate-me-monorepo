const { checkAuthToken, decodeAuthToken } = require('../helpers/jsonWebToken');
const db = require('../models/dataBase');

const checkAuthMiddlware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const { email } = decodeAuthToken({ token });
    const { password } = await db.one('SELECT password FROM users WHERE email = $1', [email]);
    checkAuthToken({ token, secret: password });
    return next();
  } catch (err) {
    return res.sendStatus(401);
  }
};

module.exports = checkAuthMiddlware;
