import React, { useRef } from 'react';
import Nav from '../components/Nav';
import './css/writeLetter.css';
import bunny from '../images/Bunny.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import useDidMountEffect from '../components/useDidMountEffect';
import moment from 'moment';

const ShareKakao = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [finishSend, setFinishSend] = useState(false);
  const [imgId, setImgId] = useState(0);

  const imgURL = location.state.blob;
  console.log(location.state.blob.slice(22));
  //const imgURL = window.URL.createObjectURL(bunnyCard)

  let imgURLBlob = location.state.blob.slice(22);
  //console.log('imgUrl', imgURL);
  while (imgURLBlob.length % 4 > 0) {
    imgURLBlob += '=';
  }

  console.log(imgURLBlob);
  useDidMountEffect(() => {
    if (window.Kakao) {
      console.log(finishSend);
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init('d97b7b839267dc8a1120ffca40fbf8d3');
      }

      kakao.Link.createCustomButton({
        container: '#kakaotalk-sharing-btn',
        templateId: 88708,
      });
    }
  }, [finishSend]);

  if (window.kakao) {
  }
  //img 세션 저장 -> but 새로고침마다 url 주소가 바뀜.
  //sessionStorage.setItem('img_url', imgURL);

  const user = useSelector((state) => state.user.user.data);
  const receiver = location.state.receiver;
  //카카오톡 공유하기
  const onClickShare = () => {
    /*
        db에서 가져오기
        => 가져온 이미지를 보내기
      */

    console.log(imgId);
    axios
      .post('http://27.96.130.247:4000/getLetterImg', {
        imgId: imgId,
      })
      .then(async (res) => {
        if (res.data.check === true) {
        } else {
          alert(res.data.msg);
        }
      });
  };

  //letter DB 저장
  const onClickSave = () => {
    const receiverID = receiver.user_id;
    const senderID = user.user_id;
    const letterContext = location.state.letterContext;
    let momentDate = moment().format('MMMM Do YYYY');
    //console.log(momentDate);

    axios
      .post('http://27.96.130.247:4000/saveletter', {
        imgURL: imgURL,
        receiverID: receiverID,
        senderID: senderID,
        letter_context: letterContext,
        senderNickname: user.user_nickname,
        receiverNickname: receiver.user_nickname,
        date: momentDate,
      })
      .then((res) => {
        if (res.data.check === true) {
          setFinishSend(true);
          setImgId(Number(res.data.imgId));
          alert(res.data.msg);
        } else {
          setFinishSend(true);
          setImgId(Number(res.data.imgId));
          alert(res.data.msg);
        }
      });
  };

  const searchResult = receiver;

  const onClickBack = () => {
    navigate('/makeBunny', {
      state: {
        searchResult,
      },
    });
  };

  return (
    <>
      <Nav />
      <div className="section share">
        <img src={imgURL} alt="" id="bunnyBlobImg" />
        {finishSend ? (
          <>
            <button onClick={onClickShare} id="kakaotalk-sharing-btn">
              카카오톡 공유하기
            </button>
            <button onClick={onClickBack}>편지 쓰기</button>
          </>
        ) : (
          <>
            <p>Dear. {receiver.user_nickname}</p>
            <button onClick={onClickSave}>bunnyletter 전송하기</button>
          </>
        )}
      </div>
    </>
  );
};

export default ShareKakao;
