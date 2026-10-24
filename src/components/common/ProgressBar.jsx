export default function ProgressBar({
  value = 0,
  label,
  hint,
  size = 'md',
  tone = 'brand',
  ariaLabel,
}) {
  const safe = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={`progress progress--${size} progress--${tone}`}>
      {(label || hint) && (
        <div className="progress__meta">
          <span>{label}</span>
          <span>{hint || `${safe}%`}</span>
        </div>
      )}
      <div
        className="progress__track"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={safe}
        aria-label={ariaLabel || label || 'Progress'}
      >
        <div className="progress__fill" style={{ width: `${safe}%` }} />
      </div>
    </div>
  );
}
