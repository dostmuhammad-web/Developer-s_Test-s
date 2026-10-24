import { Link } from 'react-router-dom';
import EmptyState from '../components/common/EmptyState';
import Icon from '../components/common/Icon';
import ProgressBar from '../components/common/ProgressBar';
import UserAvatar from '../components/common/UserAvatar';
import { achievements } from '../data/achievements';
import { useAppData } from '../hooks/useAppData';
import { computeStats, formatNumber } from '../utils/stats';
import { levelProgress, levelTitle } from '../utils/xp';

export default function Achievements() {
  const { state } = useAppData();
  const stats = computeStats(state);
  const progress = levelProgress(state.xp);
  const unlocked = achievements.filter((item) => state.achievements[item.id]).length;

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Milestones</p>
          <h1>Achievements</h1>
          <p className="page-description">
            Badges unlock when you reach real milestones. Complete lessons, solve challenges, take quizzes, and
            build projects to earn them.
          </p>
        </div>
        <div className="page-header__stats">
          <span className="pill">
            <Icon name="award" size={14} />
            {unlocked} / {achievements.length} unlocked
          </span>
          <span className="pill">
            <Icon name="star" size={14} />
            Level {progress.level}
          </span>
        </div>
      </header>

      <section className="achievements-hero panel">
        <div className="achievements-hero__profile">
          <UserAvatar name={state.profile.name} color={state.profile.avatarColor} size={64} />
          <div>
            <h2>{state.profile.name}</h2>
            <p>
              {levelTitle(progress.level)} · {formatNumber(state.xp)} XP · {stats.streak} day streak
            </p>
          </div>
        </div>
        <div className="achievements-hero__progress">
          <ProgressBar
            value={(unlocked / achievements.length) * 100}
            label="Achievement progress"
            hint={`${Math.round((unlocked / achievements.length) * 100)}% collected`}
            ariaLabel="Achievement collection progress"
          />
        </div>
      </section>

      {achievements.length === 0 ? (
        <EmptyState icon="award" title="No achievements defined" description="Achievement content is being loaded." />
      ) : (
        <div className="achievement-grid">
          {achievements.map((item) => {
            const isUnlocked = Boolean(state.achievements[item.id]);
            const prog = item.progress(stats);
            return (
              <article
                key={item.id}
                className={`achievement-card ${isUnlocked ? 'is-unlocked' : ''} tier-${item.tier}`.trim()}
              >
                <div className="achievement-card__header">
                  <span className="achievement-card__icon" aria-hidden="true">
                    <Icon name={item.icon} size={22} />
                  </span>
                  <div>
                    <p className="achievement-card__tier">{item.tier}</p>
                    <h2>{item.title}</h2>
                  </div>
                  {isUnlocked ? (
                    <span className="badge badge--success">
                      <Icon name="check" size={12} /> Unlocked
                    </span>
                  ) : (
                    <span className="badge badge--neutral">Locked</span>
                  )}
                </div>
                <p className="achievement-card__desc">{item.description}</p>
                <div className="achievement-card__condition">
                  <Icon name="target" size={15} />
                  {item.condition}
                </div>
                {!isUnlocked ? (
                  <>
                    <ProgressBar
                      value={prog.percent}
                      size="sm"
                      label="Progress"
                      hint={`${prog.current}/${prog.target}`}
                      ariaLabel={`${item.title} progress`}
                    />
                    <p className="muted small">{prog.percent}% of the requirement met.</p>
                  </>
                ) : (
                  <p className="achievement-card__unlocked-at">
                    Unlocked {formatRelative(state.achievements[item.id])}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      )}

      <section className="panel">
        <div className="panel__header">
          <div>
            <p className="panel__eyebrow">Tips</p>
            <h2>How to unlock more</h2>
          </div>
        </div>
        <div className="tips-grid">
          <Link to="/learn" className="tip-card">
            <Icon name="book" size={18} />
            <div>
              <strong>Complete lessons</strong>
              <p>Each lesson finished moves you toward your next badge.</p>
            </div>
            <Icon name="arrowRight" size={16} />
          </Link>
          <Link to="/challenges" className="tip-card">
            <Icon name="target" size={18} />
            <div>
              <strong>Solve challenges</strong>
              <p>First-time correct solutions build your problem-solver streak.</p>
            </div>
            <Icon name="arrowRight" size={16} />
          </Link>
          <Link to="/quizzes" className="tip-card">
            <Icon name="quizzes" size={18} />
            <div>
              <strong>Test your knowledge</strong>
              <p>High quiz scores unlock knowledge-focused achievements.</p>
            </div>
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
