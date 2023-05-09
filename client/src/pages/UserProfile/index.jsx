import React, { useMemo, useEffect, useState } from 'react';
import Header from '../../components/Header';
import ReviewsTable from '../../components/Table';
import BinSVG from '../../svg/BinSVG';
import PencilSVG from '../../svg/PencilSVG';
import PlusSVG from '../../svg/PlusSVG';
import useController from './useController';

// eslint-disable-next-line react/prop-types
function TableButton({ reviewId, onClick, content }) {
  return (
    <button
      type="button"
      style={{ cursor: 'pointer' }}
      className="btn bg-transparent"
      onClick={() => onClick({ reviewId })}
    >
      {content}
    </button>
  );
}

function UserProfilel() {
  const {
    myReviewsData,
    myReviewsDataError,
    onClickDeleteReview,
    onClickEditReview,
    onClickCreateReview,
  } = useController();

  const [tableContent, setTableContent] = useState([]);

  const ButtonAddReview = useMemo(() => (
    <button type="button" className="btn btn-secondary d-flex align-items-center" onClick={onClickCreateReview}>
      <PlusSVG />
      <div className="ps-2">Create new review</div>
    </button>
  ), [onClickCreateReview]);

  const makeTableContent = ({ data }) => {
    const tableContentWithButtons = data.map((review) => {
      const reviewWithButtons = {
        ...review,
        deleteButton:
  <TableButton
    reviewId={review.reviewId}
    onClick={onClickDeleteReview}
    content={<BinSVG />}
  />,
        editButton:
  <TableButton
    reviewId={review.reviewId}
    onClick={onClickEditReview}
    content={(<PencilSVG />)}
  />,
      };
      delete reviewWithButtons.reviewId;
      return reviewWithButtons;
    });

    setTableContent(tableContentWithButtons);
  };

  useEffect(() => {
    if (myReviewsData?.length) {
      makeTableContent({ data: myReviewsData });
    }
  }, [myReviewsData]);

  return (
    <div className="bg-body-tertiary" style={{ minHeight: '100vh' }} data-bs-theme="dark">
      <Header />
      <div>{myReviewsDataError}</div>
      <div className="container">
        <ReviewsTable
          content={tableContent}
        />
        {ButtonAddReview}
      </div>
    </div>
  );
}

export default UserProfilel;
