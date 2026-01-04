import { FormEvent, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import useTitle from '../hooks/useTitle';
import useAuthGuard from '../hooks/useAuthGuard';
import { api } from '../lib/http';
import { UserTokenPayload } from '../types/auth';

const Profile = () => {
  useTitle('MediChat - 프로필');
  const { canAccess, isChecking } = useAuthGuard({
    loginMessage: '프로필은 로그인 후 이용할 수 있습니다.',
    sessionExpiredMessage: '세션이 만료되었습니다. 다시 로그인해 주세요.'
  });
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [authProvider, setAuthProvider] = useState<string>('local');
  const [nicknameInput, setNicknameInput] = useState('');
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '' });

  useEffect(() => {
    if (!canAccess) return;
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const decoded = jwtDecode<UserTokenPayload>(token);
      setUserId(decoded.user_id);
      setUserName(decoded.user_name);
      setAuthProvider(decoded.auth_provider);
    } catch (error) {
      console.error(error);
      localStorage.removeItem('token');
      alert('세션 정보를 확인할 수 없습니다. 다시 로그인해 주세요.');
      window.location.href = '/login';
    }
  }, [canAccess]);

  if (isChecking) {
    return (
      <section className="profile-grid">
        <div className="glass-panel" style={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="spinner-glow" />
        </div>
      </section>
    );
  }

  if (!canAccess) {
    return null;
  }

  const handleNicknameChange = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await api.post('/users/change/username', {
        token,
        new_username: nicknameInput
      });
      if (response.status === 200) {
        alert('닉네임이 변경되었습니다. 다시 로그인해 주세요.');
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    } catch (error) {
      console.error(error);
      alert('닉네임을 변경하지 못했습니다.');
    }
  };

  const handlePasswordChange = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await api.post('/users/change/password', {
        token,
        password: passwordForm.current,
        new_password: passwordForm.next
      });
      if (response.status === 200) {
        alert('비밀번호가 변경되었습니다. 다시 로그인해 주세요.');
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.error || '비밀번호 변경에 실패했습니다.');
    }
  };

  return (
    <section className="profile-grid">
      <div className="glass-panel">
        <p className="chip" style={{ width: 'fit-content' }}>내 계정</p>
        <h2>프로필 정보</h2>
        <p style={{ color: 'var(--muted)' }}>MediChat 전체 서비스에서 사용되는 기본 정보입니다.</p>
        <div className="form-field">
          <label>아이디</label>
          <input value={userId} disabled />
        </div>
        <div className="form-field">
          <label>닉네임</label>
          <input value={userName} disabled />
        </div>
        <div className="form-field">
          <label>인증 방식</label>
          <input value={authProvider} disabled />
        </div>
      </div>
      <div className="glass-panel">
        <h3>닉네임 변경</h3>
        <form onSubmit={handleNicknameChange}>
          <div className="form-field">
            <label htmlFor="nickname">새 닉네임</label>
            <input id="nickname" value={nicknameInput} onChange={(e) => setNicknameInput(e.target.value)} required />
          </div>
          <br />
          <div className="d-flex justify-content-start">
            <button
              className="btn"
              type="submit"
              style={{
                background: 'rgba(113,243,166,0.85)',
                border: '1px solid rgba(113,243,166,0.4)',
                color: '#021409',
                fontWeight: 600,
                borderRadius: '10px',
                padding: '8px 16px',
                minWidth: '140px'
              }}
            >
              닉네임 저장
            </button>
          </div>
        </form>
      </div>
      {authProvider === 'local' && (
        <div className="glass-panel">
          <h3>비밀번호 변경</h3>
          <form onSubmit={handlePasswordChange}>
            <div className="form-field">
              <label htmlFor="currentPw">현재 비밀번호</label>
              <input
                id="currentPw"
                type="password"
                value={passwordForm.current}
                onChange={(e) => setPasswordForm((prev) => ({ ...prev, current: e.target.value }))}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="newPw">새 비밀번호</label>
              <input
                id="newPw"
                type="password"
                value={passwordForm.next}
                onChange={(e) => setPasswordForm((prev) => ({ ...prev, next: e.target.value }))}
                required
              />
            </div>
            <br />
            <button className="secondary" type="submit">
              비밀번호 저장
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default Profile;
