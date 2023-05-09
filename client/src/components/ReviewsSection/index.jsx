import React from 'react';
import PropTypes from 'prop-types';
import useWindowDimensions from '../../custom-hooks/useWindowDimensions';
import ReviewCard from '../ReviewCard';
import ReviewType from '../../types/ReviewType';

function ReviewsSection({ title, reviews }) {
  const { width } = useWindowDimensions();
  const isSmallScreen = width <= 1100;
  const isMobileScreen = width <= 600;
  let slicedReviews;
  let cardWidth;
  if (isMobileScreen) {
    // eslint-disable-next-line prefer-destructuring
    slicedReviews = reviews.slice(0, 1);
    cardWidth = '100%';
  } else if (isSmallScreen) {
    slicedReviews = reviews.slice(0, 3);
    cardWidth = '35%';
  } else {
    slicedReviews = reviews;
    cardWidth = '300px';
  }
  return (
    <div className="container mw-100 w-100">
      <div className="container-xl">
        <h1 className="text-dark-emphasis">{title}</h1>
      </div>
      <div className="container-xl d-flex justify-content-between">
        {slicedReviews?.map((review) => (
          <ReviewCard
            key={review.reviewId}
            content={review}
            style={{
              maxHeight: '500px', maxWidth: cardWidth, width: cardWidth,
            }}
          />
        ))}
      </div>
    </div>
  );
}

ReviewsSection.propTypes = {
  title: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape(ReviewType)).isRequired,
};

export default ReviewsSection;
