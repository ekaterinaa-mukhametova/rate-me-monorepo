import PropTypes from 'prop-types';

export const LikesDataType = {
  likedUsersList: PropTypes.arrayOf(PropTypes.string).isRequired,
  amountOfLikes: PropTypes.number.isRequired,
};

export const CommentDataType = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const ReviewType = {
  reviewTitle: PropTypes.string.isRequired,
  creationTitle: PropTypes.string.isRequired,
  reviewerName: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  reviewText: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  likedUsersList: PropTypes.arrayOf(PropTypes.string).isRequired,
  amountOfComments: PropTypes.number.isRequired,
  amountOfLikes: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(CommentDataType),
  reviewDate: PropTypes.string.isRequired,
  reviewId: PropTypes.string.isRequired,
};

export default ReviewType;
