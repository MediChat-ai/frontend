import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppLayout from './components/layout/AppLayout';
import Landing from './pages/Landing';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Hospital from './pages/Hospital';
import BoardList from './pages/community/BoardList';
import PostList from './pages/community/PostList';
import WritePost from './pages/community/WritePost';
import SinglePost from './pages/community/SinglePost';
import NaverCallback from './pages/NaverCallback';
import NotFound from './pages/NotFound';
import { env } from './config/env';

const App = () => {
  const googleClientId = env.googleClientId || '';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hospital" element={<Hospital />} />
            <Route path="/community" element={<BoardList />} />
            <Route path="/community/:boardId" element={<PostList />} />
            <Route path="/community/:boardId/new" element={<WritePost />} />
            <Route path="/community/:boardId/:postId" element={<SinglePost />} />
            <Route path="/users/profile" element={<Profile />} />
            <Route path="/users/login/naver/callback" element={<NaverCallback />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
