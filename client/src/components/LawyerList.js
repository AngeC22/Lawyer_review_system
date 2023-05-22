import React, { useState, useEffect } from "react";
import LawyerTile from "./LawyerTile";

const LawyerList = () => {
  const [lawyerList, setLawyerList] = useState([]);

  const fetchLawyerData = async () => {
    try {
      const response = await fetch("/api/v1/lawyers");
      if (response.ok) {
        const data = await response.json();
        setLawyerList(data.lawyers);
      } else {
        console.error("Failed to fetch social media sites:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching social media sites:", error);
    }
  };

  useEffect(() => {
    fetchLawyerData();
  }, []);

  const lawyerItems = lawyerList.map((lawyer) => {
    return <LawyerTile key={lawyer.id} lawyer={lawyer} />;
  });

  return (
    <div className="hear">
      <h1 className="hear">These lawyer would like to help you</h1>
      <h5>Check out other's feedback</h5>
      <div className="lawyer-list">{lawyerItems}</div>
    </div>
  );
};

export default LawyerList;
