import { createContext, useState } from 'react';
import './App.css';
import './reset.css';
import AppRouter from './routes/AppRouter';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from './store/module/user';

export const UserContext = createContext(); //유저에 대한 context(전역정보);

function App() {
  const [init, setInit] = useState(true); //처음에 정보 가져오기위함

  const dispatch = useDispatch();

  const userInfo = {
    user_id: sessionStorage.getItem('user_id'),
    user_pw: sessionStorage.getItem('user_pw'),
    user_nickname: sessionStorage.getItem('user_nickname'),
  };

  if (userInfo.user_id) {
    dispatch(setUserInfo(userInfo, true));
  } else {
    dispatch(setUserInfo(userInfo, false));
  }
  //유저 가져오면 정보는 useContext로 전역관리
  //우선 있다고 가정함
  // const user = {
  //   nickName: '조혜빈',
  //   email: 'hhbbcho@naver.com',
  // };

  return (
    <>
      {init ? (
        <UserContext.Provider value={userInfo}>
          <AppRouter />
        </UserContext.Provider>
      ) : (
        'Initializing....'
      )}
    </>
  );
}

export default App;
