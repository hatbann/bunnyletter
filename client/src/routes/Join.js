import React, { useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";

import joinBtn from "../images/JoinBtn.png";

import "./css/join.css";

const Join = () => {
  const [emailJoin, setEmailJoin] = useState("");
  const [pwJoin, setPwJoin] = useState("");
  const [nicknameJoin, setNicknameJoin] = useState("");

  const register = () => {
    const API = "http://localhost:3000/bunnyletter/join";
    axios
      .post(
        API,
        {
          email: emailJoin,
          pw: pwJoin,
          nickname: nicknameJoin,
        },
        {
          headers: new Headers(),
        }
      )
      .then((res) => {
        console.log(res);
        //   if (res.data == true) {
        //     alert("회원가입을 환영합니다!");
        //   } else {
        //     alert("다시 한번 시도해주세요.");
        //   }
        // });
      });
  };

  return (
    <>
      <Nav />
      <div className="join section">
        <h1>Join</h1>
        <div className="loginForm">
          <form method="POST" onSubmit={register}>
            <div>
              <label htmlFor="userEmail">Email</label>
              <input
                type="email"
                name="userEmail"
                id="userEmail"
                onChange={(e) => {
                  setEmailJoin(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="userPw">PW</label>
              <input
                type="password"
                name="userPw"
                id="userPw"
                onChange={(e) => {
                  setPwJoin(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="userNickname">Nickname</label>
              <input
                type="text"
                name="userNickname"
                id="userNickname"
                onChange={(e) => {
                  setNicknameJoin(e.target.value);
                }}
              />
            </div>

            <button onClick={() => register()}>
              <img src={joinBtn} alt="loginBtn" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Join;
