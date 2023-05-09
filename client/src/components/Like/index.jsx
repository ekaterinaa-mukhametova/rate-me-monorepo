import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getUserAuthData from '../../helpers/getUserAuthData';
import { LikesDataType } from '../../types/ReviewType';
import { updateLikes } from '../../api/methods/review-methods';
import errorTypes from '../../api/methods/error-types';
import HeartSVG from '../../svg/HeartSVG';

function Like({ likesData, reviewId }) {
  const { likedUsersList: initLikedUsersList, amountOfLikes: initAmountOfLikes } = likesData;
  const [likedUsersList, setLikedUsersList] = useState(initLikedUsersList);
  const [likesAmount, setLikesAmount] = useState(initAmountOfLikes);
  const [isLiked, setIsLiked] = useState(false);
  const { userName } = getUserAuthData();

  useEffect(() => {
    if (userName) {
      const isUserLiked = likedUsersList.includes(userName);
      setIsLiked(isUserLiked);
    }
  }, []);

  const onClickLikeButton = async (event) => {
    event.stopPropagation();
    const updatedLikeStatus = !isLiked;
    try {
      const { result } = await updateLikes({
        isLiked: updatedLikeStatus,
        reviewId,
        name: userName,
      });
      if (result === 'ok') {
        if (isLiked) {
          setIsLiked(false);
          let updatedLikedUsersList = [];
          const indexOfUser = likedUsersList.indexOf(userName);
          if (indexOfUser !== -1) {
            updatedLikedUsersList = likedUsersList.toSpliced(indexOfUser, 1);
          }
          setLikedUsersList(updatedLikedUsersList);
          setLikesAmount(likesAmount - 1);
        } else {
          setIsLiked(true);
          setLikedUsersList([...likedUsersList, userName]);
          setLikesAmount(likesAmount + 1);
        }
      }
    } catch (err) {
      if (err.message === errorTypes.notAuthError) {
        // openAuthModal();
      }
    }
  };

  return (
    <div className="container d-flex pt-2 w-auto">
      <div className="fs-5">{likesAmount}</div>
      <button type="button" className="bg-transparent border border-0" onClick={onClickLikeButton}>
        <HeartSVG color={isLiked ? 'red' : 'white'} />
      </button>
    </div>
  );
}

Like.propTypes = {
  likesData: PropTypes.shape(LikesDataType).isRequired,
  reviewId: PropTypes.string.isRequired,
};

export default Like;
