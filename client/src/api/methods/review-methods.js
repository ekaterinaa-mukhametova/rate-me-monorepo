import axiosConfig from '../config';
import { errorTypes } from './error-types';

const reviewPath = 'review';

export const getReview = async ({ reviewId }) => {
  const response = await axiosConfig.get(`${reviewPath}/${reviewId}`);
  return response;
};

export const getCategories = async () => {
  const { data: response } = await axiosConfig.get('/review-categories');
  if (response.result === 'error') {
    throw new Error(errorTypes.unknownError);
  }
  const { categories } = response;
  return categories;
};

export const updateReview = async (review) => {
  const response = await axiosConfig.put(`${reviewPath}`, {
    data: { review },
  });
  return response;
};

export const deleteReview = async ({ reviewId }) => {
  const response = await axiosConfig.delete(`${reviewPath}/${reviewId}`);
  return response;
};

export const getMyReviews = async ({ userId }) => {
  try {
    const { data } = await axiosConfig.get(`/my-reviews/${userId}`);
    return data;
  } catch (err) {
    if (err.response.status === 401) {
      throw new Error(errorTypes.notAuthError);
    } else if (err.response.status === 403) {
      throw new Error(errorTypes.noPermissionError);
    }
    return err;
  }
};

export const getLatestReviews = async ({ dateFrom, dateTo }) => {
  const { data } = await axiosConfig.get(`/latest-reviews?dateFrom=${dateFrom}&dateTo=${dateTo}`);
  const { latestReviews } = data;
  if (data.result === 'error') {
    throw new Error(errorTypes.unknownError);
  }
  return latestReviews;
};

export const getPopularReviews = async () => {
  const { data } = await axiosConfig.get('/popular-reviews');
  const { popularReviews } = data;
  if (data.result === 'error') {
    throw new Error(errorTypes.unknownError);
  }
  return popularReviews;
};

export const updateLikes = async ({ isLiked, reviewId, name }) => {
  try {
    const { data } = await axiosConfig.put(`${reviewPath}/${reviewId}/like`, {
      data: { isLiked, name },
    });
    return data;
  } catch (err) {
    if (err.response.status === 401) {
      throw new Error(errorTypes.notAuthError);
    }
    return err;
  }
};

export const sendComment = async ({ text, author, reviewId }) => {
  try {
    const { data } = await axiosConfig.put(`${reviewPath}/${reviewId}/comment`, {
      data: { text, author },
    });
    return data;
  } catch (err) {
    if (err.response.status === 401) {
      throw new Error(errorTypes.notAuthError);
    }
    return err;
  }
};
