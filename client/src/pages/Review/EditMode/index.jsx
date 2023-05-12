import React, { useMemo } from 'react';
import Header from '../../../components/Header';
import useController from './useController';

function ReviewEditMode() {
  const {
    reviewTitle,
    setReviewTitle,
    creationTitle,
    setCreationTitle,
    reviewText,
    setReviewText,
    submitReview,
    reviewMessage,
    categoryList,
    selectedCategory,
    setSelectedCategory,
    rating,
    setRating,
  } = useController();

  const ReviewTitleInput = useMemo(() => (
    <div className="mb-3">
      <label className="form-label">Review title</label>
      <input
        type="text"
        className="form-control"
        required
        value={reviewTitle}
        onChange={(event) => { setReviewTitle(event.target.value); }}
      />
    </div>
  ), [reviewTitle, setReviewTitle]);

  const CreationTitleInput = useMemo(() => (
    <div className="mb-3">
      <label className="form-label">Creation title</label>
      <input
        type="text"
        className="form-control"
        required
        value={creationTitle}
        onChange={(event) => { setCreationTitle(event.target.value); }}
      />
    </div>
  ), [creationTitle, setCreationTitle]);

  const CategoryPicker = useMemo(() => (
    <div className="mb-3">
      <select
        className="form-select"
        onChange={(event) => { setSelectedCategory(event.target.value); }}
        value={selectedCategory}
      >
        {categoryList.length ? (
          categoryList.map(
            (el) => (
              <option key={el} value={el}>{el}</option>
            ),
          )
        ) : null}
      </select>
    </div>
  ), [categoryList, selectedCategory, setSelectedCategory]);

  const RatingPicker = useMemo(() => (
    <div className="mb-3">
      <label className="form-label">Rate</label>
      <input
        type="range"
        className="form-range bg-secondary"
        min="0"
        max="10"
        onChange={(event) => { setRating(event.target.value); }}
      />
    </div>
  ), [rating, setRating]);

  const ReviewTextInput = useMemo(() => (
    <div className="mb-3">
      <textarea
        type="text"
        className="form-control"
        required
        value={reviewText}
        onChange={(event) => { setReviewText(event.target.value); }}
      />
    </div>
  ), [reviewText, setReviewText]);

  return (
    <div className="bg-body-tertiary text-dark-emphasis" style={{ minHeight: '100vh' }} data-bs-theme="dark">
      <Header />
      <div className="container pt-2">
        <form onSubmit={submitReview}>
          {ReviewTitleInput}
          {CreationTitleInput}
          {ReviewTextInput}
          {CategoryPicker}
          {RatingPicker}
          {/* TagFinder */}
          {/* ImageDrugNDroper */}
          <button type="submit" className="btn btn-primary">Save Review</button>
          <div className="mb-3">{reviewMessage}</div>
        </form>
      </div>
    </div>
  );
}

export default ReviewEditMode;
