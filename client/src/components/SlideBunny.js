import React from 'react';

import runningBunny from '../images/RunningBunny.png';

import './css/slidebunny.css';

const SlideBunny = () => {
  return (
    <div className="container">
      <div className="slideContainer">
        <div className="slideImg">
          <img src={runningBunny} alt="running..." />
        </div>
        <div className="slideImg">
          <img src={runningBunny} alt="running..." />
        </div>
        <div className="slideImg">
          <img src={runningBunny} alt="running..." />
        </div>
        <div className="slideImg">
          <img src={runningBunny} alt="running..." />
        </div>
        <div className="slideImg">
          <img src={runningBunny} alt="running..." />
        </div>
        <div className="slideImg">
          <img src={runningBunny} alt="running..." />
        </div>
        <div className="slideImg">
          <img src={runningBunny} alt="running..." />
        </div>
      </div>
    </div>
  );
};

export default SlideBunny;
