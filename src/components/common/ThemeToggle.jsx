import { useAppData } from '../../hooks/useAppData';
import Icon from './Icon';

export default function ThemeToggle({ className = '' }) {
  const { state, updateSettings } = useAppData();
  const isDark = state.settings.theme === 'dark';
  const next = isDark ? 'light' : 'dark';

  return (
    <button
      type="button"
      className={`icon-button theme-toggle ${className}`.trim()}
      onClick={() => updateSettings({ theme: next })}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      <Icon name={isDark ? 'sun' : 'moon'} size={19} />
    </button>
  );
}
