import { Link } from 'react-router-dom';
import Icon from '../common/Icon';

export default function QuizResult({ quiz, questions, answers, result, onRetry }) {
  const percent = result.percent;
  const passLabel = percent >= 90 ? 'Outstanding' : percent >= 70 ? 'Solid work' : percent >= 50 ? 'Getting there' : 'Keep practicing';

  return (
    <div className="quiz-result">
      <section className={`quiz-result__hero ${percent >= 70 ? 'is-good' : ''}`.trim()}>
        <div
          className="score-ring"
          style={{
            background: `conic-gradient(${percent >= 70 ? '#34d399' : '#f59e0b'} ${percent * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
          }}
          role="img"
          aria-label={`Score ${percent} percent`}
        >
          <div className="score-ring__inner">
            <span>{percent}%</span>
            <small>score</small>
          </div>
        </div>
        <div className="quiz-result__summary">
          <p className="page-eyebrow">{quiz.category} quiz complete</p>
          <h1>{passLabel}</h1>
          <p className="page-description">
            You answered {result.correct} of {result.total} questions correctly.
            {result.xpEarned > 0
              ? ` +${result.xpEarned} XP awarded for your first attempt.`
              : ' Retakes do not award additional XP.'}
          </p>
          <div className="quiz-result__actions">
            <button type="button" className="btn btn--primary" onClick={onRetry}>
              <Icon name="reset" size={15} />
              Try again
            </button>
            <Link to="/quizzes" className="btn btn--soft">
              All quizzes
            </Link>
            <Link to="/statistics" className="btn btn--ghost">
              View statistics
            </Link>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel__header">
          <div>
            <p className="panel__eyebrow">Answer review</p>
            <h2>What you got right and wrong</h2>
          </div>
          <span className="badge badge--neutral">{result.correct}/{result.total} correct</span>
        </div>
        <ol className="review-list">
          {questions.map((question, index) => {
            const selected = answers[question.originalIndex];
            const correct = selected === question.answer;
            return (
              <li key={question.originalIndex} className={correct ? 'is-correct' : 'is-wrong'}>
                <div className="review-list__header">
                  <span className="review-list__status">
                    <Icon name={correct ? 'checkCircle' : 'x'} size={16} />
                    {correct ? 'Correct' : 'Incorrect'}
                  </span>
                  <span className="muted small">Question {index + 1}</span>
                </div>
                <p className="review-list__question">{question.question}</p>
                <div className="review-list__answers">
                  <p>
                    <span className="io-label">Your answer</span>
                    <span className={correct ? 'answer-correct' : 'answer-wrong'}>
                      {selected === undefined ? 'Not answered' : question.options[selected]}
                    </span>
                  </p>
                  {!correct ? (
                    <p>
                      <span className="io-label">Correct answer</span>
                      <span className="answer-correct">{question.options[question.answer]}</span>
                    </p>
                  ) : null}
                  <p className="review-list__explanation">{question.explanation}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
