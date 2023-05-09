import React from 'react';
import PropTypes from 'prop-types';
import ReviewType from '../../types/ReviewType';
import Like from '../Like';
import Comment from '../Comment';

function ReviewCard({
  content, style, withLikes, withComments,
}) {
  const { likedUsersList, amountOfLikes } = content;

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="card m-1 pb-4 mb-4"
      style={{
        cursor: 'pointer',
        ...style,
      }}
      onClick={() => window.open(`/review/${content.reviewId}`)}
    >
      <div className="card-body overflow-hidden">
        <h5 className="card-title">{content.reviewTitle}</h5>
        <h6 className="card-title">{content.creationTitle}</h6>
        {content?.tags.map((tag) => (
          <div className="badge text-bg-dark bg-body-secondary ms-1 mb-1 fs-6" key={tag}>
            {tag}
          </div>
        ))}
        <h6 className="card-title">
          {content.rating}
          &nbsp;
          from 10
        </h6>
        <p className="card-text">{content.reviewText}</p>
        <div className="container d-flex">
          {withLikes
        && (
        <Like
          likesData={{ likedUsersList, amountOfLikes }}
          reviewId={content.reviewId}
        />
        )}
          {withComments
        && (
        <Comment amountOfComments={content.amountOfComments} />
        )}
        </div>
      </div>
    </div>
  );
}

ReviewCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.shape(PropTypes.any),
  content: PropTypes.shape(PropTypes.shape(ReviewType)).isRequired,
  withLikes: PropTypes.bool,
  withComments: PropTypes.bool,
};

ReviewCard.defaultProps = {
  style: {},
  withLikes: false,
  withComments: false,
};

export default ReviewCard;
