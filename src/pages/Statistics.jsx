import { Link } from 'react-router-dom';
import BarChart from '../components/charts/BarChart';
import ChartCard from '../components/charts/ChartCard';
import EmptyState from '../components/common/EmptyState';
import Icon from '../components/common/Icon';
import ProgressBar from '../components/common/ProgressBar';
import StatCard from '../components/common/StatCard';
import { courses } from '../data/courses';
import { useAppData } from '../hooks/useAppData';
import { computeStats, courseProgress, formatNumber, weeklyActivitySeries } from '../utils/stats';
import { levelProgress } from '../utils/xp';

export default function Statistics() {
  const { state } = useAppData();
  const stats = computeStats(state);
  const progress = levelProgress(state.xp);
  const weeklySeries = weeklyActivitySeries(state, 6);
  const maxWeekly = Math.max(...weeklySeries.map((item) => item.xp), 1);

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Insights</p>
          <h1>Statistics</h1>
          <p className="page-description">
            Real numbers pulled from your local progress. Track daily activity, course completion, quiz
            performance, and challenge breakdowns.
          </p>
        </div>
        <div className="page-header__stats">
          <span className="pill">
            <Icon name="stats" size={14} />
            {stats.daysActive} learning days
          </span>
          <span className="pill">
            <Icon name="flame" size={14} />
            {stats.streak} day streak
          </span>
        </div>
      </header>

      <section className="stat-grid">
        <StatCard icon="bolt" label="Total XP" value={formatNumber(state.xp)} hint={`Level ${progress.level}`} tone="brand" />
        <StatCard icon="book" label="Lessons" value={formatNumber(stats.lessonsCompleted)} hint={`of ${stats.totalLessons}`} tone="cyan" />
        <StatCard icon="target" label="Challenges" value={formatNumber(stats.solvedChallenges)} hint={`of ${stats.totalChallenges}`} tone="green" />
        <StatCard icon="quizzes" label="Quiz average" value={`${stats.avgQuizPercent}%`} hint={`${stats.quizResultsCount} attempts`} tone="amber" />
        <StatCard icon="projects" label="Projects" value={formatNumber(stats.projectsCount)} hint="Saved locally" tone="pink" />
        <StatCard icon="lab" label="Code runs" value={formatNumber(stats.codeRuns)} hint="In Code Lab" tone="purple" />
      </section>

      <div className="stats-layout">
        <div className="stats-layout__main">
          <ChartCard
            title="Daily activity"
            subtitle="XP earned over the last 14 days"
            action={
              <span className="badge badge--neutral">Goal {stats.dailyGoal} XP/day</span>
            }
          >
            {stats.daily.every((day) => day.xp === 0) ? (
              <EmptyState
                icon="stats"
                compact
                title="No activity yet"
                description="Complete a lesson or solve a challenge to see your daily chart."
              />
            ) : (
              <BarChart
                data={stats.daily}
                valueKey="xp"
                labelKey="shortLabel"
                ariaLabel="Daily XP for the last 14 days"
                formatValue={(value) => `${value} XP`}
              />
            )}
          </ChartCard>

          <ChartCard
            title="Six-week trend"
            subtitle="Total XP per 7-day window"
            action={<span className="badge badge--neutral">Rolling summary</span>}
          >
            {weeklySeries.every((item) => item.xp === 0) ? (
              <EmptyState
                icon="stats"
                compact
                title="Build up history"
                description="Activity over the coming weeks will appear here."
              />
            ) : (
              <div className="trend-list">
                {weeklySeries.map((item) => (
                  <div key={item.label} className="trend-item">
                    <span className="trend-item__label">{item.label}</span>
                    <div className="trend-item__bar">
                      <div
                        className="trend-item__fill"
                        style={{ width: `${Math.max(4, (item.xp / maxWeekly) * 100)}%` }}
                      />
                    </div>
                    <span className="trend-item__value">{formatNumber(item.xp)} XP</span>
                  </div>
                ))}
              </div>
            )}
          </ChartCard>

          <section className="panel">
            <div className="panel__header">
              <div>
                <p className="panel__eyebrow">Progress by course</p>
                <h2>Curriculum completion</h2>
              </div>
              <Link to="/learn" className="text-link">
                All courses <Icon name="arrowRight" size={14} />
              </Link>
            </div>
            {courses.length === 0 ? (
              <EmptyState icon="learn" compact title="No courses" description="Courses will appear here." />
            ) : (
              <div className="course-progress-list">
                {courses.map((course) => {
                  const prog = courseProgress(state, course);
                  return (
                    <article key={course.id} className="course-progress-item">
                      <div className="course-progress-item__header">
                        <div>
                          <span
                            className="course-badge"
                            style={{ background: `${course.accent}1f`, color: course.accent }}
                          >
                            {course.badge}
                          </span>
                          <h3>{course.title}</h3>
                        </div>
                        <span className="badge badge--neutral">
                          {prog.completed}/{prog.total}
                        </span>
                      </div>
                      <ProgressBar value={prog.percent} hint={`${prog.percent}%`} ariaLabel={`${course.title} progress`} />
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        <div className="stats-layout__side">
          <section className="panel">
            <div className="panel__header">
              <div>
                <p className="panel__eyebrow">Leveling</p>
                <h2>XP breakdown</h2>
              </div>
            </div>
            <div className="level-summary">
              <div>
                <span className="level-summary__value">{progress.level}</span>
                <span className="level-summary__label">Current level</span>
              </div>
              <div>
                <span className="level-summary__value">{formatNumber(state.xp)}</span>
                <span className="level-summary__label">Total XP</span>
              </div>
              <div>
                <span className="level-summary__value">
                  {progress.needed - progress.current}
                </span>
                <span className="level-summary__label">XP to next level</span>
              </div>
            </div>
            <ProgressBar
              value={progress.percent}
              label="Level progress"
              hint={`${progress.current}/${progress.needed} XP`}
              ariaLabel="Level progress"
            />
            <p className="muted small">250 XP per level. XP is awarded for completing lessons and first-time challenge or quiz successes.</p>
          </section>

          <section className="panel">
            <div className="panel__header">
              <div>
                <p className="panel__eyebrow">Challenges</p>
                <h2>By difficulty</h2>
              </div>
            </div>
            <ul className="difficulty-bars">
              <li>
                <span>Easy</span>
                <div className="difficulty-bars__track">
                  <div
                    className="difficulty-bars__fill difficulty-bars__fill--easy"
                    style={{ width: `${(stats.solvedByDifficulty.Easy / Math.max(1, stats.totalChallenges)) * 100}%` }}
                  />
                </div>
                <span>{stats.solvedByDifficulty.Easy}</span>
              </li>
              <li>
                <span>Medium</span>
                <div className="difficulty-bars__track">
                  <div
                    className="difficulty-bars__fill difficulty-bars__fill--medium"
                    style={{ width: `${(stats.solvedByDifficulty.Medium / Math.max(1, stats.totalChallenges)) * 100}%` }}
                  />
                </div>
                <span>{stats.solvedByDifficulty.Medium}</span>
              </li>
              <li>
                <span>Hard</span>
                <div className="difficulty-bars__track">
                  <div
                    className="difficulty-bars__fill difficulty-bars__fill--hard"
                    style={{ width: `${(stats.solvedByDifficulty.Hard / Math.max(1, stats.totalChallenges)) * 100}%` }}
                  />
                </div>
                <span>{stats.solvedByDifficulty.Hard}</span>
              </li>
            </ul>
          </section>

          <section className="panel">
            <div className="panel__header">
              <div>
                <p className="panel__eyebrow">Quizzes</p>
                <h2>Performance</h2>
              </div>
              <Link to="/quizzes" className="text-link">
                Take a quiz <Icon name="arrowRight" size={14} />
              </Link>
            </div>
            <div className="quiz-summary">
              <div>
                <span>{stats.uniqueQuizzes}</span>
                <small>Different quizzes</small>
              </div>
              <div>
                <span>{stats.quizResultsCount}</span>
                <small>Total attempts</small>
              </div>
              <div>
                <span>{stats.bestQuizPercent}%</span>
                <small>Best score</small>
              </div>
            </div>
            <p className="muted small">
              Average is calculated across all saved quiz attempts. First attempts award XP based on your score.
            </p>
          </section>

          <section className="panel">
            <div className="panel__header">
              <div>
                <p className="panel__eyebrow">Today</p>
                <h2>Daily snapshot</h2>
              </div>
            </div>
            <ul className="snapshot-list">
              <li>
                <span>XP earned today</span>
                <span>{stats.today.xp}</span>
              </li>
              <li>
                <span>Lessons completed</span>
                <span>{stats.today.lessons}</span>
              </li>
              <li>
                <span>Challenges solved</span>
                <span>{stats.today.challenges}</span>
              </li>
              <li>
                <span>Quizzes completed</span>
                <span>{stats.today.quizzes}</span>
              </li>
              <li>
                <span>Code runs</span>
                <span>{stats.today.runs}</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
