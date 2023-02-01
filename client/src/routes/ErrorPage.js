import React from 'react';
import CryingBunny from '../images/cryingBunny.png';
import Nav from '../components/Nav';
import './css/main.css';

const ErrorPage = () => {
  return (
    <div className="errorPage">
      <Nav />
      <img src={CryingBunny} alt="crying" />
      <h2>요청하신 페이지를 찾을 수 없습니다</h2>
    </div>
  );
};

export default ErrorPage;
