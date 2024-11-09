import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ChatApp() {
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

    // AI 응답 추가 (여기서는 예시로 고정 응답)
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: input },
      { sender: 'ai', text: "I'm here to help you with that!" }
    ]);

    // 입력 필드 초기화
    setInput('');
  };

  useEffect(() => {
    // 새 메시지가 추가될 때마다 스크롤을 아래로 이동
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  return (
    <div>
      <nav className="navbar navbar-light navbar-expand-md py-3">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <span className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-bezier">
                <path fillRule="evenodd" d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5v-1zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"></path>
                <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5v-1zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z"></path>
              </svg>
            </span><span>MediChat</span>
          </a>
          <button className="btn btn-primary" type="button">Log out</button>
        </div>
      </nav>
      
      <div className="chat-container container my-3">
        <div className="chat-box p-3 bg-light" ref={chatBoxRef} style={{ height: '500px', overflowY: 'scroll', borderRadius: '10px' }}>
          {messages.map((msg, index) => (
            <div key={index} className={`d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
              <div className={`text-white p-2 mb-2 rounded-3 ${msg.sender === 'user' ? 'bg-primary' : 'bg-secondary'}`} style={{ maxWidth: '70%' }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="input-group mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button className="btn btn-primary" type="button" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
