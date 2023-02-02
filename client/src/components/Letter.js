import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './css/letter.css';
import bunny from '../images/Bunny.png';
import axios from 'axios';

const Letter = (data) => {
  const [receiverNickname, setReceiverNickname] = useState(
    data.data.receiver_nickname
  );
  const [date, setDate] = useState(data.data.date);
  const [senderNickname, setSenderNickname] = useState(
    data.data.sender_nickname
  );
  const [imgBase64, setImgBase64] = useState(data.data.img_base64);
  const user = useSelector((state) => state.user.user.data);

  console.log(data.data);

  const onClickHide = () => {
    let hide = window.confirm(
      '정말로 숨기시겠습니까? 숨기신 목록은 복구할 수 없습니다'
    );

    if (hide) {
      //보낸목록 가리기
      if (user.user_nickname === senderNickname) {
        axios.post('', {
          user_nickname: user.user_nickname,
        });
      } //받은 목록 가리기
      else if (user.user_nickname === receiverNickname) {
        axios.post('', {
          user_nickname: user.user_nickname,
        });
      }
    }
  };

  return (
    <div>
      <p>{date}</p>
      <div>
        <span>From. {senderNickname}</span>
        <span>To. {receiverNickname}</span>
      </div>
      <img className="mypageBunny" src={imgBase64}></img>
      <button onClick={onClickHide}>숨김</button>
    </div>
  );
};

export default Letter;
