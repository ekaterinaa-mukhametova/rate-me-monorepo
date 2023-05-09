const { decodeAuthToken } = require('../helpers/jsonWebToken');
const db = require('../models/dataBase');

const isAdminMiddlware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  const { email } = decodeAuthToken({ token });

  try {
    const {
      is_admin: isUserAdmin,
    } = await db.one('SELECT is_admin FROM users WHERE email = $1', [email]);
    if (!isUserAdmin) {
      throw new Error('User is not authorized for this action');
    }
    return next();
  } catch (err) {
    if (err.message === 'User is not authorized for this action') {
      return res.sendStatus(401);
    }
    return res.send({ result: 'error', message: err.message });
  }
};

module.exports = isAdminMiddlware;
