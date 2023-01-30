import React, { useRef } from 'react';
import Nav from '../components/Nav';
import './css/writeLetter.css';
import bunny from '../images/Bunny.png';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ShareKakao = () => {
  const location = useLocation();

  const bunnyCard = location.state.blob;
  const imgURL = window.URL.createObjectURL(bunnyCard);

  //img 세션 저장 -> but 새로고침마다 url 주소가 바뀜.
  sessionStorage.setItem('img_url', imgURL);

  const user = useSelector((state) => state.user.user.data);

  //카카오톡 공유하기
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

  //letter DB 저장
  const onClickSave = () => {
    const receiverID = location.state.receiver.user_id;
    const senderID = user.user_id;
    const letterContext = sessionStorage.getItem('letter_context');

    console.log(letterContext);
    axios
      .post('http://localhost:8000/saveletter', {
        imgURL: imgURL,
        receiverID: receiverID,
        senderID: senderID,
        letter_context: letterContext,
      })
      .then((res) => {
        if (res.data.check === true) {
          alert(res.data.msg);
          window.location.href = '/mypage';
        } else alert(res.data.msg);
      });
  };

  return (
    <>
      <div className="section share">
        <Nav />
        <img src={imgURL} alt="" id="bunnyBlobImg" />
      <button onClick={onClickShare} id="kakaotalk-sharing-btn">
        카카오톡
      </button>
      <button onClick={onClickSave}>저장하기</button>
      </div>
    </>
  );
};

export default ShareKakao;
