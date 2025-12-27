import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/globals.css';
import useTitle from '../hooks/useTitle';
import { env } from '../config/env';

const Landing: React.FC = () => {
  useTitle('MediChat');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`${env.backend}/users/auth`, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          if (response.status === 200) setIsLoggedIn(true);
          else {
            setIsLoggedIn(false);
            alert(response.data.error);
          }
        })
        .catch((error) => {
          console.error('토큰 검증 실패:', error);
          setIsLoggedIn(false);
        });
    }
  }, []);

  return (
    <div className="d-flex flex-column">
      {/* Hero Section - Reduced height with rounded corners */}
      <section
        className="d-flex align-items-center justify-content-center text-center text-white mx-3 mx-md-5 mt-4 glass-hero rounded-hero hero-image"
        style={{
          background: 'linear-gradient(135deg, rgba(6,12,22,0.85), rgba(3,6,14,0.9)), url("https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2") center / cover no-repeat',
        }}
      >
          <div className="container hero-container px-4 py-5">
          <h1 className="display-4 fw-bold mb-3">빠르고 정확한 의료 상담,<br className="d-md-none" /> AI로 완성하다</h1>
          <p className="lead mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
            의료 특화 챗봇 MediChat은 신뢰할 수 있는 의료 경험을 제공합니다.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {isLoggedIn ? (
              <a href="/chat" className="btn btn-success btn-lg px-4" style={{ background: 'rgba(25,215,122,0.85)', border: '1px solid rgba(25,215,122,0.4)' }}>AI 채팅 바로가기</a>
            ) : (
              <>
                <a href="/login" className="btn btn-lg px-4" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', backdropFilter: 'blur(10px)' }}>로그인</a>
                <a href="/register" className="btn btn-lg px-4" style={{ background: 'rgba(113,243,166,0.85)', border: '1px solid rgba(113,243,166,0.4)', color: '#021409' }}>회원 가입</a>
              </>
            )}
          </div>
          <div className="mt-4">
            <a
              href="https://github.com/MediChat-ai/android/releases/download/v1.02/MediChat.apk"
              target="_blank"
              rel="noreferrer"
              className="btn px-3 py-2"
              style={{ background: 'rgba(25,215,122,0.15)', border: '1px solid rgba(25,215,122,0.3)', color: 'rgb(113,243,166)' }}
            >
              📱 앱 다운로드
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5" style={{ background: 'transparent' }}>
        <div className="container">
          <h2 className="text-center mb-5">MediChat 기능</h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 glass-card">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <span className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: 64, height: 64, background: 'rgba(113,243,166,0.15)', border: '1px solid rgba(113,243,166,0.2)' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="rgb(113,243,166)" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                      </svg>
                    </span>
                  </div>
                  <h5 className="card-title" style={{ color: '#fff' }}>고성능 AI 챗봇</h5>
                  <p className="card-text" style={{ color: 'rgba(255,255,255,0.6)' }}>MediChat은 의료 전문가들이 검수한 데이터셋을 학습했습니다. 각종 질환의 원인과 예방법을 신속하게 알려드립니다.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 glass-card">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <span className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: 64, height: 64, background: 'rgba(113,243,166,0.15)', border: '1px solid rgba(113,243,166,0.2)' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="rgb(113,243,166)" viewBox="0 0 16 16">
                        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
                      </svg>
                    </span>
                  </div>
                  <h5 className="card-title" style={{ color: '#fff' }}>신뢰할 수 있는 병원 정보</h5>
                  <p className="card-text" style={{ color: 'rgba(255,255,255,0.6)' }}>가까운 병원 찾기부터 전문 분야별 병원 정보까지, MediChat이 최신 정보를 제공합니다.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 glass-card">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <span className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: 64, height: 64, background: 'rgba(113,243,166,0.15)', border: '1px solid rgba(113,243,166,0.2)' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="rgb(113,243,166)" viewBox="0 0 16 16">
                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
                      </svg>
                    </span>
                  </div>
                  <h5 className="card-title" style={{ color: '#fff' }}>전문가와 함께하는 커뮤니티</h5>
                  <p className="card-text" style={{ color: 'rgba(255,255,255,0.6)' }}>의사, 전문가들이 모여 의학 지식을 공유하는 커뮤니티로 정확한 정보를 얻으세요.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 mx-3 mx-md-5 my-4 text-white" style={{ background: 'rgba(25,215,122,0.15)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(113,243,166,0.2)', borderRadius: '20px' }}>
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4 mb-md-0">
              <h2 className="display-5 fw-bold">7백만+</h2>
              <p className="mb-0 opacity-75">데이터셋 파일</p>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <h2 className="display-5 fw-bold">20억+</h2>
              <p className="mb-0 opacity-75">AI 모델 파라미터</p>
            </div>
            <div className="col-md-4">
              <h2 className="display-5 fw-bold">1+</h2>
              <p className="mb-0 opacity-75">사용자</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-5" style={{ background: 'transparent' }}>
        <div className="container">
          <h2 className="text-center mb-2">가격</h2>
          <p className="text-center mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>MediChat은 합리적인 가격에 고성능 AI를 제공합니다.</p>
          <div className="row justify-content-center g-4">
            <div className="col-lg-5 col-md-6">
              <div className="card h-100 glass-card">
                <div className="card-body p-4">
                  <h4 className="fw-bold" style={{ color: '#fff' }}>무료 플랜</h4>
                  <p style={{ color: 'rgba(255,255,255,0.6)' }}>일반 사용자용</p>
                  <h3 className="display-6 fw-bold mb-4" style={{ color: '#fff' }}>₩0</h3>
                  <ul className="list-unstyled mb-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    <li className="mb-2 d-flex align-items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(113,243,166)" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg>
                      MediChat AI에 무제한 액세스
                    </li>
                    <li className="mb-2 d-flex align-items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(113,243,166)" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg>
                      병원 정보 제공
                    </li>
                    <li className="mb-2 d-flex align-items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(113,243,166)" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg>
                      의료 커뮤니티 사용
                    </li>
                  </ul>
                  <a href="/register" className="btn w-100" style={{ background: 'rgba(113,243,166,0.85)', border: '1px solid rgba(113,243,166,0.4)', color: '#021409', fontWeight: 600 }}>회원 가입</a>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              <div className="card h-100 glass-card" style={{ border: '1px solid rgba(113,243,166,0.18)' }}>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h4 className="fw-bold" style={{ color: '#fff' }}>프로 플랜</h4>
                      <p style={{ color: 'rgba(255,255,255,0.7)' }} className="mb-0">의료 전문가용</p>
                    </div>
                    <span className="badge" style={{ background: 'rgba(113,243,166,0.3)', color: 'rgb(113,243,166)', border: '1px solid rgba(113,243,166,0.4)' }}>Best Value</span>
                  </div>
                  <h3 className="display-6 fw-bold mb-4" style={{ color: '#fff' }}>₩5,900/월</h3>
                  <ul className="list-unstyled mb-4" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    <li className="mb-2 d-flex align-items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(113,243,166)" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg>
                      MediChat AI에 무제한 액세스
                    </li>
                    <li className="mb-2 d-flex align-items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(113,243,166)" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg>
                      병원 정보 제공
                    </li>
                    <li className="mb-2 d-flex align-items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(113,243,166)" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg>
                      의료 커뮤니티에 전문가로 등록
                    </li>
                  </ul>
                  <button className="btn w-100" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)' }} disabled>준비중인 기능입니다</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5" style={{ background: 'transparent' }}>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <iframe
                allowFullScreen
                title="map"
                frameBorder={0}
                loading="lazy"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDfKbBYd-RVuKhOO1AS9cmgn5p616kvnZc&q=%EA%B0%80%EC%B2%9C%EB%8C%80%ED%95%99%EA%B5%90+%EA%B8%80%EB%A1%9C%EB%B2%8C%EC%BA%A0%ED%8D%BC%EC%8A%A4&zoom=14"
                className="w-100"
                style={{ height: '473.02px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
            <div className="col-lg-6">
              <div className="card h-100 glass-card" style={{ minHeight: '473.02px' }}>
                <div className="card-body p-4">
                  <h4 className="mb-4" style={{ color: '#fff' }}>건의사항</h4>
                  <form>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="name" style={{ color: 'rgba(255,255,255,0.7)' }}>이름</label>
                      <input className="form-control" type="text" id="name" name="name" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '12px' }} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="email" style={{ color: 'rgba(255,255,255,0.7)' }}>Email</label>
                      <input className="form-control" type="email" id="email" name="email" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '12px' }} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="message" style={{ color: 'rgba(255,255,255,0.7)' }}>건의사항</label>
                      <textarea className="form-control" id="message" name="message" rows={4} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '12px' }} />
                    </div>
                    <button className="btn" type="submit" style={{ background: 'rgba(113,243,166,0.85)', border: '1px solid rgba(113,243,166,0.4)', color: '#021409', fontWeight: 600 }}>전송</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
