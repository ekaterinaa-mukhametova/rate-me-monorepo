import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CommentDataType } from '../../types/ReviewType';
import getUserAuthData from '../../helpers/getUserAuthData';
import { sendComment } from '../../api/methods/review-methods';

function CommentSection({ comments }) {
  // TODO: add websockets
  // TODO: move logic upper for amount of comments in Comment component
  const [text, setText] = useState('');
  const { userName } = getUserAuthData();
  const onClickCommentButton = async () => {
    const reviewId = window.location.pathname.split('/')[2];
    try {
      const { result } = await sendComment({ text, author: userName, reviewId });
      if (result === 'ok') {
        setText('');
      }
    } catch (err) {
      // openAuthModal();
    }
  };
  return (
    <div className="container pb-2">
      {comments.map((comment) => (
        <div className="container border-top text-bg-dark rounded mt-2 p-3">
          <div className="text-white mt-2">{comment.author }</div>
          <div>{comment.text}</div>
        </div>
      ))}
      <div className="pt-2 pb-2">
        <textarea
          className="form-control mb-2"
          onChange={(e) => { setText(e.target.value); }}
          value={text}
          placeholder="Type comment..."
        />
        <button type="button" className="btn btn-dark border-top" onClick={onClickCommentButton}>Send</button>
      </div>
    </div>
  );
}

CommentSection.propTypes = {
  comments: PropTypes.arrayOf(CommentDataType).isRequired,
};

export default CommentSection;
