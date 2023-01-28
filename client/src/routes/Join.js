import React, { useRef } from "react";
import axios from "axios";
import Nav from "../components/Nav";

import joinBtn from "../images/JoinBtn.png";

import "./css/join.css";

const Join = () => {
  const idRef = useRef();
  const pwRef = useRef();
  const nickNameRef = useRef();

  function onClickJoin() {
    console.log(idRef.current.value);
    if (idRef.current.value === "" || idRef.current.value === undefined) {
      alert("아이디를 입력하세요");
      idRef.current.focus();
      return false;
    }

    if (pwRef.current.value === "" || pwRef.current.value === undefined) {
      alert("비밀번호를 입력하세요");
      pwRef.current.focus();
      return false;
    }

    if (
      nickNameRef.current.value === "" ||
      nickNameRef.current.value === undefined
    ) {
      alert("닉네임를을 입력하세요");
      nickNameRef.current.focus();
      return false;
    }

    axios
      .post("http://localhost:8000/join", {
        id: idRef.current.value,
        pw: pwRef.current.value,
        nickName: nickNameRef.current.value,
      })
      .then((res) => {
        if (res.data.check === true) {
          console.log("clickLogin", res);
        } else {
          alert("실패");
        }
      });
  }

  return (
    <>
      <Nav />
      <div className="join section">
        <h1>Join</h1>
        <div className="loginForm">
          <form action="">
            <div>
              <label htmlFor="userId">ID</label>
              <input type="text" name="userId" id="userId" ref={idRef} />
            </div>
            <div>
              <label htmlFor="userPw">PW</label>
              <input type="password" name="userPw" id="userPw" ref={pwRef} />
            </div>
            <div>
              <label htmlFor="userEmail">닉네임</label>
              <input
                type="text"
                name="userNickName"
                id="userNickName"
                ref={nickNameRef}
              />
            </div>
          </form>
          <button>
            <img src={joinBtn} alt="loginBtn" onClick={onClickJoin} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Join;
