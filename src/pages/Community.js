import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';
import BoardList from './Community/BoardList';
import PostList from './Community/PostList';
import SinglePost from './Community/SinglePost';
import NewPostForm from './Community/NewPostForm';
// import ManageBoards from './routes/ManageBoards';

// Navbar 컴포넌트: 상단 네비게이션 바를 구성합니다.
const Navbar = () => {
    return (
        <nav className="navbar navbar-light navbar-expand-md py-3">
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
                        <li className="nav-item">
                            <a href="/chat" className="nav-link">AI 챗봇</a>
                        </li>
                        <li className="nav-item">
                            <a href="/hospital" className="nav-link">병원 정보</a>
                        </li>
                        <li className="nav-item">
                            <a href="/community" className="nav-link">커뮤니티</a>
                        </li>
                        <li className="nav-item">
                            <a href="/users/profile" className="nav-link">프로필</a>
                        </li>
                        <li className="nav-item">
                            <a href="/manage-boards" className="nav-link">게시판 관리</a>
                        </li>
                    </ul>
                    <button className="btn btn-secondary me-2" type="button">로그인</button>
                    <button className="btn btn-primary" type="button">회원 가입</button>
                </div>
            </div>
        </nav>
    );
};

// 커뮤니티 전체 흐름을 관리하는 메인 컴포넌트
const Community = ({ token }) => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<BoardList token={token} />} />
                <Route path="/board/:boardName" element={<PostList token={token} />} />
                <Route path="/board/:boardName/post/:postId" element={<SinglePost token={token} />} />
                <Route path="/board/:boardName/new" element={<NewPostForm token={token} />} />
                {/* <Route path="/manage-boards" element={<ManageBoards token={token} />} /> */}
            </Routes>
        </Router>
    );
};

export default Community;
