import React from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../redux/boards/slice";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search boards..."
          onChange={handleSearch}
        />
        <button className={styles.searchButton}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
