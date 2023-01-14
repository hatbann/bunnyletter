import React, { useRef } from 'react';
import Nav from '../components/Nav';
import './css/writeLetter.css';
import bunny from '../images/Bunny.png';
import { useLocation } from 'react-router-dom';

const ShareKakao = () => {
  const location = useLocation();

  const bunnyCard = location.state;
  const imgURL = window.URL.createObjectURL(bunnyCard);

  return (
    <>
      <Nav />
      <div className="section">
        <img src={imgURL} alt="" id="bunnyBlobImg" />
      </div>
    </>
  );
};

export default ShareKakao;
