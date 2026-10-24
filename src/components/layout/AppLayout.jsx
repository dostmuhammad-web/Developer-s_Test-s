import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MobileNavigation from './MobileNavigation';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Topbar onOpenMenu={() => setMenuOpen(true)} />
        <main className="app-content" id="main-content">
          <Outlet />
        </main>
        <footer className="app-footer">
          <span>DEVVERSE — learn by building.</span>
          <span>Progress is stored locally in your browser.</span>
        </footer>
      </div>
      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
