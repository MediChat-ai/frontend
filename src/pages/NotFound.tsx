import useTitle from '../hooks/useTitle';

const NotFound = () => {
  useTitle('404 - MediChat');

  return (
    <section className="glass-panel" style={{ textAlign: 'center' }}>
      <p className="chip" style={{ width: 'fit-content', margin: '0 auto 16px' }}>404</p>
      <h2>길을 잃었어요</h2>
      <p style={{ color: 'var(--muted)', marginBottom: 24 }}>요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
        <button className="ghost" onClick={() => window.history.back()}>
          이전 페이지
        </button>
        <button className="primary" onClick={() => (window.location.href = '/')}>홈으로 가기</button>
      </div>
    </section>
  );
};

export default NotFound;
