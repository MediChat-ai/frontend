import React from 'react';
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
import Navbar from '../components/Navbar';

const Profile = () => {
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
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
            <form>
              <div class="row" style={{ marginBottom: '25px', textAlign: 'left' }}>
                <div class="col-sm-4 col-md-4 col-lg-3 col-xl-2 col-xxl-2" style={{ display: 'inline', textAlign: 'center', marginBottom: '25px' }}><img class="rounded-circle mb-3 mt-4 img-fluid" src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" style={{ display: 'inline', maxHeight: '110px' }} /><br /><button class="btn btn-primary btn-sm" id="photoBtn" type="button">Change Photo</button></div>
                <div class="col-sm-8 col-md-8 col-lg-9 col-xl-10 col-xxl-10 align-self-center">
                  <div class="row">
                    <div class="col-md-12 text-start">
                      <div class="mb-3"><label class="form-label" for="email"><strong>ID</strong></label><input class="form-control" type="email" id="email" placeholder="user@example.com" name="email" /></div>
                    </div>
                    <div class="col-md-12 text-start">
                      <div class="mb-3"><label class="form-label" for="username"><strong>닉네임</strong></label><input class="form-control" type="text" placeholder="Username" name="username" /></div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 text-start">
                  <div class="mb-3"><label class="form-label" for="username"><strong>새 비밀번호</strong></label><input class="form-control" type="password" id="password" placeholder="Password" /></div>
                </div>
                <div class="col-md-6 text-start">
                  <div class="mb-3"><label class="form-label" for="username"><strong>새 비밀번호 확인</strong></label><input class="form-control" type="password" id="verifyPassword" placeholder="Password" /></div>
                </div>
                <div class="col">
                  <p id="emailErrorMsg" class="text-danger" style={{ display: 'none' }}></p>
                  <p id="passwordErrorMsg" class="text-danger" style={{ display: 'none' }}></p>
                </div>
                <div class="col-md-12" style={{ textAlign: 'right', marginTop: '5px' }}><button class="btn btn-primary btn-sm" id="submitBtn" type="submit">저장</button></div>
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
  )
}

export default Profile;