const reviewSchema = require('../schemas/review');

const mapReviewsToFront = (reviews) => {
  const mappedToFrontReviews = reviews.map((review) => ({
    reviewTitle: review[reviewSchema.reviewTitle],
    creationTitle: review[reviewSchema.creationTitle],
    reviewerName: review[reviewSchema.reviewerName],
    category: review[reviewSchema.category],
    tags: review[reviewSchema.tags],
    reviewText: review[reviewSchema.reviewText],
    rating: review[reviewSchema.rating],
    amountOfLikes: review[reviewSchema.amountOfLikes],
    amountOfComments: review[reviewSchema.amountOfComments],
    likedUsersList: review[reviewSchema.likedUsersList] || [],
    reviewDate: review[reviewSchema.reviewDate],
    reviewId: review[reviewSchema.reviewId],
  }));
  return mappedToFrontReviews;
};

module.exports = mapReviewsToFront;
