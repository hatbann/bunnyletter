import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from '../App';

import Main from './Main';
import Login from './Login';
import Join from './Join';
import MakeBunny from './MakeBunny';
import Mypage from './Mypage';
import SearchDear from './SearchDear';
import SendingAni from './SendingAni';
import ShareKakao from './ShareKakao';

import MypageEdit from './MypageEdit';

import ErrorPage from './ErrorPage';

const AppRouter = () => {
  const user = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/makeBunny" element={<MakeBunny />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/searchDear" element={<SearchDear />} />
        <Route path="/sending..." element={<SendingAni />} />
        <Route path="/shareKakao" element={<ShareKakao />} />
        <Route path="/editProfile" element={<MypageEdit />} />

        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
