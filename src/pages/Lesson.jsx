import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmptyState from '../components/common/EmptyState';
import Icon from '../components/common/Icon';
import { getCourse, getLesson } from '../data/courses';
import { useAppData } from '../hooks/useAppData';
import { useToast } from '../hooks/useToast';
import { copyText } from '../utils/clipboard';
import { courseProgress } from '../utils/stats';

export default function Lesson() {
  const { courseId, lessonId } = useParams();
  const { state, completeLesson } = useAppData();
  const { pushToast } = useToast();
  const course = getCourse(courseId);
  const lesson = getLesson(courseId, lessonId);
  const [choice, setChoice] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    setChoice(null);
    setChecked(false);
    setShowSolution(false);
  }, [lessonId]);

  if (!course || !lesson) {
    return (
      <div className="page">
        <EmptyState
          icon="learn"
          title="Lesson not found"
          description="This lesson does not exist. It may belong to a different course or an outdated link."
          action={
            <Link to="/learn" className="btn btn--primary">
              Back to courses
            </Link>
          }
        />
      </div>
    );
  }

  const index = course.lessons.findIndex((item) => item.id === lesson.id);
  const previous = course.lessons[index - 1] || null;
  const next = course.lessons[index + 1] || null;
  const done = Boolean(state.lessonsCompleted[lesson.id]);
  const progress = courseProgress(state, course);
  const quiz = lesson.quiz;

  const handleComplete = () => {
    const result = completeLesson(lesson.id);
    if (result.awarded > 0) {
      pushToast({
        title: 'Lesson complete',
        message: `+${result.awarded} XP added. Your course progress has been updated.`,
        type: 'success',
      });
    } else {
      pushToast({
        title: 'Already completed',
        message: 'This lesson is already in your progress. XP is only awarded once.',
        type: 'info',
      });
    }
  };

  const handleCopy = async () => {
    const ok = await copyText(lesson.code.source);
    pushToast({
      title: ok ? 'Code copied' : 'Copy failed',
      message: ok ? 'The example is on your clipboard.' : 'Select the code manually and copy it.',
      type: ok ? 'success' : 'error',
    });
  };

  return (
    <div className="page lesson-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/learn">Learn</Link>
        <Icon name="chevronRight" size={13} />
        <Link to={`/learn/${course.id}`}>{course.title}</Link>
        <Icon name="chevronRight" size={13} />
        <span aria-current="page">{lesson.title}</span>
      </nav>

      <div className="lesson-layout">
        <article className="lesson-main">
          <header className="lesson-header">
            <p className="page-eyebrow">
              Lesson {index + 1} of {course.lessons.length} · {lesson.minutes} min
            </p>
            <h1>{lesson.title}</h1>
            <div className="lesson-header__meta">
              <span className="badge badge--brand">{course.title}</span>
              {done ? (
                <span className="badge badge--success">
                  <Icon name="check" size={13} /> Completed
                </span>
              ) : (
                <span className="badge badge--neutral">+20 XP on completion</span>
              )}
            </div>
          </header>

          <section className="lesson-objectives panel">
            <h2>What you will learn</h2>
            <ul>
              {lesson.objectives.map((objective) => (
                <li key={objective}>
                  <Icon name="checkCircle" size={16} />
                  {objective}
                </li>
              ))}
            </ul>
          </section>

          {lesson.sections.map((section) => (
            <section className="lesson-section" key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}

          <section className="lesson-code" aria-label="Code example">
            <header>
              <span>
                <Icon name="code" size={16} />
                Example · {lesson.code.lang}
              </span>
              <button type="button" className="btn btn--ghost btn--sm" onClick={handleCopy}>
                <Icon name="copy" size={14} />
                Copy
              </button>
            </header>
            <pre>
              <code>{lesson.code.source}</code>
            </pre>
          </section>

          <section className="practice-card panel">
            <div className="panel__header">
              <div>
                <p className="panel__eyebrow">Practice</p>
                <h2>Try it yourself</h2>
              </div>
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => setShowSolution((value) => !value)}
                aria-expanded={showSolution}
              >
                {showSolution ? 'Hide solution' : 'Show solution'}
              </button>
            </div>
            <p>{lesson.practice.prompt}</p>
            <div className="hint-box">
              <Icon name="info" size={16} />
              <p>
                <strong>Hint:</strong> {lesson.practice.hint}
              </p>
            </div>
            {showSolution ? (
              <pre className="solution-block">
                <code>{lesson.practice.solution}</code>
              </pre>
            ) : null}
            <div className="panel__actions">
              <Link to="/code-lab" className="btn btn--soft btn--sm">
                <Icon name="lab" size={15} />
                Practice in Code Lab
              </Link>
            </div>
          </section>

          {quiz ? (
            <section className="lesson-quiz panel">
              <div className="panel__header">
                <div>
                  <p className="panel__eyebrow">Knowledge check</p>
                  <h2>Mini quiz</h2>
                </div>
              </div>
              <fieldset>
                <legend>{quiz.question}</legend>
                <div className="quiz-options">
                  {quiz.options.map((option, optionIndex) => {
                    const isCorrect = optionIndex === quiz.answer;
                    const isChosen = choice === optionIndex;
                    let stateClass = '';
                    if (checked && isChosen && !isCorrect) stateClass = 'is-wrong';
                    if (checked && isCorrect) stateClass = 'is-correct';
                    return (
                      <label
                        key={option}
                        className={`quiz-option ${isChosen ? 'is-chosen' : ''} ${stateClass}`.trim()}
                      >
                        <input
                          type="radio"
                          name="lesson-quiz"
                          value={optionIndex}
                          checked={isChosen}
                          onChange={() => {
                            setChoice(optionIndex);
                            setChecked(false);
                          }}
                          disabled={checked && isCorrect}
                        />
                        <span className="quiz-option__key">{String.fromCharCode(65 + optionIndex)}</span>
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <div className="quiz-actions">
                <button
                  type="button"
                  className="btn btn--primary btn--sm"
                  disabled={choice === null || checked}
                  onClick={() => setChecked(true)}
                >
                  Check answer
                </button>
                {checked ? (
                  <span
                    className={`quiz-feedback ${choice === quiz.answer ? 'is-correct' : 'is-wrong'}`}
                    role="status"
                  >
                    <Icon name={choice === quiz.answer ? 'checkCircle' : 'warning'} size={16} />
                    {choice === quiz.answer ? 'Correct. ' : 'Not quite. '}
                    {quiz.explanation}
                  </span>
                ) : null}
              </div>
            </section>
          ) : null}

          <div className="lesson-complete panel">
            <div>
              <h2>{done ? 'Lesson completed' : 'Finished this lesson?'}</h2>
              <p className="muted">
                {done
                  ? 'This lesson is saved in your progress. Review it anytime — XP is only awarded once.'
                  : 'Mark it complete to earn 20 XP and update your course progress.'}
              </p>
            </div>
            <button
              type="button"
              className={`btn ${done ? 'btn--soft' : 'btn--primary'}`}
              onClick={handleComplete}
              disabled={done}
            >
              <Icon name={done ? 'checkCircle' : 'check'} size={16} />
              {done ? 'Completed' : 'Complete lesson · +20 XP'}
            </button>
          </div>

          <nav className="lesson-nav" aria-label="Lesson navigation">
            {previous ? (
              <Link to={`/learn/${course.id}/${previous.id}`} className="lesson-nav__link">
                <Icon name="arrowLeft" size={16} />
                <span>
                  <span>Previous</span>
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to={`/learn/${course.id}/${next.id}`} className="lesson-nav__link lesson-nav__link--next">
                <span>
                  <span>Next</span>
                  {next.title}
                </span>
                <Icon name="arrowRight" size={16} />
              </Link>
            ) : (
              <Link to={`/learn/${course.id}`} className="lesson-nav__link lesson-nav__link--next">
                <span>
                  <span>Course</span>
                  Back to syllabus
                </span>
                <Icon name="arrowRight" size={16} />
              </Link>
            )}
          </nav>
        </article>

        <aside className="lesson-side">
          <section className="panel">
            <div className="panel__header">
              <div>
                <p className="panel__eyebrow">In this course</p>
                <h2>{course.title}</h2>
              </div>
            </div>
            <div className="muted small">
              {progress.completed} of {progress.total} lessons complete · {progress.percent}%
            </div>
            <ol className="lesson-side__list">
              {course.lessons.map((item, itemIndex) => {
                const completed = Boolean(state.lessonsCompleted[item.id]);
                const active = item.id === lesson.id;
                return (
                  <li key={item.id}>
                    <Link
                      to={`/learn/${course.id}/${item.id}`}
                      className={`lesson-side__link ${active ? 'is-active' : ''} ${completed ? 'is-done' : ''}`.trim()}
                      aria-current={active ? 'page' : undefined}
                    >
                      <span className="lesson-side__index">
                        {completed ? <Icon name="check" size={13} /> : itemIndex + 1}
                      </span>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
            <Link to={`/learn/${course.id}`} className="btn btn--ghost btn--sm btn--full">
              Course overview
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
