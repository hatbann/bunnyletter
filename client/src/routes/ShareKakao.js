import React, { useRef } from 'react';
import Nav from '../components/Nav';
import './css/writeLetter.css';
import bunny from '../images/Bunny.png';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const ShareKakao = () => {
  const location = useLocation();
  const [finishSend, setFinishSend] = useState(false);
  const [imgId, setImgId] = useState();

  const bunnyCard = location.state.blob;
  const imgURL = window.URL.createObjectURL(bunnyCard);

  useEffect(() => {
    console.log(imgId);
  }, [imgId]);

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
        db에서 가져오기
        => 가져온 이미지를 보내기
      */

      console.log(imgId);
      axios
        .post('http://localhost:8000/getLetterImg', {
          imgId: imgId,
        })
        .then(async (res) => {
          console.log(res.data.letter);
          if (res.data.check === true) {
            kakao.Link.cleanup();
            kakao.Link.createCustomButton({
              container: '#kakaotalk-sharing-btn',
              templateId: 88708,
              templateArgs: {
                img: res.data.imgURL,
              },
            });
            //window.location.href = '/mypage';
          } else {
            alert(res.data.msg);
          }
        });
    }
  };

  //letter DB 저장
  const onClickSave = () => {
    const receiverID = location.state.receiver.user_id;
    const senderID = user.user_id;
    const letterContext = sessionStorage.getItem('letter_context');

    axios
      .post('http://localhost:8000/saveletter', {
        imgURL: imgURL,
        receiverID: receiverID,
        senderID: senderID,
        letter_context: letterContext,
      })
      .then((res) => {
        if (res.data.check === true) {
          setFinishSend(true);
          setImgId(Number(res.data.imgId));
          alert(res.data.msg);
          //window.location.href = '/mypage';
        } else {
          setFinishSend(true);

          alert(res.data.msg);
        }
      });
  };

  return (
    <>
      <div className="section share">
        <Nav />
        <img src={imgURL} alt="" id="bunnyBlobImg" />
        {finishSend ? (
          <button onClick={onClickShare} id="kakaotalk-sharing-btn">
            카카오톡 공유하기
          </button>
        ) : (
          <button onClick={onClickSave}>bunnyletter 전송하기</button>
        )}
      </div>
    </>
  );
};

export default ShareKakao;
