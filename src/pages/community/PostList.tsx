import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import { api, authHeaders } from '../../lib/http';
import NotFound from '../NotFound';

interface PostSummary {
  _id: string;
  post_title: string;
  created_at: string;
  view_count: number;
}

const PostList = () => {
  useTitle('MediChat - 커뮤니티');
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [boardName, setBoardName] = useState('');
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!boardId) return;
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    api
      .get(`/community/getPostList?board_id=${boardId}`, { headers: authHeaders() })
      .then((response) => {
        if (response.status >= 400) {
          setErrorCode(response.status);
          return;
        }
        setBoardName(response.data.board_name);
        const list = response.data.posts || [];
        setPosts(list.reverse());
      })
      .catch((error) => {
        setErrorCode(error.response?.status || 500);
      })
      .finally(() => setLoading(false));
  }, [boardId, navigate]);

  if (errorCode === 404 || errorCode === 500) return <NotFound />;

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="glass-panel" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <p className="chip" style={{ width: 'fit-content' }}>Board</p>
          <h2 style={{ marginTop: 8 }}>{boardName}</h2>
        </div>
        <button className="primary" onClick={() => navigate(`/community/${boardId}/new`)}>
          새 글 작성
        </button>
      </div>
      <div className="glass-panel post-table">
        {loading && <div className="spinner-glow" />}
        {!loading && (
          <table className="table-skin">
            <thead>
              <tr>
                <th>제목</th>
                <th>조회수</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                const date = new Date(post.created_at);
                const today = new Date();
                const sameDay =
                  date.getFullYear() === today.getFullYear() &&
                  date.getMonth() === today.getMonth() &&
                  date.getDate() === today.getDate();

                return (
                  <tr key={post._id}>
                    <td>
                      <a href={`/community/${boardId}/${post._id}`}>{post.post_title}</a>
                    </td>
                    <td>{post.view_count}</td>
                    <td>
                      {sameDay
                        ? date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })
                        : date.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default PostList;
