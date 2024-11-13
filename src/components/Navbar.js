import React from 'react';
import { NavLink } from 'react-router-dom';
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

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('jwtToken');
    window.location.href = '/';
  };

  return (
    <nav class="navbar navbar-light navbar-expand-md py-3">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="/">
          <span class="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon">
            <FontAwesomeIcon icon={faCommentMedical} />
          </span>
          <span>MediChat</span>
        </a>
        <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1">
          <span class="visually-hidden">Toggle navigation</span>
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navcol-1">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <NavLink to="/chat" className="nav-link" activeClassName="active">AI 챗봇</NavLink>
            </li>
            <li class="nav-item">
              <NavLink to="/hospital" className="nav-link" activeClassName="active">병원 정보</NavLink>
            </li>
            <li class="nav-item">
              <NavLink to="/community" className="nav-link" activeClassName="active">커뮤니티</NavLink>
            </li>
            <li class="nav-item">
              <NavLink to="/users/profile" className="nav-link" activeClassName="active">프로필</NavLink>
            </li>
          </ul>
          {isLoggedIn ? (
            <button className="btn btn-secondary" type="button" onClick={handleLogout}>로그아웃</button>
          ) : (
            <>
              <a href="/login"><button className="btn btn-secondary me-2" type="button">로그인</button></a>
              <a href="/register"><button className="btn btn-primary" type="button">회원 가입</button></a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
