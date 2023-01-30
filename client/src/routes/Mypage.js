import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Nav from '../components/Nav';
import Main from './Main';

import './css/mypage.css';
import axios from 'axios';

const Mypage = () => {
  const user = useSelector((state) => state.user.user.data);
  const isLoggingIn = useSelector((state) => state.user.user.isLoggingIn);

  //console.log(useSele ctor((state) => state.user));

  const sendBtnRef = useRef();
  const receiveBtnRef = useRef();

  const onClickBtn = (e) => {
    console.log(sendBtnRef.current.value);
    if (e.target.value === 'send') {
      sendBtnRef.current.classList.add('active');
      receiveBtnRef.current.classList.remove('active');
    } else {
      sendBtnRef.current.classList.remove('active');
      receiveBtnRef.current.classList.add('active');
    }
  };

  const deleteAccount = () => {
    const confirm = window.confirm('정말로 탈퇴하시겠습니까?');
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
