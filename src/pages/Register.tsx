import { FormEvent, useMemo, useState } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import useTitle from '../hooks/useTitle';
import { api } from '../lib/http';

const evaluatePasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
  return strength;
};

const Register = () => {
  useTitle('MediChat - 회원가입');

  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordStrength = useMemo(() => evaluatePasswordStrength(password), [password]);

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!/^[a-zA-Z0-9]+$/.test(userId)) {
      alert('아이디는 영문과 숫자만 사용할 수 있습니다.');
      return;
    }

    if (passwordStrength < 3) {
      alert('대문자, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 사용해 주세요.');
      return;
    }

    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        '/users/register',
        {
          user_id: userId,
          user_name: userName,
          auth_provider: 'local',
          pw: password
        },
        { validateStatus: (status) => status < 500 }
      );

      if (response.status !== 200) {
        alert(response.data.error || '회원가입에 실패했습니다.');
        setLoading(false);
        return;
      }

      alert('회원가입이 완료되었습니다. 로그인 중...');

      const loginResponse = await api.post('/users/login', { user_id: userId, pw: password }, { validateStatus: (status) => status < 500 });
      if (loginResponse.status === 200) {
        localStorage.setItem('token', loginResponse.data.token);
        window.location.href = '/';
      } else {
        alert('자동 로그인에 실패했습니다. 로그인 페이지로 이동합니다.');
        window.location.href = '/login';
      }
    } catch (error) {
      console.error(error);
      alert('회원가입 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      alert('구글 인증 토큰이 비어있습니다.');
      return;
    }

    try {
      const response = await api.post('/users/oauth/google', { accessToken: credentialResponse.credential });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/';
    } catch (error) {
      console.error(error);
      alert('구글 가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <section className="auth-grid">
      <div className="glass-panel auth-card">
        <p className="chip" style={{ width: 'fit-content' }}>투명한 온보딩</p>
        <h2>새 계정 만들기</h2>
        <p style={{ color: 'var(--muted)', marginTop: 4 }}>AI 상담, 병원 검색, 커뮤니티를 한 계정으로 연결하세요.</p>
        <form onSubmit={handleRegister}>
          <div className="form-field">
            <label htmlFor="registerId">아이디</label>
            <input id="registerId" value={userId} onChange={(e) => setUserId(e.target.value)} required placeholder="영문+숫자" />
          </div>
          <div className="form-field">
            <label htmlFor="registerName">닉네임</label>
            <input id="registerName" value={userName} onChange={(e) => setUserName(e.target.value)} required placeholder="표시 이름" />
          </div>
          <div className="form-field">
            <label htmlFor="registerPw">비밀번호</label>
            <input
              id="registerPw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="대문자/숫자/특수문자 포함"
            />
            <div style={{ marginTop: 8, height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.08)' }}>
              <div
                style={{
                  height: '100%',
                  width: `${(passwordStrength / 4) * 100}%`,
                  borderRadius: 999,
                  background: passwordStrength < 2 ? '#ff6b6b' : passwordStrength < 3 ? '#ffd166' : '#7cf7ff',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="registerPwCheck">비밀번호 확인</label>
            <input id="registerPwCheck" type="password" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} required />
          </div>
          <button className="primary" type="submit" disabled={loading}>
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>
        <div className="divider">또는</div>
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => alert('구글 로그인 실패')} useOneTap={false} />
        <p style={{ color: 'var(--muted)' }}>
          이미 계정이 있나요? <a href="/login">로그인하기</a>
        </p>
      </div>
      <div className="glass-panel story-card">
        <h3>가입 혜택</h3>
        <ul>
          <li>개인화된 모델 추천과 히스토리 제공</li>
          <li>병원 결과 즐겨찾기 및 알림</li>
          <li>전문가와의 커뮤니티 대화 참여</li>
        </ul>
      </div>
    </section>
  );
};

export default Register;
