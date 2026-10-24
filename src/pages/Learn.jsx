import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../components/common/EmptyState';
import Icon from '../components/common/Icon';
import ProgressBar from '../components/common/ProgressBar';
import { courses, totalLessons } from '../data/courses';
import { useAppData } from '../hooks/useAppData';
import { courseProgress, inProgressCourse, nextLessonForCourse } from '../utils/stats';

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function Learn() {
  const { state, stats } = useAppData();
  const [level, setLevel] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return courses.filter((course) => {
      const levelMatch = level === 'All' || course.level === level;
      const queryMatch =
        !term ||
        course.title.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term) ||
        course.badge.toLowerCase().includes(term);
      return levelMatch && queryMatch;
    });
  }, [level, query]);

  const continuing = inProgressCourse(state);
  const overall = totalLessons === 0 ? 0 : Math.round((stats.lessonsCompleted / totalLessons) * 100);

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Curriculum</p>
          <h1>Learn</h1>
          <p className="page-description">
            Thirteen focused courses covering the frontend stack from markup to algorithms. Finish lessons to
            earn XP and build a complete foundation.
          </p>
        </div>
        <div className="page-header__stats">
          <span className="pill">
            <Icon name="book" size={14} />
            {stats.lessonsCompleted} / {totalLessons} lessons
          </span>
          <span className="pill">
            <Icon name="star" size={14} />
            {stats.completedCourseIds.length} / {courses.length} courses finished
          </span>
        </div>
      </header>

      <section className="learn-overview panel">
        <div className="learn-overview__info">
          <h2>Overall curriculum progress</h2>
          <ProgressBar
            value={overall}
            hint={`${overall}% complete`}
            label={`${stats.lessonsCompleted} of ${totalLessons} lessons`}
            ariaLabel="Overall curriculum progress"
          />
        </div>
        {continuing ? (
          <Link
            to={`/learn/${continuing.course.id}/${continuing.lesson.id}`}
            className="btn btn--primary"
          >
            <Icon name="play" size={15} />
            {continuing.notStarted ? 'Start learning' : 'Continue learning'}
          </Link>
        ) : (
          <Link to="/code-lab" className="btn btn--soft">
            Curriculum complete — keep practicing
          </Link>
        )}
      </section>

      <div className="filter-bar">
        <div className="segmented" role="group" aria-label="Filter courses by level">
          {levels.map((item) => (
            <button
              key={item}
              type="button"
              className={`segmented__item ${level === item ? 'is-active' : ''}`.trim()}
              onClick={() => setLevel(item)}
              aria-pressed={level === item}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="filter-search">
          <Icon name="search" size={16} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter courses"
            aria-label="Filter courses by name"
          />
        </div>
        <span className="filter-count">{filtered.length} courses</span>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="learn"
          title="No courses match those filters"
          description="Clear the search or choose a different difficulty level."
          action={
            <button
              type="button"
              className="btn btn--soft"
              onClick={() => {
                setLevel('All');
                setQuery('');
              }}
            >
              Clear filters
            </button>
          }
        />
      ) : (
        <div className="course-grid">
          {filtered.map((course) => {
            const progress = courseProgress(state, course);
            const next = nextLessonForCourse(state, course);
            return (
              <article key={course.id} className="course-card">
                <div className="course-card__top">
                  <span
                    className="course-badge"
                    style={{ background: `${course.accent}1f`, color: course.accent }}
                    aria-hidden="true"
                  >
                    {course.badge}
                  </span>
                  <span className="badge badge--neutral">{course.level}</span>
                </div>
                <h2>
                  <Link to={`/learn/${course.id}`}>{course.title}</Link>
                </h2>
                <p className="course-card__description">{course.description}</p>
                <div className="course-card__meta">
                  <span>
                    <Icon name="book" size={14} /> {course.lessons.length} lessons
                  </span>
                  <span>
                    <Icon name="clock" size={14} /> {course.duration}
                  </span>
                </div>
                <ProgressBar
                  value={progress.percent}
                  label={progress.finished ? 'Completed' : 'Progress'}
                  hint={`${progress.completed}/${progress.total} lessons`}
                  size="sm"
                  ariaLabel={`${course.title} progress`}
                />
                <div className="course-card__footer">
                  <Link to={`/learn/${course.id}`} className="btn btn--ghost btn--sm">
                    View course
                  </Link>
                  {!progress.finished && next ? (
                    <Link
                      to={`/learn/${course.id}/${next.id}`}
                      className="btn btn--primary btn--sm"
                    >
                      {progress.completed === 0 ? 'Start' : 'Continue'}
                      <Icon name="arrowRight" size={14} />
                    </Link>
                  ) : (
                    <span className="course-card__done">
                      <Icon name="checkCircle" size={16} /> Complete
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
