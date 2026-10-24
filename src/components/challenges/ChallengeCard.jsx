import { Link } from 'react-router-dom';
import Icon from '../common/Icon';

const difficultyTone = { Easy: 'success', Medium: 'warning', Hard: 'danger' };

export default function ChallengeCard({ challenge, solved }) {
  return (
    <article className={`challenge-card ${solved ? 'is-solved' : ''}`.trim()}>
      <div className="challenge-card__top">
        <span className={`badge badge--${difficultyTone[challenge.difficulty]}`}>{challenge.difficulty}</span>
        <span className={`badge badge--${solved ? 'success' : 'neutral'}`}>
          {solved ? (
            <>
              <Icon name="check" size={12} /> Solved
            </>
          ) : (
            <>
              <Icon name="bolt" size={12} /> {challenge.xp} XP
            </>
          )}
        </span>
      </div>
      <h2>
        <Link to={`/challenges/${challenge.id}`}>{challenge.title}</Link>
      </h2>
      <p className="challenge-card__desc">{challenge.description}</p>
      <div className="challenge-card__meta">
        <span className="badge badge--neutral">{challenge.category}</span>
        <span>{challenge.tests.length} tests</span>
      </div>
      <Link to={`/challenges/${challenge.id}`} className="btn btn--soft btn--sm btn--full">
        {solved ? 'Review solution' : 'Open challenge'}
        <Icon name="arrowRight" size={14} />
      </Link>
    </article>
  );
}
