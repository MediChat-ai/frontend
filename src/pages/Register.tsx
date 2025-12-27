import { FormEvent, useMemo, useState, useEffect } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import useTitle from '../hooks/useTitle';
import { api } from '../lib/http';

const evaluatePasswordStrength = (password: string) => {
  let strength = 0;
  // Require 10+ chars for the length criterion
  if (password.length >= 10) strength += 1;
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
  const [formMessage, setFormMessage] = useState('');

  const passwordStrength = useMemo(() => evaluatePasswordStrength(password), [password]);

  useEffect(() => {
    if (password.length >= 10 && passwordStrength >= 4) setFormMessage('');
  }, [password, passwordStrength]);

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // clear any previous inline messages
    setFormMessage('');

    if (!/^[a-zA-Z0-9]+$/.test(userId)) {
      alert('아이디는 영문과 숫자만 사용할 수 있습니다.');
      return;
    }

    // Enforce 10+ chars and full-strength (4 criteria) before registering.
    if (password.length < 10 || passwordStrength < 4) {
      setFormMessage('비밀번호가 안전하지 않습니다. 10자 이상, 대문자, 숫자, 특수문자를 포함해 주세요.');
      return;
    }

    if (password !== passwordCheck) {
      setFormMessage('비밀번호가 일치하지 않습니다. 입력하신 비밀번호를 확인해 주세요.');
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
              onChange={(e) => { setPassword(e.target.value); setFormMessage(''); }}
              required
              placeholder="대문자/숫자/특수문자 포함"
            />
            {/* Upgraded strength indicator: segmented bar + checklist */}
            <div className="strength-block mt-3">
              <div className="strength-bar" aria-hidden>
                <div className={`strength-segment ${passwordStrength >= 1 ? 'active' : ''}`}></div>
                <div className={`strength-segment ${passwordStrength >= 2 ? 'active' : ''}`}></div>
                <div className={`strength-segment ${passwordStrength >= 3 ? 'active' : ''}`}></div>
                <div className={`strength-segment ${passwordStrength >= 4 ? 'active' : ''}`}></div>
              </div>

              <div className="strength-meta d-flex justify-content-between align-items-center mt-2">
                <small className="strength-label text-muted">{['매우 약함','약함','보통','강함'][Math.max(0, passwordStrength-1)] || '약함'}</small>
                <small className="strength-score">{passwordStrength}/4</small>
              </div>

              <ul className="strength-criteria mt-2">
                <li className={password.length >= 10 ? 'met' : ''}>10자 이상</li>
                <li className={/[A-Z]/.test(password) ? 'met' : ''}>대문자 포함</li>
                <li className={/[0-9]/.test(password) ? 'met' : ''}>숫자 포함</li>
                <li className={/[^a-zA-Z0-9]/.test(password) ? 'met' : ''}>특수문자 포함</li>
              </ul>
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="registerPwCheck">비밀번호 확인</label>
            <input id="registerPwCheck" type="password" value={passwordCheck} onChange={(e) => { setPasswordCheck(e.target.value); setFormMessage(''); }} required />
          </div>
          <br />
          {formMessage && (
            <div className="form-error mt-3" role="alert">
              {formMessage}
            </div>
          )}

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
              {loading ? '가입 중...' : '회원가입'}
            </button>
          </div>
        </form>

        <div className="d-flex align-items-center gap-3 my-4">
          <hr className="flex-grow-1" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>또는</span>
          <hr className="flex-grow-1" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        </div>

        <div className="d-flex justify-content-center">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => alert('구글 로그인 실패')} useOneTap={false} width="100%" />
        </div>

        <p className="text-center mt-4 mb-0" style={{ color: 'var(--muted)' }}>
          이미 계정이 있나요? <a href="/login" style={{ color: 'rgb(113,243,166)', textDecoration: 'none' }}>로그인하기</a>
        </p>
      </div>
    </section>
  );
};

export default Register;
