import { Link } from 'react-router-dom';
import EmptyState from '../components/common/EmptyState';
import Icon from '../components/common/Icon';
import ProgressBar from '../components/common/ProgressBar';
import { quizzes } from '../data/quizzes';
import { useAppData } from '../hooks/useAppData';

export default function Quizzes() {
  const { state, stats } = useAppData();

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Knowledge checks</p>
          <h1>Quizzes</h1>
          <p className="page-description">
            Six short exams with ten questions each. Every quiz is scored against fixed answers and saved to your
            local history. XP is awarded only on your first attempt at each quiz.
          </p>
        </div>
        <div className="page-header__stats">
          <span className="pill">
            <Icon name="quizzes" size={14} />
            {stats.uniqueQuizzes} / {quizzes.length} attempted
          </span>
          <span className="pill">
            <Icon name="star" size={14} />
            {stats.avgQuizPercent}% average
          </span>
        </div>
      </header>

      <div className="quiz-overview panel">
        <div>
          <h2>Your quiz record</h2>
          <ProgressBar
            value={(stats.uniqueQuizzes / quizzes.length) * 100}
            label="Quizzes attempted"
            hint={`${stats.uniqueQuizzes} of ${quizzes.length}`}
            ariaLabel="Quizzes attempted progress"
          />
        </div>
        <div className="quiz-overview__numbers">
          <div>
            <span>{stats.quizResultsCount}</span>
            <small>attempts</small>
          </div>
          <div>
            <span>{stats.bestQuizPercent}%</span>
            <small>best score</small>
          </div>
          <div>
            <span>{stats.avgQuizPercent}%</span>
            <small>average</small>
          </div>
        </div>
      </div>

      {quizzes.length === 0 ? (
        <EmptyState icon="quizzes" title="No quizzes available" description="Quiz content will appear here." />
      ) : (
        <div className="quiz-grid">
          {quizzes.map((quiz) => {
            const attempts = state.quizResults.filter((result) => result.quizId === quiz.id);
            const best = attempts.reduce((value, result) => Math.max(value, result.percent), 0);
            return (
              <article key={quiz.id} className="quiz-card" style={{ '--quiz-accent': quiz.accent }}>
                <div className="quiz-card__top">
                  <span className="quiz-card__icon" style={{ background: `${quiz.accent}1f`, color: quiz.accent }}>
                    <Icon name="quizzes" size={22} />
                  </span>
                  <span className="badge badge--neutral">{quiz.questions.length} questions</span>
                </div>
                <p className="page-eyebrow">{quiz.category}</p>
                <h2>{quiz.title}</h2>
                <p className="quiz-card__description">{quiz.description}</p>
                <div className="quiz-card__record">
                  {attempts.length > 0 ? (
                    <>
                      <span className="badge badge--success">Best {best}%</span>
                      <span className="muted small">
                        {attempts.length} attempt{attempts.length === 1 ? '' : 's'}
                      </span>
                    </>
                  ) : (
                    <span className="muted small">Not attempted yet</span>
                  )}
                </div>
                <Link to={`/quizzes/${quiz.id}`} className="btn btn--primary btn--full">
                  {attempts.length > 0 ? 'Retake quiz' : 'Start quiz'}
                  <Icon name="arrowRight" size={14} />
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
