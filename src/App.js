import { React } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Chat from './pages/Chat';
import NotFound from './pages/404';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { GoogleOAuthProvider } from '@react-oauth/google';
import BoardList from './pages/Community/BoardList';
import PostList from './pages/Community/PostList';
import WritePost from './pages/Community/WritePost';
import SinglePost from './pages/Community/SinglePost';
import Hosptial from './pages/Hospital';
import NaverCallback from './pages/NaverCallback';

const clientid = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const App = () => {
  return (
    <div className='App'>
      <GoogleOAuthProvider clientId={clientid}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/users/login/naver/callback" element={<NaverCallback />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/community" element={<BoardList />}></Route>
            <Route path="/community/:_id" element={<PostList />}></Route>
            <Route path="/community/:_id/new" element={<WritePost />}></Route>
            <Route path="/community/:_id/:post_id" element={<SinglePost />}></Route>
            <Route path="/users/profile" element={<Profile />}></Route>
            <Route path="/hospital" element={<Hosptial />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;
