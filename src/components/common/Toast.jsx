import { useToast } from '../../hooks/useToast';
import Icon from './Icon';

const icons = {
  success: 'checkCircle',
  error: 'warning',
  warning: 'warning',
  info: 'info',
  achievement: 'award',
};

export default function Toast() {
  const { toasts, removeToast } = useToast();
  if (toasts.length === 0) return null;

  return (
    <div className="toast-stack" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.type}`} role="status">
          <span className="toast__icon" aria-hidden="true">
            <Icon name={icons[toast.type] || 'info'} size={18} />
          </span>
          <div className="toast__content">
            {toast.title ? <p className="toast__title">{toast.title}</p> : null}
            {toast.message ? <p className="toast__message">{toast.message}</p> : null}
          </div>
          <button
            type="button"
            className="toast__close"
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss notification"
          >
            <Icon name="close" size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
