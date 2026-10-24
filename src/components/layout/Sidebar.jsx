import { NavLink } from 'react-router-dom';
import { useAppData } from '../../hooks/useAppData';
import { levelProgress, levelTitle } from '../../utils/xp';
import Icon from '../common/Icon';
import ProgressBar from '../common/ProgressBar';
import UserAvatar from '../common/UserAvatar';
import { navItems } from './navItems';

export function Brand() {
  return (
    <div className="brand">
      <span className="brand__mark" aria-hidden="true">
        <span>&lt;</span>
        <span className="brand__slash">/</span>
        <span>&gt;</span>
      </span>
      <span className="brand__text">
        DEV<span>VERSE</span>
      </span>
    </div>
  );
}

export function SidebarNav({ onNavigate }) {
  return (
    <nav className="sidebar__nav" aria-label="Main navigation">
      <p className="sidebar__section-label">Workspace</p>
      <ul>
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`.trim()}
            >
              <Icon name={item.icon} size={19} />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SidebarProfile() {
  const { state, stats } = useAppData();
  const progress = levelProgress(state.xp);

  return (
    <div className="sidebar__profile">
      <div className="sidebar__profile-top">
        <UserAvatar name={state.profile.name} color={state.profile.avatarColor} size={38} />
        <div className="sidebar__profile-meta">
          <p className="sidebar__profile-name">{state.profile.name}</p>
          <p className="sidebar__profile-level">
            Level {progress.level} · {levelTitle(progress.level)}
          </p>
        </div>
      </div>
      <ProgressBar
        value={progress.percent}
        size="sm"
        ariaLabel={`Level progress: ${progress.current} of ${progress.needed} XP`}
      />
      <p className="sidebar__profile-xp">
        {progress.current} / {progress.needed} XP to next level
        <span>{stats.streak} day streak</span>
      </p>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <Brand />
        <span className="sidebar__tag">Learn · Build · Level up</span>
      </div>
      <SidebarNav />
      <SidebarProfile />
    </aside>
  );
}
