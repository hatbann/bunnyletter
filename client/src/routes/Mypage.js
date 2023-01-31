import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Nav from '../components/Nav';
import Main from './Main';

import './css/mypage.css';
import axios from 'axios';
import { useEffect } from 'react';

import Letter from '../components/Letter';

import bufferToDataUrl from 'buffer-to-data-url';

const Mypage = () => {
  const user = useSelector((state) => state.user.user.data);
  const isLoggingIn = useSelector((state) => state.user.user.isLoggingIn);
  const [listIdx, setListIdx] = useState('send');
  const [letters, setLetters] = useState([]);

  //console.log(useSele ctor((state) => state.user));

  const sendBtnRef = useRef();
  const receiveBtnRef = useRef();

  useEffect(() => {
    if (listIdx === 'send') {
      getSendLetters();
    } else {
      getReceiveLetters();
    }
  }, [listIdx]);

  const getSendLetters = () => {
    axios
      .post('http://localhost:8000/getSendLetters', {
        userId: user.user_id,
      })
      .then((res) => {
        console.log(res.data);
        let letters = res.data;
        setLetters(letters);
      });
  };

  const getReceiveLetters = () => {
    axios
      .post('http://localhost:8000/getReceiveLetters', {
        userId: user.user_id,
      })
      .then((res) => {
        console.log(res.data);
        setLetters(res.data);
      });
  };

  const onClickBtn = (e) => {
    console.log(sendBtnRef.current.value);
    if (e.target.value === 'send') {
      setListIdx('send');
      sendBtnRef.current.classList.add('active');
      receiveBtnRef.current.classList.remove('active');
    } else {
      setListIdx('receive');
      sendBtnRef.current.classList.remove('active');
      receiveBtnRef.current.classList.add('active');
    }
  };

  const deleteAccount = () => {
    const confirm = window.confirm(
      '정말로 탈퇴하시겠습니까? 내가 받은 편지를 더이상 읽을 수 없게 됩니다.'
    );
    if (confirm === true) {
      axios
        .delete('http://localhost:8000/deleteUser', {
          data: { user_id: user.user_id },
        })
        .then((res) => {
          sessionStorage.clear();
          alert(res.data);
          window.location.href = '/';
        });
    }
  };

  return (
    <>
      {isLoggingIn ? (
        <>
          <Nav />
          <div className="mypage section">
            <section className="userInfo">
              <h2>{user.user_nickname} 님</h2>
              <button onClick={deleteAccount}>회원탈퇴</button>
            </section>
            <section className="letters">
              <div className="btns">
                <button
                  onClick={onClickBtn}
                  ref={sendBtnRef}
                  value="send"
                  className="active"
                >
                  내가 보낸
                </button>
                <button
                  onClick={onClickBtn}
                  ref={receiveBtnRef}
                  value="receive"
                >
                  내가 받은
                </button>
              </div>
              {letters.map((letter) => (
                <Letter
                  key={letter.id}
                  imgUrl={letter.img_url}
                  letterContext={letter.letter_context}
                  receiverId={letter.receiver_id}
                  senderId={letter.sender_id}
                  base64={letter.img_base64}
                />
              ))}
            </section>
          </div>
        </>
      ) : (
        <Main />
      )}
    </>
  );
};

export default Mypage;
