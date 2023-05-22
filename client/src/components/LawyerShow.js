import React, { useState, useEffect } from "react";

const LawyerShow = (props) => {
  const [lawyerShow, setLawyerShow] = useState({
    id: "",
    name: "",
    imageUrl: "",
    url: "",
    specialty: "",
    educationBackground: "",
    language: "",
    location: "",
  });

  const getLawyerShow = async () => {
    const lawyerId = props.match.params.id;
    try {
      const response = await fetch(`/api/v1/lawyers/${lawyerId}`);
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

  return (
    <div className="show-page">
      <h3 className="show-title">{lawyerShow.name}</h3>
      <img
        src="https://assets3.thrillist.com/v1/image/3073679/1200x630/flatten;crop_down;webp=auto;jpeg_quality=70"
        alt={lawyerShow.name}
      />
      <a href={lawyerShow.url} target="_blank" rel="noreferrer" className="siteLink">
        Check Out This Cool Lawyer
      </a>
      <p>{lawyerShow.description}</p>
      <dl>
        <li>specialty: {lawyerShow.specialty}</li>
        <li>language: {lawyerShow.language}</li>
        <li>location: {lawyerShow.location}</li>
        <li>educationBackground: {lawyerShow.educationBackground}</li>
      </dl>
    </div>
  );
};

export default LawyerShow;
