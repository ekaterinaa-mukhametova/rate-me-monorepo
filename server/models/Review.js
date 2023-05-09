const { decodeAuthToken } = require('../helpers/jsonWebToken');
const reviewSchema = require('../schemas/review');
const db = require('./dataBase');

class Review {
  tableName = 'reviews';

  // eslint-disable-next-line class-methods-use-this
  getReviewerName = async ({ authHeader }) => {
    const token = authHeader.split(' ')[1];
    const { email } = decodeAuthToken({ token });
    try {
      const { name: reviewerName } = await db.one('SELECT name FROM users WHERE email = $1', [email]);
      return reviewerName;
    } catch (err) {
      return null;
    }
  };

  isReviewAuthor = async ({ authHeader, reviewId }) => {
    try {
      const reviewerName = await this.getReviewerName({ authHeader });
      const { [reviewSchema.reviewerName]: nameFromDb } = await db.one(`SELECT ${reviewSchema.reviewerName} FROM ${this.tableName} WHERE ${reviewSchema.reviewId} = $1`, [reviewId]);
      if (reviewerName !== nameFromDb) {
        throw new Error('User is not authorized for this action');
      }
    } catch (err) {
      throw new Error('User is not authorized for this action');
    }
  };
}

module.exports = Review;
