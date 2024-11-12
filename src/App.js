import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingScreen from './LandingScreen';
import ChatApp from './Chatapp';
import NotFound from './NotFound';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingScreen />}></Route>
          <Route path="/chat" element={<ChatApp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/users/profile" element={<Profile />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
