import { FormEvent, useState } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import useTitle from '../hooks/useTitle';
import { api } from '../lib/http';

const Login = () => {
  useTitle('MediChat - 로그인');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(
        '/users/login',
        { user_id: userId, pw: password },
        { validateStatus: (status) => status < 500 }
      );

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
        return;
      }

      alert(response.data.error || '로그인에 실패했습니다.');
    } catch (error) {
      console.error(error);
      alert('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      alert('구글 인증 토큰을 가져오지 못했습니다.');
      return;
    }

    try {
      const response = await api.post('/users/oauth/google', { accessToken: credentialResponse.credential });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/';
    } catch (error) {
      console.error(error);
      alert('구글 로그인에 실패했습니다.');
    }
  };

  return (
    <section className="auth-grid">
      <div className="glass-panel auth-card">
        <p className="chip" style={{ width: 'fit-content' }}>다시 만나서 반가워요</p>
        <h2>투명한 로그인</h2>
        <p style={{ color: 'var(--muted)', marginTop: 4 }}>한 번의 로그인으로 챗봇 · 병원 · 커뮤니티를 이어보세요.</p>
        <form onSubmit={handleLogin}>
          <div className="form-field">
            <label htmlFor="userId">아이디</label>
            <input id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="medichat_user" required />
          </div>
          <div className="form-field">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button className="primary" type="submit" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
        <div className="divider">또는</div>
        <GoogleLogin onSuccess={handleGoogleLogin} onError={() => alert('구글 로그인 실패')} useOneTap={false} />
        <p style={{ color: 'var(--muted)' }}>
          아직 계정이 없나요? <a href="/register">지금 가입하기</a>
        </p>
      </div>
      <div className="glass-panel story-card">
        <h3>로그인하면</h3>
        <ul>
          <li>상담 기록을 기반으로 모델이 더 정밀하게 학습합니다.</li>
          <li>관심 병원과 커뮤니티 글을 저장할 수 있습니다.</li>
          <li>안전한 토큰 기반 인증으로 세션이 보호됩니다.</li>
        </ul>
      </div>
    </section>
  );
};

export default Login;
