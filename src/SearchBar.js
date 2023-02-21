import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        className="searchBar"
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default SearchBar;
