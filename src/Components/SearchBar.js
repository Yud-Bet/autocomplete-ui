import React, { useState } from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT

function SearchBar({placeholder}) {
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = async (event) => {
    const query = event.target.value;
    if (query) {
      const newFilter = (await axios.get(`/search?q=${query}`)).data;
      setFilteredData(newFilter);
    } else setFilteredData([]);
  }

  const handleSubmit = async (event) => {
    const query = event.target.value;
    console.log(query);
  }

  return (
    <div className='search'>
      <div className='searchInputs'>
      <div className='searchIcon'>
          <SearchIcon/>
        </div>
        <input type="text" placeholder={placeholder} onChange={handleFilter} onSubmit={handleSubmit} />

      </div>
      {
        filteredData.length !== 0 && (
          <div className='dataResult'>
            {filteredData.map((value) => {
              return <a className='dataItem' href={value}><p>{value}</p></a>
            })}
          </div>
        )
      }
    </div>
  )
}

export default SearchBar