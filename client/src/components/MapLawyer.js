import React, { useState, useEffect } from "react";

const MapLawyer = (props) => {
  const [mapLawyer, setMapLawyer] = useState({
    id: "",
    name: "",
    url: "",
    educationBackground: "",
    workExperience: "",
    language: "",
    location: "",
  });

  const getMapLawyer = async () => {
    const mapLawyerId = props.match.params.id;
    try {
      const response = await fetch(`https://api.avvo.com/api/4/lawyers/search.json`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setMapLawyer(body);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getMapLawyer();
  }, []);

  return (
    <div className="show-page">
      <h2 className="show-title">{mapLawyer.name}</h2>
      <p>{mapLawyer.description}</p>
    </div>
  );
};

export default MapLawyer;
