// Community.js: 메인 컴포넌트
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BoardList from './routes/BoardList';
import PostList from './routes/PostList';
import SinglePost from './routes/SinglePost';
import NewPostForm from './routes/NewPostForm';
import Navbar from './components/Navbar';

const Community = ({ token }) => {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* 게시판 목록 */}
                <Route path="/" element={<BoardList />} />
                
                {/* 특정 게시판의 게시물 목록 */}
                <Route path="/board/:boardName" element={<PostList token={token} />} />
                
                {/* 게시물 작성 폼 */}
                <Route path="/board/:boardName/new" element={<NewPostForm token={token} />} />
                
                {/* 특정 게시물 보기 */}
                <Route path="/board/:boardName/post/:postId" element={<SinglePost token={token} />} />
            </Routes>
        </Router>
    );
};

export default Community;
