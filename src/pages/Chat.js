import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/src/jquery';
import '../assets/css/Articles-Badges-images.css';
import '../assets/css/Bootstrap-Chat.css';
import '../assets/css/dmp_Inputs_Generic_Phone_Required.css';
import '../assets/css/Navbar-With-Button-icons.css';
import '../assets/css/Pricing-Duo-badges.css';
import Navbar from '../components/Navbar';

const backendHost = process.env.REACT_APP_BACKEND_HOST;
const backendPort = process.env.REACT_APP_BACKEND_PORT;

// RunPod API 설정
const RUNPOD_API_KEY = process.env.REACT_APP_RUNPOD_API_KEY;
const RUNPOD_ENDPOINT_ID = process.env.REACT_APP_RUNPOD_ENDPOINT_ID;
const BASE_URL = `https://api.runpod.ai/v2/${RUNPOD_ENDPOINT_ID}/openai/v1`;
const MODEL_NAME = process.env.REACT_APP_MODEL_NAME;

const Chat = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const chatBoxRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`http://${backendHost}:${backendPort}/users/auth`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => {
          if (response.status === 200) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
            alert(response.data.error);
          }
        })
        .catch(error => {
          console.error('토큰 검증 실패:', error);
          setIsLoggedIn(false);
        });
    } else {
      alert('로그인이 필요합니다.');
      window.location.href = '/';
    }
  }, []);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    // 사용자 메시지 추가
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: input }
    ]);

    // 로딩 상태 활성화
    setLoading(true);

    try {
      // RunPod API 호출
      const response = await axios.post(
        `${BASE_URL}/chat/completions`,
        {
          model: MODEL_NAME,
          messages: [{ role: "user", content: input }],
          temperature: 0,
          max_tokens: 512
        },
        {
          headers: {
            Authorization: `Bearer ${RUNPOD_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      // AI 응답 추가
      const aiResponse = response.data.choices[0].message.content;
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'ai', text: aiResponse }
      ]);
    } catch (error) {
      console.error('AI 응답 오류:', error.response?.data || error.message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'ai', text: '오류가 발생했습니다. 다시 시도해주세요.' }
      ]);
    } finally {
      // 로딩 상태 비활성화
      setLoading(false);
    }

    // 입력 필드 초기화
    setInput('');
  };

  useEffect(() => {
    // 새 메시지가 추가될 때마다 스크롤을 아래로 이동
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar />
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
          {/* 로딩 중 메시지 표시 */}
          {loading && (
            <div className="d-flex justify-content-start">
              <div className="text-secondary p-2 mb-2 rounded-3 bg-light" style={{ maxWidth: '70%' }}>
                로딩 중...
              </div>
            </div>
          )}
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
            disabled={loading} // 로딩 중에는 입력 비활성화
          />
          <button className="btn btn-primary" type="button" onClick={sendMessage} disabled={loading}>
            {loading ? '전송 중...' : '전송'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
