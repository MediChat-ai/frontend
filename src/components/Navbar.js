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
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-light navbar-expand-md py-3">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <span className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon">
            <FontAwesomeIcon icon={faCommentMedical} />
          </span>
          <span>MediChat</span>
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/chat" className="nav-link" activeClassName="active">
              AI 챗봇
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/hospital" className="nav-link" activeClassName="active">
              병원 정보
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/community" className="nav-link" activeClassName="active">
              커뮤니티
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/users/profile" className="nav-link" activeClassName="active">
              프로필
            </NavLink>
          </li>
        </ul>
        {isLoggedIn ? (
          <button className="btn btn-primary ms-auto" type="button" onClick={handleLogout}>로그아웃</button>
        ) : (
          <NavLink to="/login" className="btn btn-secondary ms-auto">로그인</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
