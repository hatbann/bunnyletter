import React from 'react';

import Nav from '../components/Nav';
import './css/writeLetter.css';
import bunny from '../images/Bunny.png';

const MakeBunny = () => {
  return (
    <>
      <Nav />
      <div className="write section">
        <div className="contentForm">
          <img src={bunny} alt="" />
          <form action="">
            <div>
              <textarea
                name="content"
                id="content"
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </form>
        </div>
        <button className="sendBtn">Send</button>
      </div>
    </>
  );
};

export default MakeBunny;
