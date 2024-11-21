import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const backendHost = process.env.REACT_APP_BACKEND_HOST;
const backendPort = process.env.REACT_APP_BACKEND_PORT;

const WritePost = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://${backendHost}:${backendPort}/community/writePost`, {
        board_id: _id,
        title,
        content,
        token
      }, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      if (response.status === 200) {
        alert('게시물이 성공적으로 생성되었습니다.');
        navigate(`/community/${_id}`);
      } else {
        alert('게시물 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('게시물 생성 중 오류가 발생했습니다:', error);
      alert('게시물 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <Navbar />
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
    </div>
  );
};

export default WritePost;
