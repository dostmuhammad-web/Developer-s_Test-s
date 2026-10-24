import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Icon from '../components/common/Icon';
import UserAvatar from '../components/common/UserAvatar';
import { useAppData } from '../hooks/useAppData';
import { useToast } from '../hooks/useToast';
import { levelProgress } from '../utils/xp';

const avatarColors = [
  '#7c5cff',
  '#38bdf8',
  '#34d399',
  '#f59e0b',
  '#f472b6',
  '#fb923c',
  '#a78bfa',
  '#2dd4bf',
];

export default function Settings() {
  const { state, updateProfile, updateSettings, exportData, importData, resetAll } = useAppData();
  const { pushToast } = useToast();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [name, setName] = useState(state.profile.name);
  const [nameError, setNameError] = useState('');
  const [resetOpen, setResetOpen] = useState(false);
  const progress = levelProgress(state.xp);

  const saveProfile = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setNameError('Your name cannot be empty.');
      return;
    }
    updateProfile({ name: trimmed });
    setNameError('');
    pushToast({ title: 'Profile updated', message: 'Your display name has been saved.', type: 'success' });
  };

  const onFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        importData(parsed);
      } catch (error) {
        pushToast({
          title: 'Import failed',
          message: 'That file could not be read as JSON.',
          type: 'error',
        });
      }
      if (fileRef.current) fileRef.current.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Preferences</p>
          <h1>Settings</h1>
          <p className="page-description">
            Control your profile, appearance, editor behavior, goals, and local data. Everything is stored in
            this browser only.
          </p>
        </div>
      </header>

      <div className="settings-grid">
        <section className="panel">
          <div className="panel__header">
            <div>
              <p className="panel__eyebrow">Profile</p>
              <h2>About you</h2>
            </div>
          </div>
          <div className="settings-row">
            <UserAvatar name={state.profile.name} color={state.profile.avatarColor} size={56} />
            <div className="settings-row__body">
              <p className="settings-row__title">{state.profile.name}</p>
              <p className="muted small">
                Level {progress.level} · {state.xp} XP · Joined{' '}
                {new Date(state.profile.joinedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
          <div className="field">
            <label htmlFor="display-name">Display name</label>
            <input
              id="display-name"
              type="text"
              value={name}
              maxLength={40}
              onChange={(event) => {
                setName(event.target.value);
                if (nameError) setNameError('');
              }}
              aria-invalid={Boolean(nameError)}
              aria-describedby={nameError ? 'name-error' : undefined}
            />
            {nameError ? (
              <p id="name-error" className="field__error" role="alert">
                {nameError}
              </p>
            ) : null}
          </div>
          <div className="field">
            <label>Avatar color</label>
            <div className="color-grid" role="radiogroup" aria-label="Avatar color">
              {avatarColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`color-swatch ${state.profile.avatarColor === color ? 'is-active' : ''}`.trim()}
                  style={{ background: color }}
                  onClick={() => updateProfile({ avatarColor: color })}
                  aria-pressed={state.profile.avatarColor === color}
                  aria-label={`Use ${color} avatar color`}
                />
              ))}
            </div>
          </div>
          <div className="panel__actions">
            <button type="button" className="btn btn--primary btn--sm" onClick={saveProfile}>
              Save profile
            </button>
          </div>
        </section>

        <section className="panel">
          <div className="panel__header">
            <div>
              <p className="panel__eyebrow">Appearance</p>
              <h2>Theme & editor</h2>
            </div>
          </div>
          <div className="settings-list">
            <div className="settings-list__item">
              <div>
                <p className="settings-list__title">Theme</p>
                <p className="muted small">Dark mode is the default for a focused coding experience.</p>
              </div>
              <div className="segmented">
                <button
                  type="button"
                  className={`segmented__item ${state.settings.theme === 'dark' ? 'is-active' : ''}`.trim()}
                  onClick={() => updateSettings({ theme: 'dark' })}
                  aria-pressed={state.settings.theme === 'dark'}
                >
                  Dark
                </button>
                <button
                  type="button"
                  className={`segmented__item ${state.settings.theme === 'light' ? 'is-active' : ''}`.trim()}
                  onClick={() => updateSettings({ theme: 'light' })}
                  aria-pressed={state.settings.theme === 'light'}
                >
                  Light
                </button>
              </div>
            </div>
            <div className="settings-list__item">
              <div>
                <p className="settings-list__title">Editor font size</p>
                <p className="muted small">Applies to Code Lab and the challenge editor.</p>
              </div>
              <div className="font-control font-control--inline">
                <input
                  type="range"
                  min="11"
                  max="22"
                  value={state.settings.editorFontSize}
                  onChange={(event) => updateSettings({ editorFontSize: Number(event.target.value) })}
                  aria-label="Editor font size"
                />
                <span>{state.settings.editorFontSize}px</span>
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel__header">
            <div>
              <p className="panel__eyebrow">Goals & notifications</p>
              <h2>Motivation</h2>
            </div>
          </div>
          <div className="field">
            <label htmlFor="daily-goal">Daily learning goal (XP)</label>
            <input
              id="daily-goal"
              type="range"
              min="10"
              max="150"
              step="10"
              value={state.settings.dailyGoal}
              onChange={(event) => updateSettings({ dailyGoal: Number(event.target.value) })}
            />
            <div className="range-meta">
              <span>10 XP</span>
              <strong>{state.settings.dailyGoal} XP</strong>
              <span>150 XP</span>
            </div>
            <p className="field__hint">Used for the dashboard daily goals and statistics.</p>
          </div>
          <div className="settings-list">
            <div className="settings-list__item">
              <div>
                <p className="settings-list__title">In-app notifications</p>
                <p className="muted small">Show toasts for achievements and important actions.</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={state.settings.notifications}
                  onChange={(event) => updateSettings({ notifications: event.target.checked })}
                />
                <span className="toggle__track" aria-hidden="true" />
                <span className="sr-only">Toggle notifications</span>
              </label>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel__header">
            <div>
              <p className="panel__eyebrow">Data</p>
              <h2>Export, import & reset</h2>
            </div>
          </div>
          <div className="settings-list">
            <div className="settings-list__item">
              <div>
                <p className="settings-list__title">Export backup</p>
                <p className="muted small">
                  Download a JSON file with your profile, progress, projects, settings, and activity.
                </p>
              </div>
              <button type="button" className="btn btn--soft btn--sm" onClick={exportData}>
                <Icon name="download" size={15} />
                Export JSON
              </button>
            </div>
            <div className="settings-list__item">
              <div>
                <p className="settings-list__title">Import backup</p>
                <p className="muted small">Restore from a previously exported DEVVERSE backup. Existing data will be replaced with the imported version.</p>
              </div>
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => fileRef.current?.click()}>
                <Icon name="upload" size={15} />
                Import JSON
              </button>
              <input ref={fileRef} type="file" accept="application/json" onChange={onFileChange} hidden />
            </div>
            <div className="settings-list__item settings-list__item--danger">
              <div>
                <p className="settings-list__title">Reset all data</p>
                <p className="muted small">
                  Delete all local progress, projects, achievements, settings, and activity. This cannot be
                  undone.
                </p>
              </div>
              <button type="button" className="btn btn--danger btn--sm" onClick={() => setResetOpen(true)}>
                <Icon name="trash" size={15} />
                Reset workspace
              </button>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel__header">
            <div>
              <p className="panel__eyebrow">About</p>
              <h2>DEVVERSE</h2>
            </div>
          </div>
          <p>
            Professional interactive developer learning platform built with React, JavaScript, JSX, and plain
            CSS. All data stays local via localStorage. No backend, no accounts, no third-party auth.
          </p>
          <div className="about-grid">
            <div>
              <span className="about-grid__label">Stack</span>
              <span>React 18 · React Router · Vite</span>
            </div>
            <div>
              <span className="about-grid__label">Storage</span>
              <span>localStorage (sanitized)</span>
            </div>
            <div>
              <span className="about-grid__label">Code execution</span>
              <span>Sandboxed iframe + isolated Web Worker</span>
            </div>
            <div>
              <span className="about-grid__label">Responsive</span>
              <span>320px to 1440px+</span>
            </div>
          </div>
          <div className="panel__actions">
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => navigate('/code-lab')}>
              Try Code Lab
            </button>
          </div>
        </section>
      </div>

      <ConfirmDialog
        open={resetOpen}
        title="Reset the entire workspace?"
        description="This will remove your profile, lessons, challenges, quizzes, projects, achievements, XP, activity history, and settings from this browser. You can export a backup first."
        confirmLabel="Reset everything"
        onCancel={() => setResetOpen(false)}
        onConfirm={() => {
          resetAll();
          setResetOpen(false);
          setName(state.profile.name);
          navigate('/');
        }}
      />
    </div>
  );
}
