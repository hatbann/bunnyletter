import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Nav from '../components/Nav';
import './css/writeLetter.css';
import searchBtn from '../images/SearchBtn.png';

const SearchDear = () => {
  const searchNickNameRef = useRef();
  const [searchResult, setSearchResult] = useState(null);

  const navigate = useNavigate();

  const onClickSearch = () => {
    if (
      searchNickNameRef.current.value === '' ||
      searchNickNameRef.current.value === undefined
    ) {
      alert('닉네임을 입력하세요.');
      searchNickNameRef.current.focus();
      return false;
    }

    console.log(searchResult);

    axios
      .post('http://27.96.130.247:3000/search', {
        searchNickName: searchNickNameRef.current.value,
      })
      .then((res) => {
        if (res.data.check === false) {
          alert(res.data.msg);
        } else {
          //console.log(res.data);

          let result = res.data.userInfo;
          setSearchResult(result);
        }
      });
  };

  const gotoSend = () => {
    navigate('/makeBunny', {
      state: {
        searchResult,
      },
    });
  };

  return (
    <>
      <Nav />
      <div className="search section">
        <h1>Search Dear</h1>
        <div className="searchForm">
          <form action="">
            <div>
              <input
                type="text"
                name="searchName"
                id="searchName"
                ref={searchNickNameRef}
              />
            </div>
            <p>닉네임으로 검색해보세요</p>
          </form>
          <button>
            <img src={searchBtn} alt="searchBtn" onClick={onClickSearch} />
          </button>
        </div>
        {searchResult ? (
          <div className="searchResult">
            <h2>검색결과</h2>
            <div>아이디 : {searchResult.user_id}</div>
            <div>닉네임 : {searchResult.user_nickname}</div>
            <button onClick={gotoSend}>보내기</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default SearchDear;
