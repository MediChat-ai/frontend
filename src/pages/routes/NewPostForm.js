// routes/NewPostForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const NewPostForm = ({ token }) => {
    const { boardName } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/community/posts', {
                board_name: boardName,
                title,
                content,
                token,
            });
            navigate(`/board/${boardName}`);
        } catch (error) {
            console.error('게시물 작성 중 오류가 발생했습니다:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>새 게시물 작성</h2>
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
            </form>
        </div>
    );
};

export default NewPostForm;
