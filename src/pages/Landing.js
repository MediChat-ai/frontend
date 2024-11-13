import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/src/jquery';
import '../assets/css/Articles-Badges-images.css';
import '../assets/css/Bootstrap-Chat.css';
import '../assets/css/dmp_Inputs_Generic_Phone_Required.css';
import '../assets/css/Navbar-With-Button-icons.css';
import '../assets/css/Pricing-Duo-badges.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import { React, useEffect, useState, Navigate } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const backendHost = process.env.REACT_APP_BACKEND_HOST;
const backendPort = process.env.REACT_APP_BACKEND_PORT;

const Landing = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post(`http://${backendHost}:${backendPort}/users/auth`, { token: token })
        .then(response => {
          if (response.status == 200) {
            setIsLoggedIn(true);
          }
          else {
            setIsLoggedIn(false);
            alert(response.data.error);
          }
        })
        .catch(error => {
          console.error('토큰 검증 실패:', error);
          setIsLoggedIn(false);
        });
    }
  }, []);
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  return (
    <div>
      {/* <nav className="navbar navbar-dark bg-dark navbar-expand-md py-3">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <span className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon">
              <FontAwesomeIcon icon={faCommentMedical} />
            </span>
            <span>MediChat</span>
          </a>
          <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1">
            <span className="visually-hidden">Toggle navigation</span>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><a className="nav-link" href="#feature">기능</a></li>
              <li className="nav-item"><a className="nav-link" href="#pricing">가격</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">건의사항</a></li>
            </ul>
            <a href="/login"><button className="btn btn-secondary me-2" type="button">로그인</button></a>
            <a href="/register"><button className="btn btn-primary" type="button">회원 가입</button></a>
          </div>
        </div>
      </nav> */}
      <Navbar />
      <section className="py-4 py-xl-5">
        <div className="container">
          <div className="border rounded border-0 d-flex flex-column justify-content-center align-items-center p-4 py-5" style={{ background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), linear-gradient(rgba(0,123,255,0.2), rgba(0,123,255,0.2)), url("https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2") center / cover', height: '500px' }}>
            <div className="row">
              <div className="col-md-10 col-xl-12 offset-xl-1 text-center d-flex d-sm-flex d-md-flex justify-content-center align-items-center mx-auto justify-content-md-start align-items-md-center justify-content-xl-center">
                <div>
                  <h1 className="text-uppercase fw-bold mb-3" style={{ color: 'white' }}>빠르고 정확한 의료 상담, AI로 완성하다</h1>
                  <p className="mb-4" style={{ color: 'white' }}>의료 특화 챗봇 MediChat은&nbsp;신뢰할 수 있는 의료 경험을 제공합니다.</p>
                  <div>
                    {isLoggedIn ? (
                      <a href="/chat"><button className="btn btn-success fs-5 py-2 px-4" type="button">AI 채팅 바로가기</button></a>
                    ) : (
                      <>
                        <a href="/login"><button className="btn btn-light me-2 fs-5 py-2 px-4" type="button">로그인</button></a>
                        <a href="/register"><button className="btn btn-primary fs-5 py-2 px-4" type="button">회원 가입</button></a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container py-4 py-xl-5" id='feature'>
          <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
              <h2>MediChat 기능</h2>
              {/* <p>Curae hendrerit donec commodo hendrerit egestas tempus, turpis facilisis nostra nunc. Vestibulum dui eget ultrices.</p> */}
            </div>
          </div>
          <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="bs-icon-md bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center d-inline-block mb-3 bs-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-bell">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"></path>
                  </svg></div>
                  <h4 className="card-title">고성능 AI 챗봇</h4>
                  <p className="card-text">MediChat은 의료 전문가들이 검수한 데이터셋을 학습했습니다. 각종 질환의 원인과 예방법을 신속하게 알려드립니다.</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="bs-icon-md bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center d-inline-block mb-3 bs-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-bezier">
                    <path fill-rule="evenodd" d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5v-1zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"></path>
                    <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5v-1zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z"></path>
                  </svg></div>
                  <h4 className="card-title">신뢰할 수 있는 병원 정보</h4>
                  <p className="card-text">가까운 병원 찾기부터 전문 분야별 병원 정보까지, MediChat이 최신 정보를 제공합니다. 나에게 맞는 의료기관을 손쉽게 찾으세요.</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="bs-icon-md bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center d-inline-block mb-3 bs-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-flag">
                    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"></path>
                  </svg></div>
                  <h4 className="card-title">전문가와 함께하는 커뮤니티</h4>
                  <p className="card-text">의사, 전문가들이 모여 의학 지식을 공유하는 커뮤니티로 정확한 정보를 얻으세요. 건강한 선택을 위한 현명한 조언이 기다립니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container py-4 py-xl-5">
          <div className="text-center text-white-50 bg-primary border rounded border-0 p-3">
            <div className="row row-cols-2 row-cols-md-3">
              <div className="col">
                <div className="p-3">
                  <h4 className="display-5 fw-bold text-white mb-0">7백만+</h4>
                  <p className="mb-0">데이터셋 파일</p>
                </div>
              </div>
              <div className="col">
                <div className="p-3">
                  <h4 className="display-5 fw-bold text-white mb-0">20억+</h4>
                  <p className="mb-0">AI 모델 파라미터</p>
                </div>
              </div>
              <div className="col">
                <div className="p-3">
                  <h4 className="display-5 fw-bold text-white mb-0">1+</h4>
                  <p className="mb-0">사용자</p>
                </div>
              </div>
              {/* <div className="col">
                <div className="p-3">
                  <h4 className="display-5 fw-bold text-white mb-0">89</h4>
                  <p className="mb-0">Erat netus</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="container py-4 py-xl-5" id='pricing'>
          <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
              <h2>가격</h2>
              <p>MediChat은 합리적인 가격에 고성능 AI를 제공합니다.</p>
            </div>
          </div>
          <div className="row gy-4 gx-md-0 gy-md-0 row-cols-1 row-cols-md-2 row-cols-xl-3 d-md-flex d-xl-flex align-items-md-center">
            <div className="col offset-xl-2">
              <div className="card bg-light border-0">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h3 className="fw-bold mb-0">무료 플랜</h3>
                      <p>일반 사용자용</p>
                      <h4 className="display-6 fw-bold"><strong>₩</strong>0</h4>
                    </div>
                  </div>
                  <div>
                    <ul className="list-unstyled">
                      <li className="d-flex mb-2"><span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                      </svg></span><span>MediChat AI에 무제한 액세스</span></li>
                      <li className="d-flex mb-2"><span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                      </svg></span><span>병원 정보 제공</span></li>
                      <li className="d-flex mb-2"><span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                      </svg></span><span>의료 커뮤니티 사용</span></li>
                    </ul>
                  </div><a className="btn btn-primary d-block w-100" role="button" href="/register">회원 가입</a>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-white bg-primary border-0">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h3 className="fw-bold text-white mb-0">프로 플랜</h3>
                      <p>의료 전문가용</p>
                      <h4 className="display-6 fw-bold text-white"><strong>₩5,900/월</strong></h4>
                    </div>
                    <div><span className="badge rounded-pill bg-primary text-uppercase bg-white-300">Best Value</span></div>
                  </div>
                  <div>
                    <ul className="list-unstyled">
                      <li className="d-flex mb-2"><span className="bs-icon-xs bs-icon-rounded bs-icon-semi-white bs-icon me-2"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                      </svg></span><span>MediChat AI에 무제한 액세스</span></li>
                      <li className="d-flex mb-2"><span className="bs-icon-xs bs-icon-rounded bs-icon-semi-white bs-icon me-2"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                      </svg></span><span>병원 정보 제공</span></li>
                      <li className="d-flex mb-2"><span className="bs-icon-xs bs-icon-rounded bs-icon-semi-white bs-icon me-2"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                      </svg></span><span>의료 커뮤니티에 전문가로 등록</span></li>
                    </ul>
                  </div><a className="btn btn-primary d-block w-100 bg-white-300 disabled" role="button">준비중인 기능입니다.</a>
                </div>
              </div>
            </div>
          </div>
          <section className="py-4 py-xl-5" id='contact'>
            <div className="container">
              <div className="row">
                <div className="col"><iframe allowfullscreen frameborder="0" loading="lazy" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDfKbBYd-RVuKhOO1AS9cmgn5p616kvnZc&amp;q=%EA%B0%80%EC%B2%9C%EB%8C%80%ED%95%99%EA%B5%90+%EA%B8%80%EB%A1%9C%EB%B2%8C%EC%BA%A0%ED%8D%BC%EC%8A%A4&amp;zoom=12" width="100%" height="100%"></iframe></div>
                <div className="col-md-6 col-xl-4">
                  <div>
                    <form className="p-3 p-xl-4" method="post">
                      <h4>건의사항</h4>
                      <div className="mb-3"><label className="form-label" for="name">이름</label><input className="form-control" type="text" id="name" name="name" /></div>
                      <div className="mb-3"><label className="form-label" for="email">Email</label><input className="form-control" type="email" id="email" name="email" /></div>
                      <div className="mb-3"><label className="form-label" for="message">건의사항</label><textarea className="form-control" id="message" name="message" rows="6"></textarea></div>
                      <div className="mb-3"><button className="btn btn-primary" type="submit">전송</button></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </section>
    </div>
  );
}

export default Landing;
