import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

import logo from '../images/Logo.png';
import './css/nav.css';

const Nav = () => {
  const user = useContext(UserContext);
  console.log(user);

  return (
    <>
      {!user ? (
        <div className="nav">
          <div>
            <Link to="/">
              <img src={logo} alt="logo" id="logoImg" />
            </Link>
          </div>
          <div>
            <Link to="/login" id="loginLink">
              <span>Login</span>
            </Link>
            <Link to="/join">
              <span>Join</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="nav">
          <div>
            <Link to="/">
              <img src={logo} alt="logo" id="logoImg" />
            </Link>
          </div>
          <div>
            <Link to="/mypage">
              <span>My</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
