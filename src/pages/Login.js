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

const backendHost = process.env.REACT_APP_BACKEND_HOST;
const backendPort = process.env.REACT_APP_BACKEND_PORT;

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`http://${backendHost}:${backendPort}/users/login`, {
        user_id: userId,
        pw: password,
      }, { validateStatus: (status) => status !== 500 });

      if (response.status == 200) {
        localStorage.setItem('user', response.data.token);
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
  return (
    <div>
      <Navbar />
      <section className="py-4 py-xl-5">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
              <h2>로그인</h2>
              {/* <p>Curae hendrerit donec commodo hendrerit egestas tempus, turpis facilisis nostra nunc. Vestibulum dui eget ultrices.</p> */}
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

export default Login;