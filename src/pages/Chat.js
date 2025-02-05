import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/src/jquery';
import '../assets/css/Articles-Badges-images.css';
import '../assets/css/Bootstrap-Chat.css';
import '../assets/css/dmp_Inputs_Generic_Phone_Required.css';
import '../assets/css/Navbar-With-Button-icons.css';
import '../assets/css/Pricing-Duo-badges.css';
import Navbar from '../components/Navbar';
import useTitle from '../hooks/useTitle';

const backendURI = process.env.REACT_APP_BACKEND_URI;
const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;

const Chat = () => {
  useTitle('MediChat - AI 채팅');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: '안녕하세요! 저는 당신의 의료 상담을 도와드릴 MediChat AI에요. 채팅창 위에서 원하시는 채팅 방식을 선택할 수 있어요.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemma2-9b-it');
  const chatBoxRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${backendURI}/users/auth`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => {
          if (response.status !== 200)
            alert(response.data.error);
        })
        .catch(error => {
          console.error('토큰 검증 실패:', error);
        });
    } else {
      alert('로그인이 필요합니다.');
      window.location.href = '/';
    }
  }, []);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: input }
    ]);

    setLoading(true);

    try {
      let aiResponse = '';
      const groqResponse = await axios.post(
        `https://api.groq.com/openai/v1/chat/completions`,
        {
          model: selectedModel,
          messages: [
            { role: "system", content: "당신은 친절한 의료 상담 AI입니다. 질문에 대해 정확하고 도움이 되는 답변을 제공해야 합니다. 한국어로 답변하세요." },
            { role: "user", content: input }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );
      aiResponse = groqResponse.data.choices[0].message.content;

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
      setLoading(false);
    }

    setInput('');
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleModelChange = (model) => {
    setSelectedModel(model);
  };

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar />
      <div className="chat-container container d-flex flex-column flex-grow-1 position-relative" style={{ maxWidth: '600px' }}>
        <div className="dropdown mb-3">
          <button
            className="btn btn-success dropdown-toggle"
            type="button"
            id="modelDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedModel}
          </button>
          <ul className="dropdown-menu" aria-labelledby="modelDropdown">
            <li><button className="dropdown-item" onClick={() => handleModelChange('gemma2-9b-it')}>gemma2-9b-it</button></li>
            <li><button className="dropdown-item" onClick={() => handleModelChange('deepseek-r1-distill-llama-70b')}>deepseek-r1-distill-llama-70b</button></li>
            <li><button className="dropdown-item" onClick={() => handleModelChange('llama3-8b-8192')}>llama3-8b-8192</button></li>
            <li><button className="dropdown-item" onClick={() => handleModelChange('llama-3.3-70b-specdec')}>llama-3.3-70b-specdec</button></li>
            <li><button className="dropdown-item" onClick={() => handleModelChange('mixtral-8x7b-32768')}>mixtral-8x7b-32768</button></li>
          </ul>
        </div>
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
            viewBox="0 0 16 16"
            role="img"
            aria-label="Warning:"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          기존의 '정확하지만 느림' 모델인 MediChat은 현재 지원되지 않습니다.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
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
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                  {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          ))}
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
