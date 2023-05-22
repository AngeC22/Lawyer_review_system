// ParentComponent.js
import React, { useState, useEffect } from "react";
import ReviewForm from "./ReviewForm";
import GoogleMap from "./GoogleMap";

const ParentComponent = () => {
  const [lawFirmData, setLawFirmData] = useState(null);

  useEffect(() => {
    // Fetch the law firm data from the Google Maps API
    // Assign the fetched data to lawFirmData state
    // Example:
    fetchLawFirmData()
      .then((data) => setLawFirmData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {/* Pass lawFirmData as prop to ReviewForm */}
      {lawFirmData ? <ReviewForm result={lawFirmData} /> : <p>Loading...</p>}
    </div>
  );
};

export default ParentComponent;
