function initialsFromName(name) {
  const parts = (name || 'Learner')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return 'D';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function UserAvatar({ name, color = '#7c5cff', size = 40, className = '' }) {
  return (
    <span
      className={`user-avatar ${className}`.trim()}
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: Math.max(11, Math.round(size * 0.36)),
      }}
      aria-hidden="true"
      title={name}
    >
      {initialsFromName(name)}
    </span>
  );
}
