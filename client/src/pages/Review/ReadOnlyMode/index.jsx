import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../../components/Header';
import Like from '../../../components/Like';
import Comment from '../../../components/Comment';
import { getReview } from '../../../api/methods/review-methods';
import { errorTypes } from '../../../api/methods/error-types';
import mapToReview from '../../../mappers/mapToReview';
import CommentSection from '../../../components/CommentSection';

function ReviewReadMode() {
  const [reviewId, setReviewId] = useState(null);
  const [reviewData, setReviewData] = useState(null);
  const [reviewComments, setReviewComments] = useState(null);
  const [reviewError, setReviewError] = useState(null);

  useEffect(() => {
    const idFromUrl = window.location.pathname.split('/')[2];
    setReviewId(idFromUrl);
  }, []);

  useEffect(() => {
    const getReviewData = async () => {
      try {
        const { data: response } = await getReview({ reviewId });
        if (response.result === 'error') {
          throw new Error(response.message);
        } else {
          const { review, comments } = response;
          const mappedReview = mapToReview(review);
          setReviewData(mappedReview);
          setReviewComments(comments);
        }
      } catch (err) {
        setReviewError(errorTypes.unknownError);
        if (err.message === errorTypes.ReviewNotFoundEror) {
          setReviewError(errorTypes.ReviewNotFoundEror);
        }
      }
    };

    if (reviewId) {
      getReviewData();
    }
  }, [reviewId]);

  const ReviewError = useMemo(() => (
    <div className="container">
      {reviewError}
    </div>
  ), [reviewError]);

  if (reviewData) {
    return (
      <div className="bg-body-tertiary" style={{ minHeight: '100vh' }} data-bs-theme="dark">
        <Header />
        <div className="container text-bg-dark mt-4 p-4">
          <h1>{reviewData.reviewTitle}</h1>
          <h2>
            &quot;
            {reviewData.creationTitle}
            &quot;
          </h2>
          <div className="container fs-5">{`Category: ${reviewData.category}`}</div>
          <div className="container fs-5">
            {`Rate: ${reviewData.rating} from 10`}
          </div>
          <div>
            {reviewData?.tags.map(
              (tag) => (
                <div className="badge text-bg-dark ms-1 fs-6" key={tag}>
                  {tag}
                </div>
              ),
            )}
          </div>
          <div>{reviewData.reviewText}</div>
          <div className="container d-flex align-items-center">
            <Like
              likesData={{
                likedUsersList: reviewData.likedUsersList,
                amountOfLikes: reviewData.amountOfLikes,
              }}
              reviewId={reviewData.reviewId}
            />
            <Comment amountOfComments={reviewComments.length} />
          </div>
        </div>
        <CommentSection comments={reviewComments} />
      </div>
    );
  }
  return ReviewError;
}

export default ReviewReadMode;
