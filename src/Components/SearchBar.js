import React, { useCallback, useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { debounce } from "@mui/material";

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

function SearchBar({ placeholder }) {
  const [filteredData, setFilteredData] = useState([]);

  const debounceSuggestion = useCallback(
    debounce(async (query) => {
      console.log("Helllo", query);
      const response = await axios.get(`/search?q=${query}`);
      setFilteredData(response.data);
    }, 50),
    []
  );

  const handleFilter = async (event) => {
    const query = event.target.value;
    if (query) {
      await debounceSuggestion(query);
    } else setFilteredData([]);
  };

  const handleSubmit = async (event) => {
    const query = event.target.value;
    console.log(query);
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <div className="searchIcon">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleFilter}
          onSubmit={handleSubmit}
        />
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.map((value, index) => {
            return (
              <a key={`suggestion_${index}`} className="dataItem" href={value}>
                <div className="searchSuggestionIcon">
                  <SearchIcon />
                </div>
                <p>{value}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
