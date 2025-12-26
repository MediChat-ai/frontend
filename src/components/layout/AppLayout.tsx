import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

const minimalChromeRoutes = ['/users/login/naver/callback'];

const AppLayout = () => {
  const location = useLocation();
  const hideChrome = minimalChromeRoutes.includes(location.pathname);

  return (
    <div className="app-shell">
      {!hideChrome && <Navbar />}
      <main className={`app-content ${hideChrome ? 'full' : ''}`}>
        <Outlet />
      </main>
      {!hideChrome && <Footer />}
    </div>
  );
};

export default AppLayout;
