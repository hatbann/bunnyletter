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

const MakeBunny = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let bunnyCardRef = useRef();
  let textAreaRef = useRef();

  const receiver = location.state.searchResult;

  const onClickSend = () => {
    let letterContext = textAreaRef.current.value;
    if (
      letterContext === '' ||
      letterContext === undefined ||
      letterContext === null
    ) {
      alert('편지 내용을 입력해주세요.');
    } else {
      console.log(receiver);
      const card = bunnyCardRef.current;

      domtoimage.toPng(card).then((dataUrl) => {
        var img = new Image();
        img.src = dataUrl;
        //console.log(img);

        navigate('/shareKakao', {
          state: {
            blob: img.src,
            receiver: receiver,
            letterContext: textAreaRef.current.value,
          },
        });
      });

      //domtoimage.toBlob(card).then((blob) => {
      // navigate('/shareKakao', {
      //   state: { blob: blob, receiver: receiver, img: image },
      // });
      //});

      /*
      let scale = 2;
      domtoimage
        .toBlob(card, {
          width: card.clientWidth * scale,
          height: card.clientHeight * scale,
          style: {
            transform: 'scale(' + scale + ')',
            transformOrigin: 'top left',
          },
        })
        .then((blob) => {
          navigate('/shareKakao', {
            state: { blob: blob, receiver: receiver },
          });
        });
        */
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
              ></textarea>
            </div>
          </form>
        </div>
        <p>Dear. {receiver.user_nickname}</p>
        <button className="sendBtn" onClick={onClickSend}>
          Send
        </button>
      </div>
    </>
  );
};

export default MakeBunny;
