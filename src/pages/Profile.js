import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
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

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [authProvider, setAuthProvider] = useState('local');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`http://${backendHost}:${backendPort}/users/auth`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => {
          if (response.status == 200) {
            setIsLoggedIn(true);
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.user_id);
            setUsername(decodedToken.user_name);
            setAuthProvider(decodedToken.auth_provider);
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
    else {
      alert('로그인이 필요합니다.');
      window.location.href = '/';
    }
  }, []);

  const handleNicknameChange = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    axios.post(`http://${backendHost}:${backendPort}/users/change/username`, {
      token: token,
      new_username: document.getElementById('user_name').value
    })
      .then(response => {
        if (response.status === 200) {
          alert('사용자 이름이 변경되었습니다. 원활한 사용을 위해 로그아웃 후 다시 로그인 해 주세요.');
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          alert(response.data.error);
        }
      })
      .catch(error => {
        console.error('사용자 이름 변경 실패:', error);
        alert('사용자 이름 변경 중 오류가 발생했습니다.', error);
      });
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    axios.post(`http://${backendHost}:${backendPort}/users/change/password`, {
      token: token,
      password: document.getElementById('password').value,
      new_password: document.getElementById('newPassword').value
    })
      .then(response => {
        if (response.status === 200) {
          alert('비밀번호가 변경되었습니다. 원활한 사용을 위해 로그아웃 후 다시 로그인 해 주세요.');
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          alert(response.data.error);
        }
      })
      .catch(error => {
        if (error.response) {
          alert(error.response.data.error || '비밀번호 변경 중 오류가 발생했습니다.');
        } else {
          alert('비밀번호 변경 중 알 수 없는 오류가 발생했습니다.');
        }
        console.error('비밀번호 변경 실패:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h3 className="text-dark mb-4">내 프로필</h3>
        <div className="card shadow mb-3">
          <div className="card-header py-3">
            <p className="text-primary m-0 fw-bold">사용자 설정</p>
          </div>
          <div className="card-body">
            {/* 닉네임 변경 폼 */}
            <form onSubmit={handleNicknameChange}>
              <div className="row align-items-center" style={{ marginBottom: '25px', textAlign: 'left' }}>
                <div className="col-sm-8 col-md-8 col-lg-9 col-xl-10 col-xxl-10">
                  <div className="row">
                    <div className="col-md-12 text-start">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="user_id">
                          <strong>ID</strong>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="user_id"
                          name="user_id"
                          value={userId}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-12 text-start">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="user_name">
                          <strong>닉네임</strong>
                        </label>
                        <div className="d-flex">
                          <input
                            className="form-control"
                            type="text"
                            id="user_name"
                            name="user_name"
                            placeholder={username}
                            required
                          />
                          <button
                            className="btn btn-success ms-2"
                            type="submit"
                            style={{
                              height: '38px',
                              whiteSpace: 'nowrap',
                              lineHeight: '1',
                              padding: '0 15px',
                            }}
                          >
                            닉네임 변경
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {authProvider === 'local' && (
              <form onSubmit={handlePasswordChange}>
                <div className="row" style={{ textAlign: 'left' }}>
                  <div className="col-md-6 text-start">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="password">
                        <strong>기존 비밀번호</strong>
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        id="password"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6 text-start">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="verifyPassword">
                        <strong>새 비밀번호</strong>
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        id="newPassword"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col">
                    <p id="passwordErrorMsg" className="text-danger" style={{ display: 'none' }}></p>
                  </div>
                  <div className="col-md-12" style={{ textAlign: 'right', marginTop: '5px' }}>
                    <button className="btn btn-success" id="submitBtn" type="submit">
                      비밀번호 변경
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
        <div className="card shadow mb-3">
          <div className="card-header py-3">
            <p className="text-primary m-0 fw-bold">작성한 글</p>
          </div>
          <div className="card-body"></div>
        </div>
      </div>
      <Footer />
    </div>
  );

};

export default Profile;