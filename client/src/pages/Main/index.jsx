import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import ReviewsSection from '../../components/ReviewsSection';
import ReviewsFeed from '../../components/ReviewsFeed';
import { getLatestReviews, getPopularReviews } from '../../api/methods/review-methods';

function Main() {
  const [latestReviews, setLatestReviews] = useState([]);
  const [popularReviews, setPopularReviews] = useState([]);
  const [error, setError] = useState(null);
  const dateFrom = '2023-04-12';
  const dateTo = '2023-04-12';

  useEffect(() => {
    const getLatestReviewsData = async () => {
      try {
        const data = await getLatestReviews({ dateFrom, dateTo });
        setLatestReviews(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getLatestReviewsData();
  }, []);

  useEffect(() => {
    const getPopularReviewsData = async () => {
      try {
        const data = await getPopularReviews();
        setPopularReviews(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getPopularReviewsData();
  }, []);

  return (
    <div className="bg-body-tertiary" style={{ minHeight: '100vh' }} data-bs-theme="dark">
      <Header />
      <ReviewsSection title="Popular" reviews={popularReviews} />
      <ReviewsFeed title="Latest" reviews={latestReviews} />
      {error}
    </div>
  );
}

export default Main;
