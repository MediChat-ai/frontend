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

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      axios.post(`http://${backendHost}:${backendPort}/users/auth`, { token: token })
        .then(response => {
          if (response.status == 200) {
            setIsLoggedIn(true);
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.user_id);
            setUsername(decodedToken.user_name);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    axios.post(`http://${backendHost}:${backendPort}/users/change/username`, {
      token: token,
      new_username: document.getElementById('user_name').value
    })
      .then(response => {
        if (response.status === 200) {
          alert('사용자 이름이 변경되었습니다.');
          window.location.reload();
        } else {
          alert(response.data.error);
        }
      })
      .catch(error => {
        console.error('사용자 이름 변경 실패:', error);
        alert('사용자 이름 변경 중 오류가 발생했습니다.');
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h3 class="text-dark mb-4">내 프로필</h3>
        <div class="card shadow mb-3">
          <div class="card-header py-3">
            <p class="text-primary m-0 fw-bold">사용자 설정</p>
          </div>
          <div class="card-body">
            <form onSubmit={handleSubmit}>
              <div class="row" style={{ marginBottom: '25px', textAlign: 'left' }}>
                <div class="col-sm-8 col-md-8 col-lg-9 col-xl-10 col-xxl-10 align-self-center">
                  <div class="row">
                    <div class="col-md-12 text-start">
                      <div class="mb-3"><label class="form-label" for="user_id"><strong>ID</strong></label><input class="form-control" type="text" id="user_id" name="user_id" value={userId} disabled /></div>
                    </div>
                    <div class="col-md-12 text-start">
                      <div class="mb-3"><label class="form-label" for="user_name"><strong>닉네임</strong></label><input class="form-control" type="text" id="user_name" name="user_name" placeholder={username} required /></div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 text-start">
                  <div class="mb-3"><label class="form-label" for="password"><strong>새 비밀번호</strong></label><input class="form-control" type="password" id="password" placeholder="Password" /></div>
                </div>
                <div class="col-md-6 text-start">
                  <div class="mb-3"><label class="form-label" for="password_re"><strong>새 비밀번호 확인</strong></label><input class="form-control" type="password" id="verifyPassword" placeholder="Password" /></div>
                </div>
                <div class="col">
                  <p id="emailErrorMsg" class="text-danger" style={{ display: 'none' }}></p>
                  <p id="passwordErrorMsg" class="text-danger" style={{ display: 'none' }}></p>
                </div>
                <div class="col-md-12" style={{ textAlign: 'right', marginTop: '5px' }}>
                  <button class="btn btn-primary" id="submitBtn" type="submit">저장</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="card shadow mb-3">
          <div class="card-header py-3">
            <p class="text-primary m-0 fw-bold">작성한 글</p>
          </div>
          <div class="card-body"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;