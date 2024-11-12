import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/src/jquery';
import './assets/css/Articles-Badges-images.css';
import './assets/css/Bootstrap-Chat.css';
import './assets/css/dmp_Inputs_Generic_Phone_Required.css';
import './assets/css/Navbar-With-Button-icons.css';
import './assets/css/Pricing-Duo-badges.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';

const ChatApp = () => {
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const chatBoxRef = useRef(null);

  const sendMessage = () => {
    if (input.trim() === '') return;

    // 사용자 메시지 추가
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: input }
    ]);

    // AI 응답 추가 (예시로 고정된 응답)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'ai', text: "I'm here to help you with that!" }
      ]);
    }, 500); // 예시로 500ms 지연 추가

    // 입력 필드 초기화
    setInput('');
  };

  useEffect(() => {
    // 새 메시지가 추가될 때마다 스크롤을 아래로 이동
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="d-flex flex-column vh-100">
      <nav class="navbar navbar-light navbar-expand-md py-3">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center" href="/">
            <span class="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon">
              <FontAwesomeIcon icon={faCommentMedical} />
            </span><span>MediChat</span>
          </a>
          <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1">
            <span class="visually-hidden">Toggle navigation</span>
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navcol-1">
            <ul class="navbar-nav me-auto">
              <li class="nav-item"><a class="nav-link active" href="/chat">AI 챗봇</a></li>
              <li class="nav-item"><a class="nav-link" href="/hospital">병원 정보</a></li>
              <li class="nav-item"><a class="nav-link" href="/community">커뮤니티</a></li>
              <li class="nav-item"><a class="nav-link" href="/users/profile">프로필</a></li>
            </ul>
            <button className="btn btn-secondary" type="button" onClick={handleLogout}>로그아웃</button>
          </div>
        </div>
      </nav>

      <div className="chat-container container d-flex flex-column flex-grow-1 position-relative" style={{ maxWidth: '600px' }}>
        <div
          className="chat-box p-3 bg-light flex-grow-1"
          ref={chatBoxRef}
          style={{
            overflowY: 'auto',
            borderRadius: '10px',
            marginBottom: '60px'
          }}
        >
          {messages.map((msg, index) => (
            <div key={index} className={`d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
              <div className={`text-white p-2 mb-2 rounded-3 ${msg.sender === 'user' ? 'bg-primary' : 'bg-secondary'}`} style={{ maxWidth: '70%' }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div
          className="input-group p-3 position-fixed bottom-0 start-50 translate-middle-x w-100 bg-white"
          style={{ maxWidth: '600px', zIndex: 10 }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="메시지를 입력하세요."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button className="btn btn-primary" type="button" onClick={sendMessage}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
