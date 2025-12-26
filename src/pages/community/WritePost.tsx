import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import { api, authHeaders } from '../../lib/http';
import NotFound from '../NotFound';

const WritePost = () => {
  useTitle('MediChat - 새 글 작성');
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!boardId) return;
    api
      .get(`/community/getPostList?board_id=${boardId}`, { headers: authHeaders() })
      .catch((error) => setErrorCode(error.response?.status || 500));
  }, [boardId]);

  if (errorCode === 404 || errorCode === 500) return <NotFound />;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!boardId) return;
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해 주세요.');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/community/writePost', {
        board_id: boardId,
        title,
        content,
        token
      });
      if (response.status === 200) {
        alert('게시물이 등록되었습니다.');
        navigate(`/community/${boardId}`);
      }
    } catch (error) {
      console.error(error);
      alert('게시물을 업로드하지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="glass-panel">
      <h2>새 게시물 작성</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="form-field">
          <label htmlFor="postTitle">제목</label>
          <input id="postTitle" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-field">
          <label htmlFor="postContent">내용</label>
          <textarea id="postContent" rows={8} value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <button className="primary" type="submit" disabled={loading}>
          {loading ? '등록 중...' : '게시하기'}
        </button>
      </form>
    </section>
  );
};

export default WritePost;
