import React, { useRef } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { useLocation } from 'react-router-dom';

import Nav from '../components/Nav';
import './css/writeLetter.css';
import bunny from '../images/Bunny.png';
import { useNavigate } from 'react-router-dom';
import user from '../store/module/user';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import html2canvas from '@nidi/html2canvas';

const MakeBunny = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [textLen, setTextLen] = useState(0);

  let bunnyCardRef = useRef();
  let textAreaRef = useRef();

  const receiver = location.state.searchResult;

  const onClickSend = () => {
    let letterContext = textAreaRef.current.value;

    let checkLen = checkLength();
    if (checkLen) {
      if (letterContext === '' || letterContext === undefined) {
        alert('편지 내용을 입력해주세요.');
      } else {
        //편지 내용 세션 저장
        sessionStorage.setItem('letter_context', letterContext);

        const card = bunnyCardRef.current;
        let scale = 2;
        window.scrollTo(0, 0);
        html2canvas(card, { backgroundColor: null, width: 380 }).then(
          (canvas) => {
            //console.log(canvas.toDataURL('image/png'));
            navigate('/shareKakao', {
              state: {
                blob: canvas.toDataURL('image/png'),
                receiver: receiver,
                letterContext: textAreaRef.current.value,
              },
            });
          }
        );
      }
    }
  };

  const checkLength = () => {
    let text = textAreaRef.current.value;
    let textLength = text.length;
    console.log(textLength);
    let maxLength = 200;
    if (textLength > maxLength) {
      alert(maxLength + '자 이상 작성할 수 없습니다');
      text = text.substr(0, maxLength);
      textAreaRef.current.focus();
      return false;
    }
    return true;
  };

  const checkEnter = (e) => {
    if (e.key === 'Enter') {
      checkLength();
    }
  };

  return (
    <>
      <Nav />
      <div className="write section">
        <div className="contentForm" id="bunnyForm" ref={bunnyCardRef}>
          <img src={bunny} alt="" />
          <form action="">
            <div>
              <textarea
                ref={textAreaRef}
                name="content"
                id="content"
                cols="30"
                rows="10"
                onKeyUp={checkEnter}
                onChange={() => {
                  setTextLen(textAreaRef.current.value.length);
                }}
              ></textarea>
            </div>
          </form>
        </div>
        <p id="textLen">{textLen}/200</p>
        <p>Dear. {receiver.user_nickname}</p>

        <button className="sendBtn" onClick={onClickSend}>
          Send
        </button>
      </div>
    </>
  );
};

export default MakeBunny;
