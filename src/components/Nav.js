import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
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
            <NavLink to="/">
              <img src={logo} alt="logo" id="logoImg" />
            </NavLink>
          </div>
          <div className="navLinks">
            <NavLink to="/login" id="loginLink" activeClassName="active">
              <span>Login</span>
            </NavLink>
            <NavLink to="/join" activeClassName="active">
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
            <NavLink to="/mypage" activeClassName="active">
              <span>My</span>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
