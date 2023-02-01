import React from 'react';
import { useState } from 'react';
import './css/letter.css';
import bunny from '../images/Bunny.png';

const Letter = (data) => {
  const [imgUrl, setImgURL] = useState(data.imgUrl);
  const [letterContext, setLetterContext] = useState(data.letterContext);
  const [receiverId, setReceiverId] = useState(data.receiverId);
  const [senderId, setSenderId] = useState(data.senderId);
  const [imgBase64, setImgBase64] = useState(data.base64);

  // function toBase64(arr) {
  //   //arr = new Uint8Array(arr) if it's an ArrayBuffer
  //   return btoa(
  //     arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
  //   );
  // }

  return (
    <div>
      <span>From. {senderId}</span>
      <p>{letterContext}</p>
      <img className="mypageBunny" src={imgBase64}></img>
      <span>To. {receiverId}</span>
    </div>
  );
};

export default Letter;
