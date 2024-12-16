import React, { useState } from "react";
import axios from 'axios';
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
import useTitle from "../hooks/useTitle";

const backendURI = process.env.REACT_APP_BACKEND_URI;

const validateUsername = username => {
  const regex = /^[a-zA-Z0-9]+$/; // 영문자와 숫자만 허용
  return regex.test(username);
};

const evaluatePasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++; // 길이 체크
  if (/[A-Z]/.test(password)) strength++; // 대문자 포함
  if (/[0-9]/.test(password)) strength++; // 숫자 포함
  if (/[^a-zA-Z0-9]/.test(password)) strength++; // 특수문자 포함
  return strength;
};

const Register = () => {
  useTitle('MediChat - 회원가입');
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(evaluatePasswordStrength(newPassword));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateUsername(userId)) {
      alert('아이디는 영문자와 숫자만 가능합니다.');
      return;
    }
    if (passwordStrength < 4) {
      alert('비밀번호 보안성이 낮습니다. 영어 대소문자, 숫자, 특수문자가 포함된 8자 이상의 비밀번호를 입력해주세요.');
      return;
    }
    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post(`${backendURI}/users/register`, {
        user_id: userId,
        user_name: username,
        auth_provider: 'local',
        pw: password,
      }, { validateStatus: (status) => status !== 500 });

      if (response.status === 200) {
        alert('회원가입 성공!');
        const loginResponse = await axios.post(`${backendURI}/users/login`, {
          user_id: userId,
          pw: password,
        }, { validateStatus: (status) => status !== 500 });

        if (loginResponse.status === 200) {
          localStorage.setItem('token', loginResponse.data.token);
          window.location.href = '/';
        }
        else if (loginResponse.status === 401)
          alert(loginResponse.data.error);
      }
      else if (response.status === 401)
        alert(response.data.error);
    } catch (err) {
      alert('회원가입에 실패했습니다.');
      console.error('회원가입 에러:', err);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="py-4 py-xl-5">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
              <h2>회원 가입</h2>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4">
              <div className="card mb-5">
                <div className="card-body d-flex flex-column align-items-center">
                  <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-person">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                    </svg>
                  </div>
                  <form className="text-center" onSubmit={handleRegister}>
                    <div className="mb-3">
                      <input className="form-control" type="text" id="user_id" name="user_id" placeholder="아이디" value={userId} onChange={(e) => setUserId(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <input className="form-control" type="text" id="user_name" name="user_name" placeholder="닉네임" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        type="password"
                        id="pw"
                        name="pw"
                        autoComplete="off"
                        placeholder="비밀번호"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                      />
                      <br />
                      <div
                        style={{
                          height: "10px",
                          width: `${(passwordStrength / 4) * 100}%`,
                          backgroundColor:
                            passwordStrength === 1
                              ? "red"
                              : passwordStrength === 2
                                ? "orange"
                                : passwordStrength === 3
                                  ? "green"
                                  : "blue",
                          transition: "width 0.3s, background-color 0.3s",
                          borderRadius: "5px",
                        }}
                      ></div>
                    </div>

                    <div className="mb-3">
                      <input className="form-control" type="password" id="pw2" name="pw2" autoComplete="off" placeholder="비밀번호 재입력" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <button className="btn btn-primary d-block w-100" type="submit">회원 가입</button>
                    </div>
                    <a href="/login"><p className="text-muted">이미 가입하셨나요?</p></a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
};

export default Register;
