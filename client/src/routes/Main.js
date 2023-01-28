import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import { useSelector } from 'react-redux';
import { UserContext } from '../App';

import letter from '../images/letter.png';

import './css/main.css';

const Main = () => {
  const isLoggingIn = useSelector((state) => state.user.user.isLoggingIn);
  const navigate = useNavigate();

  function ClickSendBtn() {
    if (isLoggingIn) {
      navigate('/searchDear');
    } else {
      navigate('/login');
    }
  }

  return (
    <>
      <Nav />
      <div className="main section">
        <img src={letter} alt="letter" id="letterImg" />
        <button onClick={ClickSendBtn}>Send Your Bunny</button>
      </div>
    </>
  );
};

export default Main;
