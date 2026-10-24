import { useEffect, useRef } from 'react';
import { useAppData } from '../../hooks/useAppData';
import { levelProgress } from '../../utils/xp';
import Icon from '../common/Icon';
import UserAvatar from '../common/UserAvatar';
import { Brand, SidebarNav } from './Sidebar';

export default function MobileNavigation({ open, onClose }) {
  const { state } = useAppData();
  const panelRef = useRef(null);
  const progress = levelProgress(state.xp);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTarget = panelRef.current?.querySelector('button, a');
    if (focusTarget) focusTarget.focus();

    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="mobile-nav">
      <div className="mobile-nav__overlay" onClick={onClose} aria-hidden="true" />
      <div
        className="mobile-nav__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        ref={panelRef}
      >
        <div className="mobile-nav__header">
          <Brand />
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close menu">
            <Icon name="close" size={20} />
          </button>
        </div>
        <div className="mobile-nav__profile">
          <UserAvatar name={state.profile.name} color={state.profile.avatarColor} size={38} />
          <div>
            <p>{state.profile.name}</p>
            <span>Level {progress.level} · {state.xp} XP</span>
          </div>
        </div>
        <SidebarNav onNavigate={onClose} />
        <p className="mobile-nav__footer">DEVVERSE · local-first learning</p>
      </div>
    </div>
  );
}
