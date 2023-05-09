const mapReviewToTable = ({ review }) => {
  const {
    review_title: reviewTitle,
    creation_title: creationTitle,
    category,
    review_date: reviewDate,
    review_id: reviewId,
  } = review;
  return {
    'review title': reviewTitle,
    creation: creationTitle,
    category,
    date: reviewDate,
    reviewId,
  };
};

export default mapReviewToTable;
