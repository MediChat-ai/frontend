import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import useTitle from '../hooks/useTitle';
import { api, authHeaders } from '../lib/http';
import { env } from '../config/env';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
}

interface ModelOption {
  id: string;
  label: string;
  description: string;
}

const modelOptions: ModelOption[] = [
  { id: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B', description: '범용 · 고성능' },
  { id: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B', description: '빠른 응답' },
  { id: 'meta-llama/llama-4-maverick-17b-128e-instruct', label: 'Llama 4 Maverick', description: '최신 · 지시형' },
  { id: 'meta-llama/llama-4-scout-17b-16e-instruct', label: 'Llama 4 Scout', description: '탐색 · 분석' },
  { id: 'groq/compound', label: 'Groq Compound', description: '복합 추론' },
  { id: 'groq/compound-mini', label: 'Groq Compound Mini', description: '경량 추론' },
  { id: 'moonshotai/kimi-k2-instruct', label: 'Kimi K2', description: '다국어 지원' },
  { id: 'openai/gpt-oss-120b', label: 'GPT OSS 120B', description: '대형 모델' },
  { id: 'openai/gpt-oss-20b', label: 'GPT OSS 20B', description: '중형 모델' },
  { id: 'qwen/qwen3-32b', label: 'Qwen3 32B', description: '중국어 특화' },
  { id: 'allam-2-7b', label: 'Allam 2 7B', description: '아랍어 특화' },
];

const Chat = () => {
  useTitle('MediChat - AI 채팅');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: '안녕하세요! MediChat AI입니다. 좌측 상단에서 원하는 모델을 선택하고 증상을 말씀해 주세요.'
    }
  ]);
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState(modelOptions[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      window.location.href = '/login';
      return;
    }

    api
      .get('/users/auth', { headers: authHeaders() })
      .catch(() => {
        alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
        localStorage.removeItem('token');
        window.location.href = '/login';
      });
  }, []);

  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.scrollTop = streamRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    if (!env.groqApiKey) {
      setError('GROQ API 키가 설정되지 않았습니다. .env 파일을 확인하세요.');
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: input.trim()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: selectedModel,
          messages: [
            { role: 'system', content: '당신은 친절한 한국어 의료 상담가입니다. 의학적 안전 문구를 포함해 안내하세요.' },
            { role: 'user', content: userMessage.text }
          ],
          temperature: 0.4
        },
        {
          headers: {
            Authorization: `Bearer ${env.groqApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const assistantText = response.data.choices?.[0]?.message?.content?.trim();
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: assistantText || '응답을 생성하지 못했습니다. 다시 시도해 주세요.'
        }
      ]);
    } catch (err) {
      console.error(err);
      setError('AI 응답을 가져오지 못했습니다. 잠시 후 다시 시도해 주세요.');
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: '오류가 발생했습니다. 네트워크 상태를 확인하거나 모델을 변경해 보세요.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const activeModel = modelOptions.find((model) => model.id === selectedModel);

  return (
    <section className="chat-page">
      <div className="glass-panel chat-panel">
        <div className="model-selector">
          <div>
            <p style={{ margin: 0, color: 'var(--muted)' }}>선택된 모델</p>
            <h3 style={{ margin: '4px 0' }}>{activeModel?.label ?? '모델 선택'}</h3>
          </div>
          <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
            {modelOptions.map((model) => (
              <option key={model.id} value={model.id}>
                {model.label} · {model.description}
              </option>
            ))}
          </select>
        </div>
        {error && <div className="alert">{error}</div>}
        <div className="chat-stream" ref={streamRef}>
          {messages.map((message) => (
            <div key={message.id} className={`message-row ${message.role === 'user' ? 'user' : ''}`}>
              <div className={`bubble ${message.role === 'user' ? 'user' : ''}`}>
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{message.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {loading && <div className="spinner-glow" />}
        </div>
        <div className="chat-input">
          <input
            placeholder="증상이나 고민을 입력하세요."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button className="primary" onClick={sendMessage} disabled={loading}>
            {loading ? '생성 중...' : '전송하기'}
          </button>
        </div>
      </div>
      <div className="glass-panel">
        <p className="chip" style={{ width: 'fit-content' }}>안전 가이드</p>
        <h3>AI 상담은 참고용이에요</h3>
        <p style={{ color: 'var(--muted)' }}>
          MediChat은 의료법을 준수하며 의료진의 진단을 대체하지 않습니다. 응급 상황이라면 119 또는 가까운 응급실을
          이용해 주세요.
        </p>
        <ul style={{ color: 'var(--muted)' }}>
          <li>민감 정보 입력 시 데이터가 암호화됩니다.</li>
          <li>권장 치료는 증상과 병원 정보에 따라 업데이트됩니다.</li>
          <li>AI 상담 후 커뮤니티에서 경험을 공유해보세요.</li>
        </ul>
      </div>
    </section>
  );
};

export default Chat;
