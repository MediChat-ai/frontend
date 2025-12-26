import { useEffect } from 'react';
import useTitle from '../hooks/useTitle';
import { api } from '../lib/http';

const NaverCallback = () => {
  useTitle('MediChat - Naver Login');

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.replace('#', '?'));
    const params: Record<string, string> = {};
    hashParams.forEach((value, key) => {
      params[key] = value;
    });

    const completeLogin = async () => {
      try {
        const response = await api.post('/users/oauth/naver', params);
        if (response.data.status === 'failure') {
          alert('네이버 로그인 중 오류가 발생했습니다.');
          window.location.href = '/login';
          return;
        }
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
      } catch (error) {
        console.error(error);
        alert('네이버 로그인에 실패했습니다.');
        window.location.href = '/login';
      }
    };

    completeLogin();
  }, []);

  return (
    <section className="glass-panel" style={{ textAlign: 'center' }}>
      <p style={{ color: 'var(--muted)' }}>네이버 계정을 확인하는 중입니다...</p>
      <div className="spinner-glow" />
    </section>
  );
};

export default NaverCallback;
