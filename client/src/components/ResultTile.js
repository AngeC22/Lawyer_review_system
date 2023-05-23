import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ResultTile = (props) => {
  const [info, setInfo] = useState([]);

  const getResult = async (place_id) => {
    try {
      //   const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name,formatted_address,reviews,rating,geometry/location,editorial_summary&key=AIzaSyDIra1juLYvG4k4dRXvlnyna2_Xxvh35-A`;

      const response = await fetch(`/api/v1/googlePlace?id=${place_id}`);
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(
          `Error in fetch: ${response.status} (${response.statusText}) ${errorBody.errors}`
        );
      }
      const apiResult = await response.json();
      console.log(apiResult);
      if (Array.isArray(apiResult.info)) {
        setInfo(apiResult.info);
      } else {
        console.error("Info is not an array:", apiResult.info);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getResult(props.result.place_id);

    console.log("props:", props);
  }, []);
  console.log("info:", info);

  const showInfomap =
    info.length > 0 ? (
      <div>
        <li>{info[0].text}</li>
        <li>{info[0].rating}</li>
        <li>{info[0].name}</li>
      </div>
    ) : null;

  // debugger
  return (
    <div className="callout">
      <h3
        onClick={() => {
          console.log(props.result);
          window.location.href = "/review/new";
        }}
      >
        {props.result.name}
      </h3>
      <p>{props.result.formatted_address}</p>
      <p>{props.result.rating} / 5</p>
      {showInfomap}
      <Link to={`/review/${props.result.name}`}>Write Review</Link>
    </div>
  );
};
export default ResultTile;
