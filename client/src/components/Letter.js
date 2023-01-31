import React from 'react';
import { useState } from 'react';

const Letter = (data) => {
  const [imgUrl, setImgURL] = useState(data.imgUrl);
  const [letterContext, setLetterContext] = useState(data.letterContext);
  const [receiverId, setReceiverId] = useState(data.receiverId);
  const [senderId, setSenderId] = useState(data.senderId);
  console.log(data);

  function toBase64(arr) {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
  }

  return (
    <div>
      <span>From. {senderId}</span>
      <p>{letterContext}</p>
      <img
        src={`data:image/png;base64,${toBase64(imgUrl.data)}`}
        alt="letter"
      ></img>
      <span>To. {receiverId}</span>
    </div>
  );
};

export default Letter;
