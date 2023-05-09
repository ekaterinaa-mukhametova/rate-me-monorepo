const express = require('express');
const pgp = require('../libs/pg-promise');
const db = require('../models/dataBase');
const { generateHash } = require('../helpers/crypto');
const checkAuthMiddlware = require('../middlware/authMiddlware');
const isReviewAuthorMiddlware = require('../middlware/isReviewAuthorMiddlware');
const { insertValuesOnDB, updateValuesOnDB } = require('../helpers/pg-promise');
const reviewSchema = require('../schemas/review');
const Review = require('../models/Review');

const reviewCommentSchema = require('../schemas/reviewComment');

const getReviewComments = async ({ reviewId }) => {
  const reviewComments = await db.any(`SELECT * FROM review_comment WHERE ${reviewCommentSchema.reviewId} = $1`, [reviewId]);
  return reviewComments;
};

const review = new Review();

const router = express.Router();

router.get('/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  try {
    const selectedReview = await db.one(`SELECT * FROM ${review.tableName} WHERE ${reviewSchema.reviewId} = $1`, [reviewId]);
    const comments = await getReviewComments({ reviewId });
    return res.send({ result: 'ok', review: selectedReview, comments });
  } catch (err) {
    if (err.message === 'No data returned from the query.') {
      return res.send({ result: 'error', message: 'Review doesn\'t exist' });
    }
    return res.send({ result: 'error', message: err.message });
  }
});

router.put('/', checkAuthMiddlware, isReviewAuthorMiddlware, async (req, res) => {
  const { review: reviewData } = req.body.data;
  const authHeader = req.headers.authorization;
  const { reviewerName } = reviewData;
  let reviewId;

  // add logic for tags table
  // add logic for saving images in cloud

  const insertedData = {};
  Object.entries(reviewData).forEach(([key, value]) => {
    insertedData[reviewSchema[key]] = value;
  });
  const isReviewJustCreated = !reviewData.reviewId;
  const columnSet = Object.keys(insertedData);

  try {
    if (isReviewJustCreated) {
      const creationDate = Date.now().toString();
      reviewId = generateHash([reviewerName, creationDate]);
      const { now: reviewDate } = await db.one('SELECT NOW()::timestamp');
      insertedData[reviewSchema.reviewDate] = reviewDate;
      columnSet.push(reviewSchema.reviewDate);
      insertedData[reviewSchema.reviewId] = reviewId;
      columnSet.push(reviewSchema.reviewId);
      await insertValuesOnDB({ table: review.tableName, columnSet, values: [{ ...insertedData }] });
    } else {
      reviewId = reviewData.reviewId;
      await review.isReviewAuthor({ authHeader, reviewId });
      columnSet.forEach((el, index) => {
        if (el === reviewSchema.reviewId) {
          columnSet[index] = `?${reviewSchema.reviewId}`;
        }
      });
      const condition = 'WHERE v.review_id = t.review_id';
      await updateValuesOnDB({
        table: review.tableName,
        columnSet,
        values: [insertedData],
        condition,
      });
    }
    return res.send({ result: 'ok' });
  } catch (err) {
    if (err.message === 'User is not authorized for this action') {
      return res.sendStatus(401);
    }
    return res.send({ result: 'error', message: err.message });
  }
});

router.delete('/:reviewId', checkAuthMiddlware, isReviewAuthorMiddlware, async (req, res) => {
  const { reviewId } = req.params;
  const authHeader = req.headers.authorization;

  try {
    await review.isReviewAuthor({ authHeader, reviewId });
    await db.none(`DELETE FROM ${review.tableName} WHERE ${reviewSchema.reviewId} = $1`, [reviewId]);
    res.send({ result: 'ok' });
  } catch (err) {
    res.send({ result: 'error', message: err.message });
  }
});

router.put('/:reviewId/like', checkAuthMiddlware, async (req, res) => {
  const { reviewId } = req.params;
  const { isLiked, name } = req.body.data;

  try {
    let { [reviewSchema.likedUsersList]: likedUsersList } = await db.any(`SELECT ${reviewSchema.likedUsersList} FROM ${review.tableName} WHERE ${reviewSchema.reviewId} = $1`, [reviewId]);
    if (!likedUsersList) {
      likedUsersList = [];
    }
    let { [reviewSchema.amountOfLikes]: amountOfLikes } = await db.one(`SELECT ${reviewSchema.amountOfLikes} FROM ${review.tableName} WHERE ${reviewSchema.reviewId} = $1`, [reviewId]);
    if (isLiked) {
      likedUsersList.push(name);
      amountOfLikes += 1;
      await db.none(`UPDATE ${review.tableName} SET ${reviewSchema.likedUsersList} = $1 WHERE ${reviewSchema.reviewId} = $2`, [likedUsersList, reviewId]);
      await db.none(`UPDATE ${review.tableName} SET ${reviewSchema.amountOfLikes} = $1 WHERE ${reviewSchema.reviewId} = $2`, [amountOfLikes, reviewId]);
    } else {
      const indexOfUser = likedUsersList.indexOf(name);
      likedUsersList.splice(indexOfUser, 1);
      amountOfLikes -= 1;
      await db.none(`UPDATE ${review.tableName} SET ${reviewSchema.likedUsersList} = $1 WHERE ${reviewSchema.reviewId} = $2`, [likedUsersList, reviewId]);
      await db.none(`UPDATE ${review.tableName} SET ${reviewSchema.amountOfLikes} = $1 WHERE ${reviewSchema.reviewId} = $2`, [amountOfLikes, reviewId]);
    }
    res.send({ result: 'ok' });
  } catch (err) {
    res.send({ result: 'error', message: err.message });
  }
});

router.put('/:reviewId/comment', checkAuthMiddlware, async (req, res) => {
  const { reviewId } = req.params;
  const { text, author } = req.body.data;

  try {
    const columnSet = Object.values(reviewCommentSchema);
    const values = [{ text, author, [reviewCommentSchema.reviewId]: reviewId }];
    await insertValuesOnDB({
      table: 'review_comment',
      columnSet,
      values,
    });
    let { [reviewSchema.amountOfComments]: amountOfComments } = await db.one(`SELECT ${reviewSchema.amountOfComments} FROM ${review.tableName} WHERE ${reviewSchema.reviewId} = $1`, [reviewId]);
    amountOfComments += 1;
    await db.none(`UPDATE ${review.tableName} SET ${reviewSchema.amountOfComments} = $1 WHERE ${reviewSchema.reviewId} = $2`, [amountOfComments, reviewId]);
    res.send({ result: 'ok' });
  } catch (err) {
    res.send({ result: 'error', message: err.message });
  }
});

module.exports = router;
