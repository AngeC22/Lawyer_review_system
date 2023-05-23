import React, { useState } from "react";

const ReviewContent = ({ handleReviewSubmit, reviews }) => {
  const [newReview, setNewReview] = useState({
    review: "",
  });
  const [errors, setErrors] = useState({});

  const handleReviewChange = (event) => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newReview.review.trim() !== "") {
      handleReviewSubmit(event, newReview);
      setNewReview({ review: "" });
      setErrors({});
    } else {
      setErrors({ review: "Error: Comment cannot be empty." });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>How do you feel your case experience?</label>
      <input type="text" name="review" value={newReview.review} onChange={handleReviewChange} />
      {errors.review && <div className="error">{errors.review}</div>}
      <button type="submit" className="review-btn">
        Submit
      </button>
    </form>
  );
};

export default ReviewContent;
