import './assets/css/404.css'

const NotFound = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <div></div>
            <h1>404</h1>
          </div>
          <h2>Page not found</h2>
          <p>요청하신 페이지를 찾을 수 없습니다.</p>
          <button className="btn btn-secondary" onClick={handleBack}>뒤로 가기</button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;