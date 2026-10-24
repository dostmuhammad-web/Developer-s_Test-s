import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppData } from '../../hooks/useAppData';
import { formatNumber } from '../../utils/stats';
import { levelTitle } from '../../utils/xp';
import Icon from '../common/Icon';
import SearchBar from '../common/SearchBar';
import ThemeToggle from '../common/ThemeToggle';
import UserAvatar from '../common/UserAvatar';
import { navItems } from './navItems';

const titles = {
  learn: 'Learn',
  'code-lab': 'Code Lab',
  challenges: 'Challenges',
  quizzes: 'Quizzes',
  projects: 'Projects',
  achievements: 'Achievements',
  leaderboard: 'Leaderboard',
  statistics: 'Statistics',
  settings: 'Settings',
};

function usePageTitle() {
  const location = useLocation();
  const first = location.pathname.split('/').filter(Boolean)[0];
  if (!first) return 'Dashboard';
  return titles[first] || 'DEVVERSE';
}

export default function Topbar({ onOpenMenu }) {
  const { state, stats } = useAppData();
  const title = usePageTitle();
  const level = Math.floor(state.xp / 250) + 1;

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        const input = document.querySelector('.search__input');
        if (input) input.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar__row">
        <button
          type="button"
          className="icon-button topbar__menu"
          onClick={onOpenMenu}
          aria-label="Open navigation menu"
        >
          <Icon name="menu" size={21} />
        </button>
        <div className="topbar__title">
          <p>{title}</p>
          <span>{levelTitle(level)} track</span>
        </div>
        <SearchBar />
        <div className="topbar__actions">
          <Link to="/statistics" className="pill pill--streak" aria-label={`${stats.streak} day activity streak`}>
            <Icon name="flame" size={15} />
            <span>{stats.streak}d</span>
          </Link>
          <Link to="/achievements" className="pill pill--xp" aria-label={`${state.xp} total XP`}>
            <Icon name="bolt" size={15} />
            <span>{formatNumber(state.xp)} XP</span>
          </Link>
          <ThemeToggle />
          <Link to="/settings" className="topbar__avatar" aria-label="Open profile settings">
            <UserAvatar name={state.profile.name} color={state.profile.avatarColor} size={34} />
          </Link>
        </div>
      </div>
      <div className="topbar__mobile-search">
        <SearchBar />
      </div>
    </header>
  );
}
