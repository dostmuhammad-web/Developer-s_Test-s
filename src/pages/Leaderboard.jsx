import { useMemo, useState } from 'react';
import Icon from '../components/common/Icon';
import UserAvatar from '../components/common/UserAvatar';
import { demoLeaderboard } from '../data/leaderboard';
import { useAppData } from '../hooks/useAppData';
import { formatNumber } from '../utils/stats';

const filters = [
  { id: 'weekly', label: 'This week' },
  { id: 'total', label: 'All time' },
  { id: 'solved', label: 'Challenges' },
];

function getInitials(name) {
  const parts = name.split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function Leaderboard() {
  const { state, stats } = useAppData();
  const [filter, setFilter] = useState('total');

  const rows = useMemo(() => {
    const current = {
      isCurrent: true,
      name: state.profile.name,
      avatarColor: state.profile.avatarColor,
      weeklyXp: stats.weeklyXp,
      totalXp: state.xp,
      solved: stats.solvedChallenges,
    };
    const base = [...demoLeaderboard, current];
    base.sort((a, b) => {
      if (filter === 'weekly') return b.weeklyXp - a.weeklyXp;
      if (filter === 'solved') return b.solved - a.solved;
      return b.totalXp - a.totalXp;
    });
    return base.map((row, index) => ({ ...row, rank: index + 1 }));
  }, [filter, state.profile.name, state.profile.avatarColor, stats.weeklyXp, state.xp, stats.solvedChallenges]);

  const top = rows.slice(0, 3);
  const rest = rows.slice(3);

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Community ranking</p>
          <h1>Leaderboard</h1>
          <p className="page-description">
            A demo leaderboard showing example developers. Your local progress is listed separately so you can
            track how you compare without connecting to a backend.
          </p>
        </div>
        <div className="page-header__stats">
          <span className="pill">
            <Icon name="leaderboard" size={14} />
            Demo data · Local profile included
          </span>
        </div>
      </header>

      <div className="filter-bar">
        <div className="segmented" role="group" aria-label="Sort leaderboard">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`segmented__item ${filter === item.id ? 'is-active' : ''}`.trim()}
              onClick={() => setFilter(item.id)}
              aria-pressed={filter === item.id}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <section className="podium">
        {top.map((row, index) => (
          <article
            key={`${row.name}-${index}`}
            className={`podium-card podium-card--${index + 1} ${row.isCurrent ? 'is-current' : ''}`.trim()}
          >
            <span className="podium-card__rank">#{row.rank}</span>
            {row.isCurrent ? (
              <UserAvatar name={row.name} color={row.avatarColor} size={56} />
            ) : (
              <span
                className="podium-card__avatar"
                style={{ background: `${row.color || '#7c5cff'}22`, color: row.color || '#7c5cff' }}
              >
                {getInitials(row.name)}
              </span>
            )}
            <h2>{row.name}</h2>
            <p className="podium-card__sub">
              {row.isCurrent ? 'You (local profile)' : 'Demo learner'}
            </p>
            <div className="podium-card__stats">
              <div>
                <span>{formatNumber(filter === 'weekly' ? row.weeklyXp : row.totalXp)}</span>
                <small>{filter === 'weekly' ? 'XP this week' : 'Total XP'}</small>
              </div>
              <div>
                <span>{row.solved}</span>
                <small>Challenges</small>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="panel leaderboard-table-panel">
        <div className="panel__header">
          <div>
            <p className="panel__eyebrow">Rankings</p>
            <h2>Full list</h2>
          </div>
        </div>
        <div className="table-scroll">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Learner</th>
                <th scope="col">{filter === 'weekly' ? 'XP this week' : 'Total XP'}</th>
                <th scope="col">Challenges solved</th>
                <th scope="col">Level</th>
              </tr>
            </thead>
            <tbody>
              {rest.map((row) => (
                <tr key={`${row.name}-${row.rank}`} className={row.isCurrent ? 'is-current' : ''}>
                  <td className="leaderboard-table__rank">#{row.rank}</td>
                  <td>
                    <div className="leaderboard-table__user">
                      {row.isCurrent ? (
                        <UserAvatar name={row.name} color={row.avatarColor} size={36} />
                      ) : (
                        <span
                          className="leaderboard-table__avatar"
                          style={{ background: `${row.color || '#7c5cff'}1f`, color: row.color || '#7c5cff' }}
                        >
                          {getInitials(row.name)}
                        </span>
                      )}
                      <span>
                        <span className="leaderboard-table__name">{row.name}</span>
                        {row.isCurrent ? <span className="leaderboard-table__tag">You</span> : null}
                      </span>
                    </div>
                  </td>
                  <td>{formatNumber(filter === 'weekly' ? row.weeklyXp : row.totalXp)}</td>
                  <td>{row.solved}</td>
                  <td>{Math.floor((row.totalXp || 0) / 250) + 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="muted small leaderboard-note">
          Demo entries are illustrative only. Your rank updates based on your local XP and solved challenges.
        </p>
      </section>
    </div>
  );
}
