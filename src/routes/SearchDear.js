import React from 'react';

import Nav from '../components/Nav';
import './css/writeLetter.css';
import searchBtn from '../images/SearchBtn.png';

const SearchDear = () => {
  return (
    <>
      <Nav />
      <div className="write section">
        <h1>Search Dear</h1>
        <div className="searchForm">
          <form action="">
            <div>
              <input type="text" name="searchName" id="searchName" />
            </div>
            <p>닉네임으로 검색해보세요</p>
          </form>
          <button>
            <img src={searchBtn} alt="searchBtn" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchDear;
