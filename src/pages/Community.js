import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';

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
                    </ul>
                    <button className="btn btn-secondary me-2" type="button">로그인</button>
                    <button className="btn btn-primary" type="button">회원 가입</button>
                </div>
            </div>
        </nav>
    );
};

const CommunityList = ({ posts, onNewPostClick }) => {
    return (
        <div className="container mt-5" id="community-page">
            <h2 className="mb-4">커뮤니티 게시판</h2>
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary" onClick={onNewPostClick}>게시글 작성</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>날짜</th>
                        <th>댓글 수</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, index) => (
                        <tr key={index}>
                            <td><a href={`/community/post/${index + 1}`}>{post.title}</a></td>
                            <td>{post.author}</td>
                            <td>{post.date}</td>
                            <td>{post.comments}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const NewPostForm = ({ onCancel, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            title,
            author: '현재 사용자',
            date: new Date().toISOString().split('T')[0],
            comments: 0,
            content,
        };
        onSubmit(newPost);
    };

    return (
        <div className="container mt-5" id="new-post-form">
            <h2>게시글 작성</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">제목</label>
                    <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">내용</label>
                    <textarea className="form-control" id="content" rows="5" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">게시</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>취소</button>
            </form>
        </div>
    );
};

const Community = () => {
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [posts, setPosts] = useState([
        { title: '첫 번째 게시글입니다', author: '사용자1', date: '2024-11-14', comments: 10, content: '첫 번째 게시글의 내용입니다.' },
        { title: '두 번째 게시글입니다', author: '사용자2', date: '2024-11-13', comments: 5, content: '두 번째 게시글의 내용입니다.' },
    ]);

    const handleNewPostClick = () => {
        setIsCreatingPost(true);
    };

    const handleCancel = () => {
        setIsCreatingPost(false);
    };

    const handleNewPostSubmit = (newPost) => {
        setPosts([newPost, ...posts]);
        setIsCreatingPost(false);
    };

    return (
        <div>
            <Navbar />
            {isCreatingPost ? (
                <NewPostForm onCancel={handleCancel} onSubmit={handleNewPostSubmit} />
            ) : (
                <CommunityList posts={posts} onNewPostClick={handleNewPostClick} />
            )}
        </div>
    );
};

export default Community;
