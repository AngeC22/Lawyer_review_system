import React, { useState, useEffect } from "react";

const LawyerShow = (props) => {
  const [LawyerShow, setLawyerShow] = useState({
    id: "",
    name: "",
    imageUrl: "",
    url: "",
    educationBackground: "",
    language: "",
    location: "",
    specialty: "",
    reviews: [],
  });

  const [reviewState, setReviewState] = useState({
    rating: 1,
    review: "",
  });

  const getLawyerShow = async () => {
    const lawyerId = props.match.params.id;
    try {
      const response = await fetch(`/api/v1/lawyerShowRouter/${lawyerId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setLawyerShow(body.lawyer);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getLawyerShow();
  }, []);

  const handleReviewSubmit = async (event, newReview) => {
    event.preventDefault();
    newReview.rating = parseFloat(newReview.rating);

    try {
      const response = await fetch(`/api/v1/lawyerShow/${LawyerShow.id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review: newReview }),
      });

      if (response.ok) {
        const body = await response.json();
        setLawyerShow({
          ...LawyerShow,
          reviews: [...LawyerShow.reviews, body.review],
        });
      } else {
        console.error("Failed to add comment:", response.statusText);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  return (
    <div className="show-page">
      <h2 className="show-title">{LawyerShow.name}</h2>
      <img src={LawyerShow.imageUrl} alt={LawyerShow.name} />
    </div>
  );
};

export default LawyerShow;
