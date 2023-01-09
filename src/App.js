import { createContext, useState } from 'react';
import './App.css';
import AppRouter from './routes/AppRouter';

export const UserContext = createContext(); //유저에 대한 context(전역정보);

function App() {
  const [init, setInit] = useState(true); //처음에 정보 가져오기위함
  //유저 가져오면 정보는 useContext로 전역관리
  //우선 있다고 가정함
  /*const user = {
    nickName: '조혜빈',
    email: 'hhbbcho@naver.com',
  };
  */

  const user = undefined;

  return (
    <>
      {init ? (
        <UserContext.Provider value={user}>
          <AppRouter />
        </UserContext.Provider>
      ) : (
        'Initializing....'
      )}
    </>
  );
}

export default App;
