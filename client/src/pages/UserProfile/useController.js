import { useEffect, useState } from 'react';
import { getMyReviews } from '../../api/methods/review-methods';
import { errorTypes } from '../../api/methods/error-types';
import mapReviewToTable from '../../mappers/mapReviewToTable';

const useController = () => {
  const [myReviewsData, setMyReviewsData] = useState([]);
  const [myReviewsDataError, setmyReviewsDataError] = useState('');

  // eslint-disable-next-line no-unused-vars
  const onClickDeleteReview = async ({ reviewId }) => {
    // await deleteReview({ reviewId });
  };

  const onClickEditReview = ({ reviewId }) => {
    window.open(`/review/${reviewId}/edit`);
  };

  const onClickCreateReview = () => {
    window.open('/review/new/edit');
  };

  useEffect(() => {
    const getAdminPanelData = async () => {
      setmyReviewsDataError('');
      try {
        const userId = window.location.pathname.split('/')[2];
        const { allUserReviews: myReviews } = await getMyReviews({ userId });
        const mappedReviews = myReviews.map((review) => mapReviewToTable({ review }));
        setMyReviewsData(mappedReviews || []);
      } catch (err) {
        if (err.message === errorTypes.noPermissionError
          || err.message === errorTypes.notAuthError) {
          setmyReviewsDataError(err.message);
          // TODO: openAuthModal()
        } else {
          setmyReviewsDataError(errorTypes.unknownError);
        }
      }
    };

    if (myReviewsData.length === 0) {
      getAdminPanelData();
    }
  }, []);

  return ({
    myReviewsData,
    myReviewsDataError,
    onClickDeleteReview,
    onClickEditReview,
    onClickCreateReview,
  });
};

export default useController;
