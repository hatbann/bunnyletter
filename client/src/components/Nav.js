import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../store/module/user';

import logo from '../images/Logo.png';
import './css/nav.css';

const Nav = () => {
  const user = useSelector((state) => state.user.user.data);
  const isLoggingIn = useSelector((state) => state.user.user.isLoggingIn);

  const dispatch = useDispatch();

  return (
    <>
      {!isLoggingIn ? (
        <div className="nav">
          <div>
            <NavLink to="/">
              <img src={logo} alt="logo" id="logoImg" />
            </NavLink>
          </div>
          <div className="navLinks">
            <NavLink to="/login" id="loginLink" activeclassname="active">
              <span>Login</span>
            </NavLink>
            <NavLink to="/join" activeclassname="active">
              <span>Join</span>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="nav">
          <div>
            <NavLink to="/">
              <img src={logo} alt="logo" id="logoImg" />
            </NavLink>
          </div>
          <div className="navLinks">
            <NavLink to="/mypage" activeclassname="active">
              <span>My</span>
            </NavLink>
            <button
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
