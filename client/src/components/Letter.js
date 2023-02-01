import React from 'react';
import { useState } from 'react';
import './css/letter.css';
import bunny from '../images/Bunny.png';

const Letter = (data) => {
  const [imgUrl, setImgURL] = useState(data.imgUrl);
  const [letterContext, setLetterContext] = useState(data.letterContext);
  const [receiverNickname, setReceiverNickname] = useState(
    data.receiverNickname
  );
  const [senderNickname, setSenderNickname] = useState(data.senderNickname);
  const [imgBase64, setImgBase64] = useState(data.base64);

  // function toBase64(arr) {
  //   //arr = new Uint8Array(arr) if it's an ArrayBuffer
  //   return btoa(
  //     arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
  //   );
  // }

  return (
    <div>
      <div>
        <span>From. {senderNickname}</span>
        <span>To. {receiverNickname}</span>
      </div>
      <img className="mypageBunny" src={imgBase64}></img>
    </div>
  );
};

export default Letter;
