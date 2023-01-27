import React, { useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";

import "./css/login.css";
import loginBtn from "../images/LoginBtn.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  return (
    <>
      <Nav />
      <div className="login section">
        <h1>Login</h1>
        <div className="loginForm">
          <form action="">
            <div>
              <label htmlFor="userEmail">Email</label>
              <input
                type="email"
                name="userEmail"
                id="userEmail"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="userPw">PW</label>
              <input
                type="password"
                name="userPw"
                id="userPw"
                onChange={(event) => {
                  setPw(event.target.value);
                }}
              />
            </div>

            <button>
              <img src={loginBtn} alt="loginBtn" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
