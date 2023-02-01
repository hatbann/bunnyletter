import React, { useRef } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';

import joinBtn from '../images/JoinBtn.png';

import './css/join.css';

const Join = () => {
  const idRef = useRef();
  const pwRef = useRef();
  const checkPwRef = useRef();
  const nickNameRef = useRef();
  const pwContentRef = useRef();

  function onClickJoin() {
    console.log(idRef.current.value);
    if (idRef.current.value === '' || idRef.current.value === undefined) {
      alert('아이디를 입력하세요.');
      idRef.current.focus();
      return false;
    }

    if (
      pwRef.current.value === '' ||
      pwRef.current.value === undefined ||
      checkPwRef.current.value === '' ||
      checkPwRef.current.value === undefined
    ) {
      alert('비밀번호를 입력하세요.');
      pwRef.current.focus();
      return false;
    }

    if (
      nickNameRef.current.value === '' ||
      nickNameRef.current.value === undefined
    ) {
      alert('닉네임를 입력하세요.');
      nickNameRef.current.focus();
      return false;
    }

    //비밀번호 체크 정규식: 숫자, 영문 6자리 이상 입력 가능
    const CheckReg = (str) => {
      let reg = /^(?=.*[A-Za-z])(?=.*[0-9]).{6,20}$/;
      return reg.test(str);
    };

    if (!CheckReg(idRef.current.value) || !CheckReg(pwRef.current.value)) {
      alert('아이디, 비밀번호는 영문, 숫자 조합으로 6자리 이상 입력해주세요.');
    } else if (pwRef.current.value !== checkPwRef.current.value) {
      pwContentRef.current.innerText = '비밀번호가 일치하지 않습니다. ';
    } else {
      pwContentRef.current.innerText = '비밀번호가 일치합니다.';
      axios
        .post('http://localhost:8000/join', {
          id: idRef.current.value,
          pw: pwRef.current.value,
          nickName: nickNameRef.current.value,
        })
        .then((res) => {
          if (res.data.check == true) {
            alert(res.data.msg);
            sessionStorage.setItem('user_id', res.data.userInfo.user_id);
            sessionStorage.setItem('user_pw', res.data.userInfo.user_pw);
            sessionStorage.setItem(
              'user_nickname',
              res.data.userInfo.user_nickname
            );
            window.location.href = '/';
          } else {
            alert(res.data.msg);
          }
        });
    }
  }

  return (
    <>
      <Nav />
      <div className="join section">
        <h1>Join</h1>
        <div className="joinForm">
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
              <label htmlFor="userConfirmPw">PW Check</label>
              <input
                type="password"
                name="userConfirmPw"
                id="userConfirmPw"
                ref={checkPwRef}
              ></input>
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
            <p className="passwordContent" ref={pwContentRef}></p>
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
