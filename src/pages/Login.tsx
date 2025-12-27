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
        <h2>MediChat 계정에 로그인하세요</h2>
        <p style={{ color: 'var(--muted)', marginTop: 4 }}>하나의 계정으로 상담 기록, 병원 정보, 커뮤니티 활동을 모두 이어갈 수 있습니다.</p>
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
          <br />
          <div className="d-flex justify-content-center">
            <button
              className="btn"
              type="submit"
              disabled={loading}
              style={{
                background: 'rgba(113,243,166,0.85)',
                border: '1px solid rgba(113,243,166,0.4)',
                color: '#021409',
                fontWeight: 600,
                borderRadius: '10px',
                padding: '8px 16px',
                minWidth: '140px',
                width: 'auto'
              }}
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </div>
        </form>

        <div className="d-flex align-items-center gap-3 my-4">
          <hr className="flex-grow-1" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>또는</span>
          <hr className="flex-grow-1" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        </div>

        <div className="d-flex justify-content-center">
          <GoogleLogin onSuccess={handleGoogleLogin} onError={() => alert('구글 로그인 실패')} useOneTap={false} width="100%" />
        </div>

        <p className="text-center mt-4 mb-0" style={{ color: 'var(--muted)' }}>
          아직 계정이 없나요? <a href="/register" style={{ color: 'rgb(113,243,166)', textDecoration: 'none' }}>지금 가입하기</a>
        </p>
      </div>
    </section>
  );
};

export default Login;
