import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import useTitle from '../../hooks/useTitle';
import NotFound from '../404';

const backendURI = process.env.REACT_APP_BACKEND_URI;

const WritePost = () => {
  useTitle('MediChat - 커뮤니티 글 쓰기');
  const { _id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
	const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get(`${backendURI}/community/getPostList?board_id=${_id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (response.status >= 400) {
          setError(response.status);
          return;
        }
			} catch (err) {
				setError(err.response?.status || 500);
				console.error('게시물을 불러오는 중 오류가 발생했습니다:', err);
			}
		};
		fetchPosts();
	}, [token, _id]);

	if (error === 404 || error === 500)
    return <NotFound />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용은 필수 입력 사항입니다.');
      return;
    }

    try {
      const response = await axios.post(`${backendURI}/community/writePost`, {
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
    } catch (err) {
      console.error('게시물 생성 중 오류가 발생했습니다:', err);
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
