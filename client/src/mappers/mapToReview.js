const mapToReview = (review) => {
  const {
    review_title: reviewTitle,
    review_id: reviewId,
    creation_title: creationTitle,
    review_text: reviewText,
    amount_of_likes: amountOfLikes,
    amount_of_comments: amountOfComments,
    liked_users_list: likedUsersList,
    category,
    tags,
    rating,
    comments,
  } = review;
  return {
    amountOfLikes,
    amountOfComments,
    likedUsersList: likedUsersList || [],
    reviewTitle,
    reviewId,
    creationTitle,
    category,
    tags,
    reviewText,
    rating,
    comments,
  };
};

export default mapToReview;
