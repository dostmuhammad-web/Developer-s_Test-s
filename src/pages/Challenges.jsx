import { useMemo, useState } from 'react';
import ChallengeCard from '../components/challenges/ChallengeCard';
import EmptyState from '../components/common/EmptyState';
import Icon from '../components/common/Icon';
import {
  challengeCategories,
  challengeDifficulties,
  challenges,
} from '../data/challenges';
import { useAppData } from '../hooks/useAppData';

const statuses = [
  { id: 'all', label: 'All statuses' },
  { id: 'unsolved', label: 'Unsolved' },
  { id: 'solved', label: 'Solved' },
];

export default function Challenges() {
  const { state, stats } = useAppData();
  const [difficulty, setDifficulty] = useState('All');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return challenges.filter((challenge) => {
      const solved = Boolean(state.solvedChallenges[challenge.id]);
      if (difficulty !== 'All' && challenge.difficulty !== difficulty) return false;
      if (category !== 'All' && challenge.category !== category) return false;
      if (status === 'solved' && !solved) return false;
      if (status === 'unsolved' && solved) return false;
      if (
        term &&
        !challenge.title.toLowerCase().includes(term) &&
        !challenge.description.toLowerCase().includes(term) &&
        !challenge.category.toLowerCase().includes(term)
      ) {
        return false;
      }
      return true;
    });
  }, [difficulty, category, status, query, state.solvedChallenges]);

  const clear = () => {
    setDifficulty('All');
    setCategory('All');
    setStatus('all');
    setQuery('');
  };

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Practice</p>
          <h1>Challenges</h1>
          <p className="page-description">
            Solve {challenges.length} focused JavaScript problems. Each solution runs against real test cases in
            an isolated worker, and XP is awarded only on your first correct submission.
          </p>
        </div>
        <div className="page-header__stats">
          <span className="pill">
            <Icon name="target" size={14} />
            {stats.solvedChallenges} / {challenges.length} solved
          </span>
          <span className="pill">
            <Icon name="bolt" size={14} />
            {stats.solvedChallenges > 0 ? 'Keep the momentum' : 'Earn your first XP'}
          </span>
        </div>
      </header>

      <div className="filter-panel">
        <div className="filter-panel__row">
          <div className="segmented" role="group" aria-label="Filter by difficulty">
            {challengeDifficulties.map((level) => (
              <button
                key={level}
                type="button"
                className={`segmented__item ${difficulty === level ? 'is-active' : ''}`.trim()}
                onClick={() => setDifficulty(level)}
                aria-pressed={difficulty === level}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="filter-selects">
            <label className="select-field">
              <span>Category</span>
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                {challengeCategories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="select-field">
              <span>Status</span>
              <select value={status} onChange={(event) => setStatus(event.target.value)}>
                {statuses.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="filter-search">
              <Icon name="search" size={16} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search challenges"
                aria-label="Search challenges"
              />
            </div>
          </div>
        </div>
        <div className="filter-panel__footer">
          <span className="filter-count">
            {filtered.length} of {challenges.length} challenges
          </span>
          <button type="button" className="btn btn--ghost btn--sm" onClick={clear}>
            Clear filters
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="challenges"
          title="No challenges match these filters"
          description={
            status === 'unsolved' && stats.solvedChallenges === challenges.length
              ? 'You solved every challenge. Try reviewing older solutions or filter by Solved.'
              : 'Try a different difficulty, category, or search term.'
          }
          action={
            <button type="button" className="btn btn--soft" onClick={clear}>
              Reset filters
            </button>
          }
        />
      ) : (
        <div className="challenge-grid">
          {filtered.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              solved={Boolean(state.solvedChallenges[challenge.id])}
            />
          ))}
        </div>
      )}
    </div>
  );
}
