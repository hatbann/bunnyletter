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

      /*
        axios로 letter db에 저장 => db에서 가져오기
        => 가져온 이미지를 보내기
      */

      kakao.Link.createCustomButton({
        container: '#kakaotalk-sharing-btn',
        templateId: 88708,
        templateArgs: {
          img: 'https://i.pinimg.com/564x/1c/ee/c0/1ceec0a79c4516cb3171a1e9a482e64f.jpg',
        },
      });
    }
  };

  return (
    <>
      <div className="section share">
        <Nav />
        <img src={imgURL} alt="" id="bunnyBlobImg" />
        <button onClick={onClickShare} id="kakaotalk-sharing-btn">
          카카오톡 공유하기
        </button>
      </div>
    </>
  );
};

export default ShareKakao;
