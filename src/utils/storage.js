export const STORAGE_KEY = 'devverse.data.v1';
export const SCHEMA_VERSION = 1;

export const todayKey = (date = new Date()) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const emptyActivity = { xp: 0, lessons: 0, challenges: 0, quizzes: 0, runs: 0 };

export const createId = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

export const DEFAULT_STATE = {
  version: SCHEMA_VERSION,
  profile: {
    name: 'Alex Morgan',
    avatarColor: '#7c5cff',
    joinedAt: new Date().toISOString(),
  },
  settings: {
    theme: 'dark',
    editorFontSize: 14,
    dailyGoal: 50,
    notifications: true,
  },
  xp: 0,
  lessonsCompleted: {},
  solvedChallenges: {},
  quizResults: [],
  projects: [],
  achievements: {},
  activity: {},
  codeDraft: {
    html: '<div class="card">\n  <h1>Hello, DEVVERSE</h1>\n  <p>Edit the code and press Run.</p>\n  <button id="demo">Click me</button>\n</div>',
    css: 'body {\n  font-family: system-ui, sans-serif;\n  background: #0f1220;\n  color: #e7e9f3;\n  display: grid;\n  place-items: center;\n  min-height: 100vh;\n  margin: 0;\n}\n\n.card {\n  padding: 32px;\n  border: 1px solid #2a2f45;\n  border-radius: 16px;\n  text-align: center;\n}\n\nbutton {\n  padding: 10px 16px;\n  border-radius: 8px;\n  border: 0;\n  background: #7c5cff;\n  color: white;\n  cursor: pointer;\n}',
    js: 'const button = document.querySelector("#demo");\nbutton.addEventListener("click", () => {\n  console.log("Button clicked at", new Date().toLocaleTimeString());\n});',
  },
  stats: {
    codeRuns: 0,
  },
};

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const asString = (value, fallback, max = 5000) =>
  typeof value === 'string' ? value.slice(0, max) : fallback;

const asNumber = (value, fallback, min = 0, max = Number.MAX_SAFE_INTEGER) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
};

export function sanitizeState(raw) {
  const base = DEFAULT_STATE;
  if (!isObject(raw)) return null;

  const profile = isObject(raw.profile) ? raw.profile : {};
  const settings = isObject(raw.settings) ? raw.settings : {};
  const activity = {};
  if (isObject(raw.activity)) {
    Object.entries(raw.activity).forEach(([key, value]) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(key) || !isObject(value)) return;
      activity[key] = {
        xp: asNumber(value.xp, 0, 0, 1e7),
        lessons: asNumber(value.lessons, 0, 0, 1e5),
        challenges: asNumber(value.challenges, 0, 0, 1e5),
        quizzes: asNumber(value.quizzes, 0, 0, 1e5),
        runs: asNumber(value.runs, 0, 0, 1e6),
      };
    });
  }

  const lessonsCompleted = {};
  if (isObject(raw.lessonsCompleted)) {
    Object.entries(raw.lessonsCompleted).forEach(([key, value]) => {
      if (typeof key === 'string' && key.length < 100) {
        lessonsCompleted[key] = asString(value, new Date().toISOString(), 40);
      }
    });
  }

  const solvedChallenges = {};
  if (isObject(raw.solvedChallenges)) {
    Object.entries(raw.solvedChallenges).forEach(([key, value]) => {
      if (typeof key === 'string' && key.length < 100) {
        solvedChallenges[key] = {
          completedAt: isObject(value)
            ? asString(value.completedAt, new Date().toISOString(), 40)
            : new Date().toISOString(),
        };
      }
    });
  }

  const quizResults = Array.isArray(raw.quizResults)
    ? raw.quizResults
        .filter(isObject)
        .slice(0, 200)
        .map((result) => ({
          id: asString(result.id, createId(), 40),
          quizId: asString(result.quizId, '', 100),
          correct: asNumber(result.correct, 0, 0, 100),
          total: asNumber(result.total, 0, 0, 100),
          percent: asNumber(result.percent, 0, 0, 100),
          date: asString(result.date, new Date().toISOString(), 40),
          xpEarned: asNumber(result.xpEarned, 0, 0, 1000),
        }))
        .filter((result) => result.quizId)
    : [];

  const projects = Array.isArray(raw.projects)
    ? raw.projects
        .filter(isObject)
        .slice(0, 100)
        .map((project) => ({
          id: asString(project.id, createId(), 40),
          name: asString(project.name, 'Untitled project', 80),
          description: asString(project.description, '', 300),
          html: asString(project.html, '', 100000),
          css: asString(project.css, '', 100000),
          js: asString(project.js, '', 100000),
          createdAt: asString(project.createdAt, new Date().toISOString(), 40),
          updatedAt: asString(project.updatedAt, new Date().toISOString(), 40),
        }))
    : [];

  const achievements = {};
  if (isObject(raw.achievements)) {
    Object.entries(raw.achievements).forEach(([key, value]) => {
      if (typeof key === 'string') achievements[key] = asString(value, new Date().toISOString(), 40);
    });
  }

  const draft = isObject(raw.codeDraft) ? raw.codeDraft : {};
  const notificationValue = settings.notifications;

  return {
    version: SCHEMA_VERSION,
    profile: {
      name: asString(profile.name, base.profile.name, 40).trim() || base.profile.name,
      avatarColor: /^#[0-9a-fA-F]{6}$/.test(profile.avatarColor)
        ? profile.avatarColor
        : base.profile.avatarColor,
      joinedAt: asString(profile.joinedAt, base.profile.joinedAt, 40),
    },
    settings: {
      theme: settings.theme === 'light' ? 'light' : 'dark',
      editorFontSize: asNumber(settings.editorFontSize, 14, 11, 22),
      dailyGoal: asNumber(settings.dailyGoal, 50, 10, 1000),
      notifications: notificationValue === undefined ? true : Boolean(notificationValue),
    },
    xp: asNumber(raw.xp, 0, 0, 10000000),
    lessonsCompleted,
    solvedChallenges,
    quizResults,
    projects,
    achievements,
    activity,
    codeDraft: {
      html: asString(draft.html, base.codeDraft.html, 100000),
      css: asString(draft.css, base.codeDraft.css, 100000),
      js: asString(draft.js, base.codeDraft.js, 100000),
    },
    stats: {
      codeRuns: asNumber(isObject(raw.stats) ? raw.stats.codeRuns : 0, 0, 0, 1000000),
    },
  };
}

export function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { state: DEFAULT_STATE, error: null, fresh: true };
    const parsed = JSON.parse(raw);
    const sanitized = sanitizeState(parsed);
    if (!sanitized) {
      return {
        state: DEFAULT_STATE,
        error: 'Saved data had an invalid shape. A fresh profile was created.',
        fresh: true,
      };
    }
    return { state: sanitized, error: null, fresh: false };
  } catch (error) {
    return {
      state: DEFAULT_STATE,
      error: 'Saved data could not be read, so we started a fresh profile.',
      fresh: true,
    };
  }
}

export function saveState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message:
        error && error.name === 'QuotaExceededError'
          ? 'Storage is full. Delete a project or export your data first.'
          : 'Could not save to localStorage.',
    };
  }
}

export function downloadJSON(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `devverse-backup-${stamp}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
