import React, { useRef } from 'react';
import Nav from '../components/Nav';
import './css/writeLetter.css';
import bunny from '../images/Bunny.png';
import { useLocation } from 'react-router-dom';

const ShareKakao = () => {
  const location = useLocation();

  const bunnyCard = location.state;
  const imgURL = window.URL.createObjectURL(bunnyCard);

  const onClickShare = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init('d97b7b839267dc8a1120ffca40fbf8d3');
      }

      kakao.Link.createCustomButton({
        container: '#kakaotalk-sharing-btn',
        templateId: 88708,
        templateArgs: {
          image: imgURL,
        },
      });
    }
  };

  return (
    <>
      <Nav />
      <div className="section">
        <img src={imgURL} alt="" id="bunnyBlobImg" />
      </div>
      <button onClick={onClickShare} id="kakaotalk-sharing-btn">
        공유하기
      </button>
    </>
  );
};

export default ShareKakao;
