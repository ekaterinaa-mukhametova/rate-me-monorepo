const { decodeAuthToken } = require('../helpers/jsonWebToken');
const db = require('../models/dataBase');

const isReviewAuthorMiddlware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  const { reviewId } = req.params;
  const { email } = decodeAuthToken({ token });

  try {
    const {
      name,
    } = await db.one('SELECT name FROM users WHERE email = $1', [email]);
    const { reviewer_name: nameOfReviewer } = await db.one('SELECT reviewer_name FROM reviews WHERE review_id = $1', [reviewId]);
    if (nameOfReviewer !== name) {
      throw new Error('User is not authorized for this action');
    }
    return next();
  } catch (err) {
    return res.sendStatus(401);
  }
};

module.exports = isReviewAuthorMiddlware;
