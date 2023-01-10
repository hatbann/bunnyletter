import React from 'react';
import Nav from '../components/Nav';

import './css/login.css';
import loginBtn from '../images/LoginBtn.png';

const Login = () => {
  return (
    <>
      <Nav />
      <div className="login section">
        <h1>Login</h1>
        <div className="loginForm">
          <form action="">
            <div>
              <label htmlFor="userId">ID</label>
              <input type="text" name="userId" id="userId" />
            </div>
            <div>
              <label htmlFor="userPw">PW</label>
              <input type="password" name="userPw" id="userPw" />
            </div>
          </form>
          <button>
            <img src={loginBtn} alt="loginBtn" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
