import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmptyState from '../components/common/EmptyState';
import Icon from '../components/common/Icon';
import ProgressBar from '../components/common/ProgressBar';
import QuizQuestion from '../components/quizzes/QuizQuestion';
import QuizResult from '../components/quizzes/QuizResult';
import { getQuiz } from '../data/quizzes';
import { useAppData } from '../hooks/useAppData';
import { useToast } from '../hooks/useToast';

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function QuizPlay() {
  const { quizId } = useParams();
  const quiz = getQuiz(quizId);
  const { state, submitQuiz } = useAppData();
  const { pushToast } = useToast();
  const [phase, setPhase] = useState('intro');
  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    setPhase('intro');
    setIndex(0);
    setAnswers({});
    setResult(null);
    setQuestions([]);
  }, [quizId]);

  const history = useMemo(
    () => state.quizResults.filter((item) => item.quizId === quizId),
    [state.quizResults, quizId]
  );
  const best = history.reduce((value, item) => Math.max(value, item.percent), 0);

  if (!quiz) {
    return (
      <div className="page">
        <EmptyState
          icon="quizzes"
          title="Quiz not found"
          description="This quiz does not exist. Choose another topic from the quiz library."
          action={
            <Link to="/quizzes" className="btn btn--primary">
              Browse quizzes
            </Link>
          }
        />
      </div>
    );
  }

  const start = () => {
    const prepared = quiz.questions.map((question, originalIndex) => ({
      ...question,
      originalIndex,
    }));
    setQuestions(shuffleQuestions ? shuffle(prepared) : prepared);
    setAnswers({});
    setIndex(0);
    setResult(null);
    setPhase('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const finish = () => {
    const correct = questions.reduce(
      (total, question) => (answers[question.originalIndex] === question.answer ? total + 1 : total),
      0
    );
    const percent = Math.round((correct / questions.length) * 100);
    const saved = submitQuiz({
      quizId: quiz.id,
      correct,
      total: questions.length,
      percent,
    });
    setResult(saved);
    setPhase('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    pushToast({
      title: 'Quiz submitted',
      message: `${correct} of ${questions.length} correct (${percent}%).${
        saved.xpEarned > 0 ? ` +${saved.xpEarned} XP.` : ' Retake — no additional XP.'
      }`,
      type: percent >= 70 ? 'success' : 'warning',
      duration: 5000,
    });
  };

  if (phase === 'result' && result) {
    return (
      <div className="page">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/quizzes">Quizzes</Link>
          <Icon name="chevronRight" size={13} />
          <span aria-current="page">{quiz.title} result</span>
        </nav>
        <QuizResult
          quiz={quiz}
          questions={questions}
          answers={answers}
          result={result}
          onRetry={() => {
            setPhase('intro');
            setIndex(0);
            setAnswers({});
            setResult(null);
          }}
        />
      </div>
    );
  }

  if (phase === 'intro') {
    return (
      <div className="page quiz-play">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/quizzes">Quizzes</Link>
          <Icon name="chevronRight" size={13} />
          <span aria-current="page">{quiz.title}</span>
        </nav>

        <section className="quiz-intro panel" style={{ '--quiz-accent': quiz.accent }}>
          <span className="quiz-intro__icon" style={{ background: `${quiz.accent}1f`, color: quiz.accent }}>
            <Icon name="quizzes" size={30} />
          </span>
          <p className="page-eyebrow">{quiz.category}</p>
          <h1>{quiz.title}</h1>
          <p className="page-description">{quiz.description}</p>

          <div className="quiz-intro__facts">
            <div>
              <Icon name="book" size={17} />
              <span>{quiz.questions.length} questions</span>
            </div>
            <div>
              <Icon name="clock" size={17} />
              <span>About {Math.max(5, Math.round(quiz.questions.length * 0.7))} minutes</span>
            </div>
            <div>
              <Icon name="bolt" size={17} />
              <span>10–30 XP on first attempt</span>
            </div>
            <div>
              <Icon name="star" size={17} />
              <span>{best > 0 ? `Best score ${best}%` : 'No previous attempt'}</span>
            </div>
          </div>

          <div className="quiz-intro__setup">
            <label className="toggle">
              <input
                type="checkbox"
                checked={shuffleQuestions}
                onChange={(event) => setShuffleQuestions(event.target.checked)}
              />
              <span className="toggle__track" aria-hidden="true" />
              <span>
                Shuffle question order
                <span className="muted small">Answers and scoring stay the same.</span>
              </span>
            </label>
            <div className="quiz-intro__actions">
              <button type="button" className="btn btn--primary" onClick={start}>
                <Icon name="play" size={15} />
                Start quiz
              </button>
              <Link to="/quizzes" className="btn btn--ghost">
                Cancel
              </Link>
            </div>
          </div>

          {history.length > 0 ? (
            <div className="quiz-history">
              <h2>Recent attempts</h2>
              <ul>
                {history.slice(0, 3).map((attempt) => (
                  <li key={attempt.id}>
                    <span>{new Date(attempt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="badge badge--neutral">
                      {attempt.correct}/{attempt.total} · {attempt.percent}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      </div>
    );
  }

  const question = questions[index];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="page quiz-play">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/quizzes">Quizzes</Link>
        <Icon name="chevronRight" size={13} />
        <span aria-current="page">{quiz.title}</span>
      </nav>

      <div className="quiz-play__header">
        <div>
          <p className="page-eyebrow">{quiz.category} quiz</p>
          <h1>{quiz.title}</h1>
        </div>
        <span className="badge badge--neutral">
          {answeredCount}/{questions.length} answered
        </span>
      </div>

      <ProgressBar
        value={((index + 1) / questions.length) * 100}
        label={`Question ${index + 1} of ${questions.length}`}
        hint={`${answeredCount} answered`}
        ariaLabel="Quiz progress"
      />

      <div className="quiz-play__layout">
        <section className="panel quiz-play__question">
          <QuizQuestion
            question={question}
            selected={answers[question.originalIndex]}
            onSelect={(optionIndex) =>
              setAnswers((current) => ({ ...current, [question.originalIndex]: optionIndex }))
            }
            number={index + 1}
            total={questions.length}
          />

          <div className="quiz-play__nav">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setIndex((value) => Math.max(0, value - 1))}
              disabled={index === 0}
            >
              <Icon name="arrowLeft" size={15} />
              Previous
            </button>
            {index < questions.length - 1 ? (
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => setIndex((value) => Math.min(questions.length - 1, value + 1))}
              >
                Next question
                <Icon name="arrowRight" size={15} />
              </button>
            ) : (
              <button
                type="button"
                className="btn btn--primary"
                onClick={finish}
                disabled={answeredCount < questions.length}
                title={answeredCount < questions.length ? 'Answer every question before submitting' : 'Submit quiz'}
              >
                <Icon name="check" size={15} />
                Finish quiz
              </button>
            )}
          </div>
          {index === questions.length - 1 && answeredCount < questions.length ? (
            <p className="field__hint">Answer all {questions.length} questions to enable submission.</p>
          ) : null}
        </section>

        <aside className="panel quiz-palette">
          <h2>Questions</h2>
          <div className="quiz-palette__grid">
            {questions.map((item, itemIndex) => {
              const answered = answers[item.originalIndex] !== undefined;
              return (
                <button
                  key={item.originalIndex}
                  type="button"
                  className={`quiz-palette__item ${itemIndex === index ? 'is-current' : ''} ${answered ? 'is-answered' : ''}`.trim()}
                  onClick={() => setIndex(itemIndex)}
                  aria-label={`Go to question ${itemIndex + 1}${answered ? ', answered' : ', unanswered'}`}
                  aria-current={itemIndex === index ? 'step' : undefined}
                >
                  {itemIndex + 1}
                </button>
              );
            })}
          </div>
          <ul className="legend">
            <li><span className="legend__dot legend__dot--current" /> Current</li>
            <li><span className="legend__dot legend__dot--answered" /> Answered</li>
            <li><span className="legend__dot" /> Unanswered</li>
          </ul>
          <p className="muted small">
            Your answers are kept in this tab until you finish. The quiz submits once and is scored against fixed
            answers.
          </p>
        </aside>
      </div>
    </div>
  );
}
