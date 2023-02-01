import React, { useRef } from 'react';
import './css/login.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Nav from '../components/Nav';
import loginBtn from '../images/LoginBtn.png';

import { setUserInfo } from '../store/module/user';

const Login = () => {
  const idRef = useRef();
  const pwRef = useRef();

  const onClickLogin = () => {
    if (idRef.current.value === '' || idRef.current.value === undefined) {
      alert('아이디를 입력하세요.');
      idRef.current.focus();
      return false;
    }

    if (pwRef.current.value === '' || pwRef.current.value === undefined) {
      alert('비밀번호를 입력하세요.');
      pwRef.current.focus();
      return false;
    }

    axios
      .post('http://localhost:8000/login', {
        id: idRef.current.value,
        pw: pwRef.current.value,
      })
      .then((res) => {
        if (res.data.check == true) {
          alert(res.data.msg);
          sessionStorage.setItem('user_id', res.data.userInfo.user_id);
          //sessionStorage.setItem('user_pw', res.data.userInfo.user_pw);
          sessionStorage.setItem(
            'user_nickname',
            res.data.userInfo.user_nickname
          );
          window.location.href = '/';
        } else {
          alert(res.data.msg);
        }
      });
  };

  return (
    <>
      <Nav />
      <div className="login section">
        <h1>Login</h1>
        <div className="loginForm">
          <form action="">
            <div>
              <label htmlFor="userId">ID</label>
              <input type="text" name="userId" id="userId" ref={idRef} />
            </div>
            <div>
              <label htmlFor="userPw">PW</label>
              <input type="password" name="userPw" id="userPw" ref={pwRef} />
            </div>
          </form>
          <button>
            <img src={loginBtn} alt="loginBtn" onClick={onClickLogin} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
