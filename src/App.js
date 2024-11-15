import { React, useEffect, useState, Navigate } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Chat from './pages/Chat';
import NotFound from './pages/404';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Community from './pages/Community';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const App = () => {
  return (
    <div className='App'>
      <GoogleOAuthProvider clientId='16007817766-4t7ag4g6l14hgke4n99tmaefbioba20b.apps.googleusercontent.com'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
            {/* <Route path="/" element={isLoggedIn ? <Navigate to="/chat" /> : <Landing />}></Route> */}
            {/* <Route path="/chat" element={isLoggedIn ? <Chat /> : <Landing />}></Route> */}
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/community" element={<Community />}></Route>
            <Route path="/users/profile" element={<Profile />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
