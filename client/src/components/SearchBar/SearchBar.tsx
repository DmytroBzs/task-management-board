import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";
import { AppDispatch } from "../../redux/store";
import { fetchBoardById } from "../../redux/boards/operations";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleButtonClick = () => {
    if (searchQuery) {
      dispatch(fetchBoardById(searchQuery));
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search boards..."
          onChange={handleSearch}
        />
        <button onClick={handleButtonClick} className={styles.searchButton}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
