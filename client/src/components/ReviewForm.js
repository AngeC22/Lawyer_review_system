// ParentComponent.js
import React, { useState, useEffect } from "react";
import ReviewForm from "./ReviewForm";
import GoogleMap from "./GoogleMap";

const ParentComponent = () => {
  const [lawFirmData, setLawFirmData] = useState(null);
  const [lawyerName, setLawyerName] = useState(null);
  const [review, setReview] = useState(null);

  useEffect(() => {
    // Fetch the law firm data from the Google Maps API
    // Assign the fetched data to lawFirmData state
    // Example:
    //   fetchLawFirmData()
    //     .then((data) => setLawFirmData(data))
    //     .catch((error) => console.error(error));
  }, []);
  const onSubmitForm = () => {
    fetch("http://localhost:3000/api/v1/review", {
      method: "post",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify({
        name: lawyerName,
        text: review,
        userId: 1,
        id: parseInt(Math.random() * 1000000),
      }),
    });
  };

  return (
    <div>
      {/* Pass lawFirmData as prop to ReviewForm */}
      {lawFirmData ? <ReviewForm result={lawFirmData} /> : <p>Loading...</p>}
      <form>
        <label>Name</label>
        <input onChange={(e) => setLawyerName(e.target.value)} value={lawyerName} />
        <label>Review</label>
        <textarea onChange={(e) => setReview(e.target.value)} value={review} />
        <button onClick={() => onSubmitForm()}>submit</button>
      </form>
    </div>
  );
};

export default ParentComponent;
