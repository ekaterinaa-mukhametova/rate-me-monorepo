import { useState, useEffect } from 'react';
import { updateReview, getReview, getCategories } from '../../../api/methods/review-methods';
import mapToReview from '../../../mappers/mapToReview';
import { errorTypes } from '../../../api/methods/error-types';

const useController = () => {
  const [reviewId, setReviewId] = useState(null);
  const [reviewTitle, setReviewTitle] = useState('');
  const [creationTitle, setCreationTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [rating, setRating] = useState(0);

  const [reviewMessage, setReviewMessage] = useState('');

  useEffect(() => {
    const reviewIdFromUrl = window.location.pathname.split('/')[2];
    setReviewId(reviewIdFromUrl);
  }, []);

  useEffect(() => {
    const getReviewData = async () => {
      try {
        const { data: response } = await getReview({ reviewId });
        if (response.result === 'error') {
          throw new Error(response.message);
        } else {
          const { review } = response;
          const mappedReview = mapToReview(review);
          setReviewTitle(mappedReview.reviewTitle);
          setCreationTitle(mappedReview.creationTitle);
          setReviewText(mappedReview.reviewText);
          setSelectedCategory(mappedReview.category);
          setRating(mappedReview.rating);
        }
      } catch (err) {
        setReviewMessage(`Cannot load review:\n${errorTypes.unknownError}`);
        if (err.message === errorTypes.ReviewNotFoundEror) {
          setReviewMessage('');
          setReviewId(null);
        }
      }
    };

    if (reviewId) {
      getReviewData();
    }
  }, [reviewId]);

  useEffect(() => {
    const getCategoriesList = async () => {
      try {
        const categories = await getCategories();
        setCategoryList(categories);
        setSelectedCategory(categoryList[0]);
      } catch (err) {
        setReviewMessage(err.message);
        setCategoryList([]);
      }
    };

    getCategoriesList();
  }, []);

  const submitReview = async (event) => {
    event.preventDefault();
    const reviewerName = localStorage.getItem('name');
    const updatedReview = {
      reviewId: reviewId || undefined,
      reviewTitle,
      creationTitle,
      reviewText,
      category: selectedCategory,
      rating,
      reviewerName,
    };
    try {
      const { data: response } = await updateReview(updatedReview);
      if (response.result === 'error') {
        throw new Error(errorTypes.unknownError);
      }
      setReviewMessage('Your review succesfully saved');
    } catch (err) {
      setReviewMessage(`Cannot save review: ${errorTypes.unknownError}`);
    }
  };

  return {
    reviewTitle,
    setReviewTitle,
    creationTitle,
    setCreationTitle,
    reviewText,
    setReviewText,
    submitReview,
    reviewMessage,
    selectedCategory,
    setSelectedCategory,
    categoryList,
    rating,
    setRating,
  };
};

export default useController;
