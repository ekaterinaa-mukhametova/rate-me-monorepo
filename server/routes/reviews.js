const express = require('express');
const db = require('../models/dataBase');
const checkAuthMiddlware = require('../middlware/authMiddlware');
const { decodeAuthToken } = require('../helpers/jsonWebToken');
const reviewSchema = require('../schemas/review');
const mapReviewsToFront = require('../mappers/mapReviewsToFront');
const Review = require('../models/Review');

const review = new Review();

const router = express.Router();

router.get('/review-categories', async (req, res) => {
  try {
    const categories = await db.any('SELECT * FROM review_category');
    const mappedCategories = categories.map((el) => el.name);
    return res.send({ result: 'ok', categories: mappedCategories });
  } catch (err) {
    return res.send({ result: 'error', message: err.message });
  }
});

router.get('/my-reviews/:userId', checkAuthMiddlware, async (req, res) => {
  const { userId: requestedUserId } = req.params;
  const authHeader = req.headers.authorization;
  try {
    const reviewerName = await review.getReviewerName({ authHeader });

    const token = authHeader.split(' ')[1];
    const { email } = decodeAuthToken({ token });
    const { user_id: whomRequestUserId } = await db.one('SELECT user_id FROM users WHERE email = $1', [email]);
    const isUserTheSame = whomRequestUserId === requestedUserId;
    if (!isUserTheSame) {
      return res.sendStatus(403);
    }
    const allUserReviews = await db.any(`SELECT * FROM ${review.tableName} WHERE ${reviewSchema.reviewerName} = $1`, [reviewerName]);
    return res.send({ result: 'ok', allUserReviews });
  } catch (err) {
    return res.send({ result: 'error', message: err.message });
  }
});

router.get('/latest-reviews', async (req, res) => {
  const { dateFrom, dateTo } = req.query;
  try {
    const latestReviews = await db.any(`SELECT * FROM ${review.tableName} WHERE ${reviewSchema.reviewDate} BETWEEN $1 AND $2`, [dateFrom, dateTo]);
    const mappedReviews = mapReviewsToFront(latestReviews);
    res.send({ result: 'ok', latestReviews: mappedReviews });
  } catch (err) {
    res.send({ result: 'error', message: err.message });
  }
});

router.get('/popular-reviews', async (req, res) => {
  try {
    const allReviews = await db.any(`SELECT * FROM ${review.tableName}`);
    const mappedReviews = mapReviewsToFront(allReviews);
    const popularReviews = mappedReviews.sort(
      (a, b) => b.amountOfLikes - a.amountOfLikes,
    ).slice(0, 5);
    res.send({ result: 'ok', popularReviews });
  } catch (err) {
    res.send({ result: 'error', message: err.message });
  }
});

module.exports = router;
