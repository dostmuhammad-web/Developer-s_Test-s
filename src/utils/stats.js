import { challenges } from '../data/challenges';
import { courses, totalLessons } from '../data/courses';
import { quizzes } from '../data/quizzes';
import { todayKey } from './storage';

export const formatDateKey = (date) => todayKey(date);

export const lastNDays = (n) => {
  const days = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    days.push(date);
  }
  return days;
};

export const shortDayLabel = (date) =>
  date.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3);

export const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value || 0);

export const formatRelative = (iso) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'Unknown date';
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const formatDate = (iso) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'Unknown';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const isActive = (entry) =>
  Boolean(entry) &&
  (entry.xp > 0 || entry.lessons > 0 || entry.challenges > 0 || entry.quizzes > 0 || entry.runs > 0);

export function computeStreak(activity) {
  let streak = 0;
  const cursor = new Date();
  const today = activity[todayKey(cursor)];
  if (!isActive(today)) {
    cursor.setDate(cursor.getDate() - 1);
    if (!isActive(activity[todayKey(cursor)])) return 0;
  }
  for (let i = 0; i < 3650; i += 1) {
    if (!isActive(activity[todayKey(cursor)])) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function courseProgress(state, course) {
  const completed = course.lessons.filter((lesson) => state.lessonsCompleted[lesson.id]).length;
  const total = course.lessons.length;
  return {
    completed,
    total,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
    finished: completed === total,
  };
}

export function nextLessonForCourse(state, course) {
  return course.lessons.find((lesson) => !state.lessonsCompleted[lesson.id]) || null;
}

export function nextLessonOverall(state) {
  for (const course of courses) {
    const lesson = nextLessonForCourse(state, course);
    if (lesson) return { course, lesson };
  }
  const course = courses[0];
  return { course, lesson: course.lessons[course.lessons.length - 1], allDone: true };
}

export function inProgressCourse(state) {
  const started = courses.filter(
    (course) =>
      course.lessons.some((lesson) => state.lessonsCompleted[lesson.id]) &&
      course.lessons.some((lesson) => !state.lessonsCompleted[lesson.id])
  );
  if (started.length > 0) {
    const course = started[0];
    return { course, lesson: nextLessonForCourse(state, course) };
  }
  const next = nextLessonOverall(state);
  if (next.allDone) return null;
  return { course: next.course, lesson: next.lesson, notStarted: true };
}

export function computeStats(state) {
  const lessonsCompleted = Object.keys(state.lessonsCompleted).length;
  const solvedChallenges = Object.keys(state.solvedChallenges).length;
  const projectsCount = state.projects.length;
  const quizResults = state.quizResults;
  const quizResultsCount = quizResults.length;
  const avgQuizPercent =
    quizResultsCount === 0
      ? 0
      : Math.round(quizResults.reduce((sum, result) => sum + result.percent, 0) / quizResultsCount);
  const bestQuizPercent = quizResults.reduce((best, result) => Math.max(best, result.percent), 0);
  const uniqueQuizzes = new Set(quizResults.map((result) => result.quizId)).size;
  const daysActive = Object.values(state.activity).filter(isActive).length;
  const streak = computeStreak(state.activity);

  const solvedByDifficulty = { Easy: 0, Medium: 0, Hard: 0 };
  challenges.forEach((challenge) => {
    if (state.solvedChallenges[challenge.id]) solvedByDifficulty[challenge.difficulty] += 1;
  });

  const completedCourseIds = courses
    .filter((course) => course.lessons.every((lesson) => state.lessonsCompleted[lesson.id]))
    .map((course) => course.id);

  const weekly = lastNDays(7).map((date) => {
    const key = todayKey(date);
    return {
      key,
      date,
      label: shortDayLabel(date),
      xp: state.activity[key]?.xp || 0,
    };
  });

  const daily = lastNDays(14).map((date) => {
    const key = todayKey(date);
    const entry = state.activity[key] || {};
    return {
      key,
      date,
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      shortLabel: String(date.getDate()),
      xp: entry.xp || 0,
      lessons: entry.lessons || 0,
      challenges: entry.challenges || 0,
      quizzes: entry.quizzes || 0,
      runs: entry.runs || 0,
      active: isActive(entry),
    };
  });

  const today = state.activity[todayKey()] || {
    xp: 0,
    lessons: 0,
    challenges: 0,
    quizzes: 0,
    runs: 0,
  };

  return {
    lessonsCompleted,
    totalLessons,
    solvedChallenges,
    totalChallenges: challenges.length,
    projectsCount,
    quizResultsCount,
    uniqueQuizzes,
    totalQuizzes: quizzes.length,
    avgQuizPercent,
    bestQuizPercent,
    daysActive,
    streak,
    xp: state.xp,
    codeRuns: state.stats.codeRuns,
    solvedByDifficulty,
    completedCourseIds,
    weekly,
    weeklyXp: weekly.reduce((sum, day) => sum + day.xp, 0),
    daily,
    today,
    dailyGoal: state.settings.dailyGoal,
    dailyGoalPercent: Math.min(
      100,
      Math.round(((today.xp || 0) / Math.max(1, state.settings.dailyGoal)) * 100)
    ),
  };
}

export function weeklyActivitySeries(state, weeks = 6) {
  const series = [];
  const now = new Date();
  for (let i = weeks - 1; i >= 0; i -= 1) {
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i * 7);
    let total = 0;
    for (let d = 0; d < 7; d += 1) {
      const date = new Date(end.getFullYear(), end.getMonth(), end.getDate() - d);
      total += state.activity[todayKey(date)]?.xp || 0;
    }
    series.push({
      label: `W${weeks - i}`,
      xp: total,
      start: new Date(end.getFullYear(), end.getMonth(), end.getDate() - 6),
    });
  }
  return series;
}

export function recentActivity(state, limit = 6) {
  const items = [];
  Object.entries(state.lessonsCompleted).forEach(([lessonId, date]) => {
    items.push({ type: 'lesson', id: lessonId, date });
  });
  Object.entries(state.solvedChallenges).forEach(([challengeId, value]) => {
    items.push({ type: 'challenge', id: challengeId, date: value.completedAt });
  });
  state.quizResults.forEach((result) => {
    items.push({
      type: 'quiz',
      id: result.quizId,
      date: result.date,
      percent: result.percent,
    });
  });
  state.projects.forEach((project) => {
    items.push({ type: 'project', id: project.id, date: project.createdAt, name: project.name });
  });
  return items
    .filter((item) => !Number.isNaN(new Date(item.date).getTime()))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}
