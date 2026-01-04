import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, authHeaders } from '../lib/http';

type GuardStatus = 'checking' | 'authorized' | 'blocked';

const alertCooldown: Record<string, number> = {};

const showAlertOnce = (key: string, message?: string) => {
  if (!message) return;
  const now = Date.now();
  const lastShown = alertCooldown[key] || 0;
  if (now - lastShown < 600) return;
  alertCooldown[key] = now;
  window.alert(message);
};

interface AuthGuardOptions {
  redirectTo?: string;
  loginMessage?: string;
  sessionExpiredMessage?: string;
  verifySession?: boolean;
}

const useAuthGuard = (options: AuthGuardOptions = {}) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<GuardStatus>('checking');
  const {
    redirectTo = '/login',
    loginMessage = '로그인이 필요합니다.',
    sessionExpiredMessage = '세션이 만료되었습니다. 다시 로그인해 주세요.',
    verifySession = true
  } = options;

  useEffect(() => {
    let cancelled = false;
    const token = localStorage.getItem('token');

    if (!token) {
      setStatus('blocked');
      showAlertOnce(`missing-token-${redirectTo}`, loginMessage);
      navigate(redirectTo, { replace: true });
      return;
    }

    if (!verifySession) {
      if (!cancelled) {
        setStatus('authorized');
      }
      return;
    }

    api
      .get('/users/auth', { headers: authHeaders() })
      .then(() => {
        if (!cancelled) {
          setStatus('authorized');
        }
      })
      .catch(() => {
        if (cancelled) return;
        setStatus('blocked');
        localStorage.removeItem('token');
        showAlertOnce(`expired-token-${redirectTo}`, sessionExpiredMessage);
        navigate(redirectTo, { replace: true });
      });

    return () => {
      cancelled = true;
    };
  }, [navigate, redirectTo, loginMessage, sessionExpiredMessage, verifySession]);

  return {
    canAccess: status === 'authorized',
    isChecking: status === 'checking'
  };
};

export default useAuthGuard;
