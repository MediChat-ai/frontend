import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { label: '홈', path: '/' },
  { label: 'AI 챗봇', path: '/chat' },
  { label: '병원 정보', path: '/hospital' },
  { label: '커뮤니티', path: '/community' },
  { label: '프로필', path: '/users/profile' }
];

const Navbar = () => {
  const [isAuthed, setIsAuthed] = useState(() => Boolean(localStorage.getItem('token')));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorage = () => setIsAuthed(Boolean(localStorage.getItem('token')));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthed(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top glass-nav">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          <span className="d-inline-flex align-items-center justify-content-center rounded" style={{ width: 32, height: 32, background: 'rgba(113,243,166,0.18)', border: '1px solid rgba(113,243,166,0.2)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="rgb(113,243,166)" viewBox="0 0 16 16">
              <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/>
              <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"/>
            </svg>
          </span>
          <span className="fw-semibold" style={{ color: '#fff' }}>MediChat</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `nav-link`}
                  style={({ isActive }) => ({ 
                    color: isActive ? 'rgb(113,243,166)' : 'rgba(255,255,255,0.7)',
                    fontWeight: isActive ? 500 : 400
                  })}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="d-flex gap-2">
            {isAuthed ? (
              <button className="btn btn-sm" onClick={logout} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>로그아웃</button>
            ) : (
              <>
                <button className="btn btn-sm" onClick={() => navigate('/login')} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>로그인</button>
                <button className="btn btn-sm" onClick={() => navigate('/register')} style={{ background: 'rgba(113,243,166,0.85)', border: '1px solid rgba(113,243,166,0.4)', color: '#021409', fontWeight: 600 }}>회원가입</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
