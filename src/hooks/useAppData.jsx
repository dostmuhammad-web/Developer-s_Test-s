import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { achievements } from '../data/achievements';
import { challenges } from '../data/challenges';
import { computeStats } from '../utils/stats';
import {
  DEFAULT_STATE,
  SCHEMA_VERSION,
  createId,
  downloadJSON,
  loadState,
  sanitizeState,
  saveState,
  todayKey,
} from '../utils/storage';
import { useToast } from './useToast';

const AppDataContext = createContext(null);

const cloneDefault = () => {
  const next = JSON.parse(JSON.stringify(DEFAULT_STATE));
  next.joinedAt = new Date().toISOString();
  next.profile.joinedAt = new Date().toISOString();
  return next;
};

const bumpActivity = (activity, patch) => {
  const key = todayKey();
  const current = activity[key] || { xp: 0, lessons: 0, challenges: 0, quizzes: 0, runs: 0 };
  return {
    ...activity,
    [key]: {
      xp: current.xp + (patch.xp || 0),
      lessons: current.lessons + (patch.lessons || 0),
      challenges: current.challenges + (patch.challenges || 0),
      quizzes: current.quizzes + (patch.quizzes || 0),
      runs: current.runs + (patch.runs || 0),
    },
  };
};

export function AppDataProvider({ children }) {
  const initial = useMemo(() => loadState(), []);
  const [state, setState] = useState(initial.state);
  const [storageError, setStorageError] = useState(null);
  const { pushToast } = useToast();
  const errorShown = useRef(false);

  const stats = useMemo(() => computeStats(state), [state]);

  useEffect(() => {
    document.documentElement.dataset.theme = state.settings.theme;
    document.documentElement.style.colorScheme = state.settings.theme;
  }, [state.settings.theme]);

  useEffect(() => {
    const result = saveState(state);
    if (!result.ok) {
      setStorageError(result.message);
    } else {
      setStorageError(null);
    }
  }, [state]);

  useEffect(() => {
    if (initial.error && !errorShown.current) {
      errorShown.current = true;
      pushToast({
        title: 'Recovery mode',
        message: initial.error,
        type: 'warning',
        duration: 6000,
      });
    }
  }, [initial.error, pushToast]);

  useEffect(() => {
    const unlocked = achievements.filter(
      (achievement) =>
        !state.achievements[achievement.id] && achievement.progress(stats).percent >= 100
    );
    if (unlocked.length === 0) return;

    setState((prev) => {
      const additions = {};
      const now = new Date().toISOString();
      unlocked.forEach((achievement) => {
        if (!prev.achievements[achievement.id]) additions[achievement.id] = now;
      });
      if (Object.keys(additions).length === 0) return prev;
      return { ...prev, achievements: { ...prev.achievements, ...additions } };
    });

    if (state.settings.notifications) {
      unlocked.forEach((achievement) => {
        pushToast({
          title: 'Achievement unlocked',
          message: `${achievement.title} — ${achievement.description}`,
          type: 'achievement',
          duration: 5000,
        });
      });
    }
  }, [stats, state.achievements, state.settings.notifications, pushToast]);

  useEffect(() => {
    if (storageError) {
      pushToast({ title: 'Storage problem', message: storageError, type: 'error', duration: 6000 });
    }
  }, [storageError, pushToast]);

  const completeLesson = useCallback(
    (lessonId) => {
      if (!lessonId) return { ok: false, reason: 'missing' };
      let awarded = 0;
      setState((prev) => {
        if (prev.lessonsCompleted[lessonId]) return prev;
        awarded = 20;
        return {
          ...prev,
          xp: prev.xp + awarded,
          lessonsCompleted: {
            ...prev.lessonsCompleted,
            [lessonId]: new Date().toISOString(),
          },
          activity: bumpActivity(prev.activity, { xp: awarded, lessons: 1 }),
        };
      });
      return { ok: true, awarded: 20 };
    },
    []
  );

  const recordCodeRun = useCallback(() => {
    setState((prev) => ({
      ...prev,
      stats: { ...prev.stats, codeRuns: prev.stats.codeRuns + 1 },
      activity: bumpActivity(prev.activity, { runs: 1 }),
    }));
  }, []);

  const saveDraft = useCallback((draft) => {
    setState((prev) => ({ ...prev, codeDraft: { ...prev.codeDraft, ...draft } }));
  }, []);

  const solveChallenge = useCallback((challengeId) => {
    const challenge = challenges.find((item) => item.id === challengeId);
    if (!challenge) return { ok: false, awarded: 0 };
    let awarded = 0;
    let alreadySolved = false;
    setState((prev) => {
      if (prev.solvedChallenges[challengeId]) {
        alreadySolved = true;
        return prev;
      }
      awarded = challenge.xp;
      return {
        ...prev,
        xp: prev.xp + awarded,
        solvedChallenges: {
          ...prev.solvedChallenges,
          [challengeId]: { completedAt: new Date().toISOString() },
        },
        activity: bumpActivity(prev.activity, { xp: awarded, challenges: 1 }),
      };
    });
    return { ok: true, awarded: alreadySolved ? 0 : challenge.xp, alreadySolved };
  }, []);

  const submitQuiz = useCallback(
    ({ quizId, correct, total, percent }) => {
      const firstAttempt = !state.quizResults.some((result) => result.quizId === quizId);
      const xpEarned = firstAttempt ? (percent >= 90 ? 30 : percent >= 70 ? 20 : 10) : 0;
      const result = {
        id: createId(),
        quizId,
        correct,
        total,
        percent,
        date: new Date().toISOString(),
        xpEarned,
      };
      setState((prev) => ({
        ...prev,
        xp: prev.xp + xpEarned,
        quizResults: [result, ...prev.quizResults].slice(0, 200),
        activity: bumpActivity(prev.activity, { xp: xpEarned, quizzes: 1 }),
      }));
      return { ...result, firstAttempt };
    },
    [state.quizResults]
  );

  const createProject = useCallback((data) => {
    const now = new Date().toISOString();
    const project = {
      id: createId(),
      name: data.name.trim() || 'Untitled project',
      description: (data.description || '').trim(),
      html: data.html || '',
      css: data.css || '',
      js: data.js || '',
      createdAt: now,
      updatedAt: now,
    };
    setState((prev) => ({ ...prev, projects: [project, ...prev.projects] }));
    return project;
  }, []);

  const updateProject = useCallback((id, patch) => {
    setState((prev) => ({
      ...prev,
      projects: prev.projects.map((project) =>
        project.id === id
          ? { ...project, ...patch, id, updatedAt: new Date().toISOString() }
          : project
      ),
    }));
  }, []);

  const duplicateProject = useCallback((id) => {
    let copy = null;
    setState((prev) => {
      const project = prev.projects.find((item) => item.id === id);
      if (!project) return prev;
      const now = new Date().toISOString();
      copy = {
        ...project,
        id: createId(),
        name: `${project.name} (copy)`.slice(0, 80),
        createdAt: now,
        updatedAt: now,
      };
      return { ...prev, projects: [copy, ...prev.projects] };
    });
    return copy;
  }, []);

  const deleteProject = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      projects: prev.projects.filter((project) => project.id !== id),
    }));
  }, []);

  const updateSettings = useCallback((patch) => {
    setState((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }));
  }, []);

  const updateProfile = useCallback((patch) => {
    setState((prev) => ({ ...prev, profile: { ...prev.profile, ...patch } }));
  }, []);

  const exportData = useCallback(() => {
    downloadJSON({ ...state, version: SCHEMA_VERSION });
    pushToast({
      title: 'Export ready',
      message: 'Your DEVVERSE backup has been downloaded.',
      type: 'success',
    });
  }, [state, pushToast]);

  const importData = useCallback(
    (raw) => {
      const sanitized = sanitizeState(raw);
      if (!sanitized) {
        pushToast({
          title: 'Import failed',
          message: 'That file is not a valid DEVVERSE backup. Your current data was kept.',
          type: 'error',
          duration: 5000,
        });
        return { ok: false };
      }
      setState(sanitized);
      pushToast({
        title: 'Data imported',
        message: 'Your profile, progress, and projects have been restored.',
        type: 'success',
      });
      return { ok: true };
    },
    [pushToast]
  );

  const resetAll = useCallback(() => {
    setState(cloneDefault());
    pushToast({
      title: 'Workspace reset',
      message: 'All local progress and projects were cleared.',
      type: 'warning',
    });
  }, [pushToast]);

  const value = useMemo(
    () => ({
      state,
      stats,
      storageError,
      completeLesson,
      recordCodeRun,
      saveDraft,
      solveChallenge,
      submitQuiz,
      createProject,
      updateProject,
      duplicateProject,
      deleteProject,
      updateSettings,
      updateProfile,
      exportData,
      importData,
      resetAll,
    }),
    [
      state,
      stats,
      storageError,
      completeLesson,
      recordCodeRun,
      saveDraft,
      solveChallenge,
      submitQuiz,
      createProject,
      updateProject,
      duplicateProject,
      deleteProject,
      updateSettings,
      updateProfile,
      exportData,
      importData,
      resetAll,
    ]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) throw new Error('useAppData must be used within AppDataProvider');
  return context;
}
