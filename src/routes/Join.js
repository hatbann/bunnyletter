import React from 'react';
import Nav from '../components/Nav';

import joinBtn from '../images/JoinBtn.png';

import './css/join.css';

const Join = () => {
  return (
    <>
      <Nav />
      <div className="join section">
        <h1>Join</h1>
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
            <div>
              <label htmlFor="userEmail">Email</label>
              <input type="email" name="userEmail" id="userEmail" />
            </div>
          </form>
          <button>
            <img src={joinBtn} alt="loginBtn" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Join;
