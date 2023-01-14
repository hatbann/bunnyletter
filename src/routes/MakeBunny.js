import React, { useRef } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

import Nav from '../components/Nav';
import './css/writeLetter.css';
import bunny from '../images/Bunny.png';
import { useNavigate } from 'react-router-dom';

const MakeBunny = () => {
  let buunyCardRef = useRef();
  const navigate = useNavigate();

  const onCapture = () => {
    const card = buunyCardRef.current;
    domtoimage.toBlob(card).then((blob) => {
      navigate('/shareKakao', { state: blob });
    });
  };

  return (
    <>
      <Nav />
      <div className="write section">
        <div className="contentForm" id="bunnyForm" ref={buunyCardRef}>
          <img src={bunny} alt="" />
          <form action="">
            <div>
              <textarea
                name="content"
                id="content"
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </form>
        </div>
        <button className="sendBtn" onClick={onCapture}>
          Send
        </button>
      </div>
    </>
  );
};

export default MakeBunny;
