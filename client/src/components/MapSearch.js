import React, { useState } from "react";

const MapSearch = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (event) => {
    setSearchInput(event.currentTarget.value);
  };

  const handleSearch = () => {
    props.setSearchQuery(searchInput);
  };

  return (
    <div className="searchButtonContainer">
      <label htmlFor="search">
        <input id="search" type="text" defaultValue={props.searchQuery} onChange={handleChange} />
      </label>

      <button className="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default MapSearch;
