import React from 'react';
import PropTypes from 'prop-types';
import ReviewType from '../../types/ReviewType';
import ReviewCard from '../ReviewCard';

function ReviewsFeed({ title, reviews }) {
  return (
    <div className="container mw-100 w-100">
      <div className="container-xl">
        <h1 className="text-dark-emphasis">{title}</h1>
      </div>
      <div className="container-xl">
        {reviews?.map((review) => (
          <ReviewCard content={review} withLikes withComments />
        ))}
      </div>
    </div>
  );
}

ReviewsFeed.propTypes = {
  title: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape(ReviewType)).isRequired,
};

export default ReviewsFeed;
