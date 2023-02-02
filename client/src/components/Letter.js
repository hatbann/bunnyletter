import React from 'react';
import { useState } from 'react';
import './css/letter.css';
import bunny from '../images/Bunny.png';
import axios from 'axios';

const Letter = (data) => {
  console.log(data);
  const [imgUrl, setImgURL] = useState(data.imgUrl);
  const [letterContext, setLetterContext] = useState(data.letterContext);
  const [receiverNickname, setReceiverNickname] = useState(
    data.receiverNickname
  );
  const [senderNickname, setSenderNickname] = useState(data.senderNickname);
  const [imgBase64, setImgBase64] = useState(data.base64);
  const [date, setDate] = useState(data.date);
  const [senderVisible, setSenderVisible] = useState('1');
  const [receiverVisible, setReceiverVisible] = useState('1');

  //편지 visible 값 변경 (PUT)
  const onClickDelete = () => {
    const confirm = window.confirm(
      '편지를 삭제하게 되면 다시는 볼 수 없게 됩니다. 정말로 삭제하시겠습니까?'
    );

    if (confirm === true) {
      axios.put('http://localhost:8000/deleteLetter', {
        imgURL: imgUrl,
        receiver_nickname: receiverNickname,
        sender_nickname: senderNickname,
        letter_context: letterContext,
        date: date,
      });
    }
  };

  return (
    <div>
      <div>
        <span>From. {senderNickname}</span>
        <span>To. {receiverNickname}</span>
      </div>
      <img className="mypageBunny" src={imgBase64}></img>
      <button onClick={onClickDelete}>삭제</button>
    </div>
  );
};

export default Letter;
