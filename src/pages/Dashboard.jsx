import { Link } from 'react-router-dom';
import BarChart from '../components/charts/BarChart';
import ChartCard from '../components/charts/ChartCard';
import EmptyState from '../components/common/EmptyState';
import Icon from '../components/common/Icon';
import ProgressBar from '../components/common/ProgressBar';
import StatCard from '../components/common/StatCard';
import UserAvatar from '../components/common/UserAvatar';
import { challenges } from '../data/challenges';
import { allLessons, getCourse, totalLessons } from '../data/courses';
import { quizzes } from '../data/quizzes';
import { useAppData } from '../hooks/useAppData';
import {
  formatNumber,
  formatRelative,
  inProgressCourse,
  nextLessonOverall,
  recentActivity,
} from '../utils/stats';
import { levelProgress, levelTitle } from '../utils/xp';

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function activityLabel(item) {
  if (item.type === 'lesson') {
    const lesson = allLessons.find((entry) => entry.id === item.id);
    return {
      title: lesson ? lesson.title : 'Lesson completed',
      subtitle: lesson ? lesson.courseTitle : 'Course lesson',
      icon: 'book',
      path: lesson ? `/learn/${lesson.courseId}/${lesson.id}` : '/learn',
      text: 'Lesson completed',
    };
  }
  if (item.type === 'challenge') {
    const challenge = challenges.find((entry) => entry.id === item.id);
    return {
      title: challenge ? challenge.title : 'Challenge solved',
      subtitle: challenge ? `${challenge.category} · ${challenge.difficulty}` : 'Challenge',
      icon: 'target',
      path: challenge ? `/challenges/${challenge.id}` : '/challenges',
      text: 'Challenge solved',
    };
  }
  if (item.type === 'quiz') {
    const quiz = quizzes.find((entry) => entry.id === item.id);
    return {
      title: quiz ? quiz.title : 'Quiz completed',
      subtitle: `${item.percent}% score`,
      icon: 'quizzes',
      path: quiz ? `/quizzes/${quiz.id}` : '/quizzes',
      text: 'Quiz completed',
    };
  }
  return {
    title: item.name || 'Project created',
    subtitle: 'Saved project',
    icon: 'projects',
    path: `/projects/${item.id}`,
    text: 'Project created',
  };
}

export default function Dashboard() {
  const { state, stats } = useAppData();
  const progress = levelProgress(state.xp);
  const overall = totalLessons === 0 ? 0 : Math.round((stats.lessonsCompleted / totalLessons) * 100);
  const continuing = inProgressCourse(state);
  const fallback = nextLessonOverall(state);
  const activity = recentActivity(state, 5);
  const recentProjects = [...state.projects]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 3);

  const tasks = [
    {
      id: 'xp',
      label: `Earn ${stats.dailyGoal} XP today`,
      done: stats.today.xp >= stats.dailyGoal,
      detail: `${stats.today.xp} / ${stats.dailyGoal} XP`,
    },
    {
      id: 'lesson',
      label: 'Complete one lesson',
      done: stats.today.lessons >= 1,
      detail: `${stats.today.lessons} lesson${stats.today.lessons === 1 ? '' : 's'} today`,
    },
    {
      id: 'challenge',
      label: 'Solve one challenge',
      done: stats.today.challenges >= 1,
      detail: `${stats.today.challenges} solved today`,
    },
  ];
  const tasksDone = tasks.filter((task) => task.done).length;

  return (
    <div className="page dashboard">
      <section className="hero">
        <div className="hero__main">
          <UserAvatar name={state.profile.name} color={state.profile.avatarColor} size={56} />
          <div>
            <p className="hero__eyebrow">{greeting()},</p>
            <h1>{state.profile.name}</h1>
            <div className="hero__meta">
              <span className="pill pill--level">
                <Icon name="star" size={14} />
                Level {progress.level} · {levelTitle(progress.level)}
              </span>
              <span className="pill">
                <Icon name="bolt" size={14} />
                {formatNumber(state.xp)} XP
              </span>
              <span className="pill">
                <Icon name="flame" size={14} />
                {stats.streak} day streak
              </span>
            </div>
          </div>
        </div>
        <div className="hero__progress">
          <div
            className="level-ring"
            style={{
              background: `conic-gradient(#7c5cff ${progress.percent * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
            }}
            role="img"
            aria-label={`Level ${progress.level}, ${progress.percent}% toward the next level`}
          >
            <div className="level-ring__inner">
              <span className="level-ring__value">{progress.level}</span>
              <span className="level-ring__label">level</span>
            </div>
          </div>
          <div className="hero__progress-meta">
            <p>
              {progress.current} / {progress.needed} XP to level {progress.level + 1}
            </p>
            <ProgressBar
              value={overall}
              label="Overall curriculum"
              hint={`${overall}% · ${stats.lessonsCompleted}/${totalLessons} lessons`}
              ariaLabel="Overall curriculum progress"
            />
            <Link to="/learn" className="hero__link">
              View learning path <Icon name="arrowRight" size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section aria-label="Learning statistics" className="stat-grid">
        <StatCard
          icon="target"
          label="Challenges solved"
          value={formatNumber(stats.solvedChallenges)}
          hint={`of ${stats.totalChallenges} available`}
          tone="brand"
        />
        <StatCard
          icon="book"
          label="Lessons completed"
          value={formatNumber(stats.lessonsCompleted)}
          hint={`of ${totalLessons} lessons`}
          tone="cyan"
        />
        <StatCard
          icon="quizzes"
          label="Average quiz score"
          value={`${stats.avgQuizPercent}%`}
          hint={`${stats.quizResultsCount} attempts`}
          tone="green"
        />
        <StatCard
          icon="clock"
          label="Learning days"
          value={formatNumber(stats.daysActive)}
          hint={stats.streak > 0 ? `${stats.streak} day streak` : 'Start a streak today'}
          tone="amber"
        />
        <StatCard
          icon="bolt"
          label="Total XP"
          value={formatNumber(state.xp)}
          hint={`${formatNumber(stats.weeklyXp)} XP this week`}
          tone="pink"
        />
        <StatCard
          icon="flame"
          label="Daily activity"
          value={`${stats.dailyGoalPercent}%`}
          hint={`${stats.today.xp} of ${stats.dailyGoal} XP goal`}
          tone="purple"
        />
      </section>

      <div className="dashboard-grid">
        <div className="dashboard-grid__main">
          <section className="panel continue-card">
            <div className="panel__header">
              <div>
                <p className="panel__eyebrow">Continue learning</p>
                <h2>{continuing ? continuing.course.title : 'Choose your next course'}</h2>
              </div>
              <Link to="/learn" className="text-link">
                All courses <Icon name="arrowRight" size={14} />
              </Link>
            </div>
            {continuing ? (
              <>
                <div className="continue-card__body">
                  <div className="course-badge" style={{ background: `${continuing.course.accent}1f`, color: continuing.course.accent }}>
                    {continuing.course.badge}
                  </div>
                  <div className="continue-card__info">
                    <p className="continue-card__lesson">
                      {continuing.notStarted ? 'Start with' : 'Next up'}: <strong>{continuing.lesson.title}</strong>
                    </p>
                    <p className="muted">
                      {continuing.course.level} · {continuing.lesson.minutes} min · {continuing.course.description}
                    </p>
                    <ProgressBar
                      value={
                        (continuing.course.lessons.filter((lesson) => state.lessonsCompleted[lesson.id]).length /
                          continuing.course.lessons.length) *
                        100
                      }
                      label={`${continuing.course.title} progress`}
                      ariaLabel={`${continuing.course.title} progress`}
                    />
                  </div>
                </div>
                <div className="panel__actions">
                  <Link
                    to={`/learn/${continuing.course.id}/${continuing.lesson.id}`}
                    className="btn btn--primary"
                  >
                    <Icon name="play" size={15} />
                    {continuing.notStarted ? 'Start lesson' : 'Resume lesson'}
                  </Link>
                  <Link to={`/learn/${continuing.course.id}`} className="btn btn--ghost">
                    View course
                  </Link>
                </div>
              </>
            ) : (
              <EmptyState
                icon="cap"
                title="Curriculum complete"
                description="You have finished every lesson. Revisit a course or keep your skills sharp in Code Lab."
                action={
                  <Link to="/code-lab" className="btn btn--primary">
                    Open Code Lab
                  </Link>
                }
              />
            )}
          </section>

          <ChartCard
            title="Weekly activity"
            subtitle={`${formatNumber(stats.weeklyXp)} XP earned in the last seven days`}
            action={
              <Link to="/statistics" className="text-link">
                Full stats <Icon name="arrowRight" size={14} />
              </Link>
            }
          >
            {stats.weeklyXp === 0 ? (
              <EmptyState
                icon="stats"
                compact
                title="No XP this week yet"
                description="Complete a lesson, quiz, or challenge and your weekly bars will appear here."
              />
            ) : (
              <BarChart
                data={stats.weekly}
                valueKey="xp"
                labelKey="label"
                ariaLabel="Weekly XP"
                formatValue={(value) => `${value}`}
              />
            )}
          </ChartCard>

          <section className="panel">
            <div className="panel__header">
              <div>
                <p className="panel__eyebrow">Timeline</p>
                <h2>Recent activity</h2>
              </div>
            </div>
            {activity.length === 0 ? (
              <EmptyState
                icon="clock"
                compact
                title="Nothing logged yet"
                description="Your completed lessons, solved challenges, quiz attempts, and new projects will appear here."
                action={
                  <Link to="/learn" className="btn btn--soft btn--sm">
                    Start learning
                  </Link>
                }
              />
            ) : (
              <ul className="activity-list">
                {activity.map((item) => {
                  const meta = activityLabel(item);
                  return (
                    <li key={`${item.type}-${item.id}-${item.date}`}>
                      <Link to={meta.path} className="activity-item">
                        <span className="activity-item__icon" aria-hidden="true">
                          <Icon name={meta.icon} size={16} />
                        </span>
                        <span className="activity-item__body">
                          <span className="activity-item__title">{meta.title}</span>
                          <span className="activity-item__subtitle">
                            {meta.text} · {meta.subtitle}
                          </span>
                        </span>
                        <span className="activity-item__time">{formatRelative(item.date)}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>

        <div className="dashboard-grid__side">
          <section className="panel daily-goals">
            <div className="panel__header">
              <div>
                <p className="panel__eyebrow">Today</p>
                <h2>Daily goals</h2>
              </div>
              <span className="badge badge--neutral">{tasksDone}/{tasks.length}</span>
            </div>
            <ProgressBar
              value={(tasksDone / tasks.length) * 100}
              hint={`${tasksDone} of ${tasks.length} complete`}
              label="Daily completion"
              ariaLabel="Daily goals completion"
            />
            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task.id} className={task.done ? 'is-done' : ''}>
                  <span className="task-list__check" aria-hidden="true">
                    <Icon name={task.done ? 'check' : 'target'} size={14} />
                  </span>
                  <span>
                    <span className="task-list__label">{task.label}</span>
                    <span className="task-list__detail">{task.done ? 'Complete' : task.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="muted small">Goal resets each local calendar day. Adjust it in Settings.</p>
          </section>

          <section className="panel">
            <div className="panel__header">
              <div>
                <p className="panel__eyebrow">Shortcuts</p>
                <h2>Quick actions</h2>
              </div>
            </div>
            <div className="quick-actions">
              <Link to={fallback.lesson ? `/learn/${fallback.course.id}/${fallback.lesson.id}` : '/learn'} className="quick-action">
                <Icon name="book" size={18} />
                <span>Recommended lesson</span>
                <Icon name="chevronRight" size={15} />
              </Link>
              <Link to="/code-lab" className="quick-action">
                <Icon name="lab" size={18} />
                <span>Open Code Lab</span>
                <Icon name="chevronRight" size={15} />
              </Link>
              <Link to="/challenges" className="quick-action">
                <Icon name="target" size={18} />
                <span>Solve a challenge</span>
                <Icon name="chevronRight" size={15} />
              </Link>
              <Link to="/quizzes" className="quick-action">
                <Icon name="quizzes" size={18} />
                <span>Take a quiz</span>
                <Icon name="chevronRight" size={15} />
              </Link>
            </div>
          </section>

          <section className="panel">
            <div className="panel__header">
              <div>
                <p className="panel__eyebrow">Workspace</p>
                <h2>Recent projects</h2>
              </div>
              <Link to="/projects" className="text-link">
                All <Icon name="arrowRight" size={14} />
              </Link>
            </div>
            {recentProjects.length === 0 ? (
              <EmptyState
                icon="projects"
                compact
                title="No projects yet"
                description="Build something small and save it to your workspace."
                action={
                  <Link to="/projects" className="btn btn--soft btn--sm">
                    Create a project
                  </Link>
                }
              />
            ) : (
              <ul className="mini-project-list">
                {recentProjects.map((project) => (
                  <li key={project.id}>
                    <Link to={`/projects/${project.id}`} className="mini-project">
                      <span className="mini-project__icon" aria-hidden="true">
                        <Icon name="code" size={15} />
                      </span>
                      <span>
                        <span className="mini-project__name">{project.name}</span>
                        <span className="mini-project__date">Edited {formatRelative(project.updatedAt)}</span>
                      </span>
                      <Icon name="chevronRight" size={15} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
