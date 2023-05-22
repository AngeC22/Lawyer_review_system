import React from "react";
import { Link } from "react-router-dom";

const LawyerTile = (props) => {
  const { lawyer } = props;

  return (
    <Link to={`/lawyers/${lawyer.id}`} className="lawyer-tile">
      <img
        src="https://static.onecms.io/wp-content/uploads/sites/6/2011/03/lincoln-lawyer_320.jpg"
        alt={lawyer.name}
      />
      <p>{lawyer.name}</p>
    </Link>
  );
};

export default LawyerTile;
