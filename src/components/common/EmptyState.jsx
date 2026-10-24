import Icon from './Icon';

export default function EmptyState({ icon = 'info', title, description, action, compact = false }) {
  return (
    <div className={`empty-state ${compact ? 'empty-state--compact' : ''}`.trim()}>
      <span className="empty-state__icon" aria-hidden="true">
        <Icon name={icon} size={compact ? 22 : 28} />
      </span>
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      {action ? <div className="empty-state__action">{action}</div> : null}
    </div>
  );
}
