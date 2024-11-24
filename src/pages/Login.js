import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/src/jquery';
import '../assets/css/Articles-Badges-images.css';
import '../assets/css/Bootstrap-Chat.css';
import '../assets/css/dmp_Inputs_Generic_Phone_Required.css';
import '../assets/css/Navbar-With-Button-icons.css';
import '../assets/css/Pricing-Duo-badges.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const backendHost = process.env.REACT_APP_BACKEND_HOST;
const backendPort = process.env.REACT_APP_BACKEND_PORT;

const Login = () => {
  const { naver } = window; 
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const CLIENT_ID = "Rs60Wd69Nt1mWtUXwGSI"; // 네이버 개발자센터에서 발급받은 Client ID
  const REDIRECT_URI = "http://localhost:3000/users/login/naver/callback"; // 등록된 Redirect URI
  const STATE = Math.random().toString(36); // CSRF 공격 방지용 State 값

  useEffect(() => {
    naverLogin.init();
    console.log("init!");
    // getUser();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`http://${backendHost}:${backendPort}/users/login`, {
        user_id: userId,
        pw: password,
      }, { validateStatus: (status) => status !== 500 });

      if (response.status == 200) {
        localStorage.setItem('token', response.data.token);
        alert('로그인 성공!');
        window.location.href = '/';
      }
      else if (response.status == 401)
        alert(response.data.error);
    } catch (err) {
      alert(err);
      setError('로그인에 실패했습니다. 사용자 ID와 비밀번호를 확인하세요.');
      console.error('로그인 에러:', err);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    const { credential } = credentialResponse;

    try {
      const res = await axios.post(`http://${backendHost}:${backendPort}/users/oauth/google`, { accessToken: credential });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/';
    } catch (error) {
      console.error('로그인 실패:', error.response ? error.response.data : error.message);
      alert('로그인 실패:', error.response ? error.response.data : error.message);
    }
  };

  const handleFailure = (error) => {
    alert('구글 로그인 실패:', error);
  };

  const handleNaverLogin = () => {
    const loginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&state=${STATE}`;
    window.location.href = loginUrl; // 네이버 인증 페이지로 이동
  };

  const naverLogin = new naver.LoginWithNaverId({
    clientId: CLIENT_ID,
    callbackUrl: REDIRECT_URI,
    isPopup: 0,
    loginButton: {
      color: "green",
      type: 3,
      height: 50,
    },
  });

  return (
    <div>
      <Navbar />
      <section className="py-4 py-xl-5">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
              <h2>로그인</h2>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4">
              <div className="card mb-5">
                <div className="card-body d-flex flex-column align-items-center">
                  <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-person">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                  </svg></div>
                  <form className="text-center" method="post" onSubmit={handleLogin}>
                    <div className="mb-3"><input className="form-control" type="text" placeholder="ID" value={userId} onChange={(e) => setUserId(e.target.value)} required /></div>
                    <div className="mb-3"><input className="form-control" type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
                    <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">로그인</button></div>
                    <a href="/register"><p className="text-muted">MediChat이 처음이신가요?</p></a>
                  </form>
                  <div className="social-login-buttons mt-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span className="text-muted mb-3" style={{ fontSize: '14px' }}>소셜 계정으로 간편하게 로그인하세요!</span>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <GoogleLogin
                        buttonText=""
                        onSuccess={handleGoogleLogin}
                        onFailure={handleFailure}
                        cookiePolicy={'single_host_origin'}
                        render={renderProps => (
                          <button
                            className="btn btn-outline-dark d-flex align-items-center justify-content-center rounded-circle"
                            style={{ width: '50px', height: '50px' }}
                            onClick={renderProps.onClick}
                          >
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                              alt="구글 로고"
                              style={{ width: '30px' }}
                            />
                          </button>
                        )}
                      />
                      <a href="/auth/kakao">
                        <button className="btn d-flex align-items-center justify-content-center rounded-circle" style={{ width: '50px', height: '50px', backgroundColor: '#FAE100' }}>
                          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111466.png" alt="카카오 로고" style={{ width: '30px' }} />
                        </button>
                      </a>
                      <div id="naverIdLogin" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </div >
  );
};

export default Login;