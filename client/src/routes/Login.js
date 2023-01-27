import React, { useRef } from 'react';
import Nav from '../components/Nav';

import './css/login.css';
import axios from 'axios';

import loginBtn from '../images/LoginBtn.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const idRef = useRef();
  const pwRef = useRef();

  const navigate = useNavigate();

  const onClickLogin = () => {
    console.log(idRef.current.value);
    if (idRef.current.value === '' || idRef.current.value === undefined) {
      alert('아이디를 입력하세요');
      idRef.current.focus();
      return false;
    }

    if (pwRef.current.value === '' || pwRef.current.value === undefined) {
      alert('비밀번호를 입력하세요');
      pwRef.current.focus();
      return false;
    }

    axios
      .post('http://localhost:3001/login', {
        id: idRef.current.value,
        pw: pwRef.current.value,
      })
      .then((res) => {
        if (res.data.check == true) {
          console.log('clickLogin', res);
        } else {
          alert('실패');
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
