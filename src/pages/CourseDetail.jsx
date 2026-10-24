import { Link, useParams } from 'react-router-dom';
import EmptyState from '../components/common/EmptyState';
import Icon from '../components/common/Icon';
import ProgressBar from '../components/common/ProgressBar';
import { getCourse } from '../data/courses';
import { useAppData } from '../hooks/useAppData';
import { courseProgress, nextLessonForCourse } from '../utils/stats';

export default function CourseDetail() {
  const { courseId } = useParams();
  const { state } = useAppData();
  const course = getCourse(courseId);

  if (!course) {
    return (
      <div className="page">
        <EmptyState
          icon="learn"
          title="Course not found"
          description="This course does not exist or the link is outdated."
          action={
            <Link to="/learn" className="btn btn--primary">
              Browse all courses
            </Link>
          }
        />
      </div>
    );
  }

  const progress = courseProgress(state, course);
  const next = nextLessonForCourse(state, course);

  return (
    <div className="page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/learn">Learn</Link>
        <Icon name="chevronRight" size={13} />
        <span aria-current="page">{course.title}</span>
      </nav>

      <header className="course-hero" style={{ '--course-accent': course.accent }}>
        <div className="course-hero__main">
          <span
            className="course-badge course-badge--lg"
            style={{ background: `${course.accent}22`, color: course.accent }}
            aria-hidden="true"
          >
            {course.badge}
          </span>
          <div>
            <p className="page-eyebrow">
              {course.level} · {course.lessons.length} lessons · {course.duration}
            </p>
            <h1>{course.title}</h1>
            <p className="page-description">{course.description}</p>
          </div>
        </div>
        <div className="course-hero__side">
          <ProgressBar
            value={progress.percent}
            label="Course progress"
            hint={`${progress.completed} of ${progress.total} lessons`}
            ariaLabel={`${course.title} progress`}
          />
          {progress.finished ? (
            <span className="btn btn--soft btn--disabled" aria-disabled="true">
              <Icon name="checkCircle" size={16} />
              Course complete
            </span>
          ) : (
            <Link to={`/learn/${course.id}/${next.id}`} className="btn btn--primary">
              <Icon name="play" size={15} />
              {progress.completed === 0 ? 'Start course' : 'Continue course'}
            </Link>
          )}
        </div>
      </header>

      <section className="panel">
        <div className="panel__header">
          <div>
            <p className="panel__eyebrow">Syllabus</p>
            <h2>Lessons</h2>
          </div>
          <span className="badge badge--neutral">
            {progress.completed}/{progress.total} done
          </span>
        </div>
        <ol className="lesson-list">
          {course.lessons.map((lesson, index) => {
            const done = Boolean(state.lessonsCompleted[lesson.id]);
            const isNext = next && next.id === lesson.id;
            return (
              <li key={lesson.id}>
                <Link
                  to={`/learn/${course.id}/${lesson.id}`}
                  className={`lesson-row ${done ? 'is-done' : ''} ${isNext ? 'is-next' : ''}`.trim()}
                >
                  <span className="lesson-row__index" aria-hidden="true">
                    {done ? <Icon name="check" size={16} /> : String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="lesson-row__body">
                    <span className="lesson-row__title">{lesson.title}</span>
                    <span className="lesson-row__meta">
                      {lesson.minutes} min · {lesson.objectives.length} learning objectives
                    </span>
                  </span>
                  {isNext ? <span className="badge badge--brand">Up next</span> : null}
                  {done ? <span className="sr-only">Completed</span> : null}
                  <Icon name="chevronRight" size={16} />
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
