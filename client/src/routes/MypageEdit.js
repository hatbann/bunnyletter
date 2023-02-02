import React, { useRef } from 'react';
import './css/mypageEdit.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import Nav from '../components/Nav';

import { setUserInfo } from '../store/module/user';
import Main from './Main';

const MypageEdit = (e) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user.data);
  const isLoggingIn = useSelector((state) => state.user.user.isLoggingIn);

  console.log(user);

  const pwRef = useRef();
  const checkPwRef = useRef();

  const CheckReg = (str) => {
    let reg = /^(?=.*[A-Za-z])(?=.*[0-9]).{6,20}$/;
    return reg.test(str);
  };

  const onClickEditPW = () => {
    if (pwRef.current.value === '' || pwRef.current.value === undefined) {
      alert('비밀번호를 입력하세요.');
      pwRef.current.focus();
    } else if (
      checkPwRef.current.value === '' ||
      checkPwRef.current.value === undefined
    ) {
      alert('비밀번호 확인값을 입력해주세요.');
      checkPwRef.current.focus();
      return false;
    } else if (
      !CheckReg(pwRef.current.value) ||
      !CheckReg(checkPwRef.current.value)
    ) {
      alert(
        '새 비밀번호는 영문, 숫자 조합으로 6자리 이상 20자리 이하로 입력해주세요.'
      );
    } else if (pwRef.current.value !== checkPwRef.current.value) {
      alert('새 비밀번호와 확인값이 일치하지 않습니다.');
    } else {
      axios
        .put('http://localhost:8000/editProfile', {
          user_id: user.user_id,
          user_nickname: user.user_nickname,
          user_pw: pwRef.current.value,
        })
        .then((res) => {
          let result = res.data;
          alert(result);
          if (result) {
            console.log(res.data);
            alert('비밀번호를 수정하였습니다.');
            window.location.href = '/';
          } else {
            alert('다시 한번만 확인해주세요.');
          }
        });
    }
  };

  return (
    <>
      {isLoggingIn ? (
        <>
          <Nav />
          <div className="edit section">
            <h1>My Profile</h1>
            <div className="editForm">
              <form>
                <div>
                  <label htmlFor="userId">ID</label>
                  <input
                    type="text"
                    name="userId"
                    id="userId"
                    value={user.user_id}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="userPw">닉네임</label>
                  <input
                    type="text"
                    name="userNickname"
                    id="userNickname"
                    value={user.user_nickname}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="userPw">New PW</label>
                  <input
                    type="password"
                    name="userPw"
                    id="userPw"
                    ref={pwRef}
                  />
                </div>
                <div>
                  <label htmlFor="userPwCheck">New PW Check</label>
                  <input
                    type="password"
                    name="userPwCheck"
                    id="userPwCheck"
                    ref={checkPwRef}
                  />
                </div>
              </form>
              <div className="btns">
                <button onClick={onClickEditPW}>Edit</button>
                <div>
                  <Link className="backToMypage" to="/mypage">
                    돌아가기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Main />
      )}
    </>
  );
};

export default MypageEdit;
