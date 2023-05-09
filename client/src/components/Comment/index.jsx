import React from 'react';
import PropTypes from 'prop-types';
import CommentSVG from '../../svg/CommentSVG';

function Comment({ amountOfComments }) {
  return (
    <div className="container d-flex pt-2">
      <div className="fs-5 pe-2">{amountOfComments}</div>
      <CommentSVG />
    </div>
  );
}

Comment.propTypes = {
  amountOfComments: PropTypes.number.isRequired,
};

export default Comment;
