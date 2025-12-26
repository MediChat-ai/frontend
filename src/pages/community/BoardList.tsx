import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import { api, authHeaders } from '../../lib/http';

interface Board {
  _id: string;
  name: string;
  description: string;
  cover_url: string;
}

const BoardList = () => {
  useTitle('MediChat - 커뮤니티');
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('커뮤니티는 로그인 후 이용할 수 있습니다.');
      navigate('/login');
      return;
    }

    api
      .get('/community/getBoardList', { headers: authHeaders() })
      .then((response) => setBoards(response.data.boards || []))
      .catch((error) => {
        console.error(error);
        alert('게시판 목록을 불러오지 못했습니다.');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="glass-panel">
        <p className="chip" style={{ width: 'fit-content' }}>커뮤니티</p>
        <h2>의료 전문가와 사용자가 만나는 공간</h2>
        <p style={{ color: 'var(--muted)' }}>외상, 내과, 정신건강까지 주제별 보드를 선택해보세요.</p>
      </div>
      {loading && <div className="spinner-glow" />}
      {!loading && (
        <div className="community-grid">
          {boards.map((board) => (
            <div key={board._id} className="glass-panel community-card" onClick={() => navigate(`/community/${board._id}`)} style={{ cursor: 'pointer' }}>
              <img src={board.cover_url} alt={board.name} />
              <h3>{board.name}</h3>
              <p style={{ color: 'var(--muted)' }}>{board.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BoardList;
