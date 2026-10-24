import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/common/Icon';
import Modal from '../components/common/Modal';
import CodeWorkspace from '../components/editor/CodeWorkspace';
import { useAppData } from '../hooks/useAppData';
import { useToast } from '../hooks/useToast';
import { DEFAULT_STATE } from '../utils/storage';

export default function CodeLab() {
  const { state, recordCodeRun, saveDraft, updateSettings, createProject } = useAppData();
  const { pushToast } = useToast();
  const navigate = useNavigate();
  const [html, setHtml] = useState(state.codeDraft.html);
  const [css, setCss] = useState(state.codeDraft.css);
  const [js, setJs] = useState(state.codeDraft.js);
  const [resetSignal, setResetSignal] = useState(0);
  const [saveOpen, setSaveOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      saveDraft({ html, css, js });
    }, 800);
    return () => window.clearTimeout(timer);
  }, [html, css, js, saveDraft]);

  const setCode = (key, value) => {
    if (key === 'html') setHtml(value);
    if (key === 'css') setCss(value);
    if (key === 'js') setJs(value);
  };

  const handleRun = () => {
    recordCodeRun();
    if (state.stats.codeRuns === 0) {
      pushToast({
        title: 'Code executed',
        message: 'Preview runs in a sandbox. Console logs and errors appear below it.',
        type: 'success',
      });
    }
  };

  const handleReset = () => {
    setHtml(DEFAULT_STATE.codeDraft.html);
    setCss(DEFAULT_STATE.codeDraft.css);
    setJs(DEFAULT_STATE.codeDraft.js);
    setResetSignal((value) => value + 1);
  };

  const handleSave = ({ name, description }) => {
    if (!name.trim()) {
      setNameError('Give your project a name before saving.');
      return;
    }
    const project = createProject({ name, description, html, css, js });
    pushToast({
      title: 'Project saved',
      message: `“${project.name}” is now in your Projects workspace.`,
      type: 'success',
    });
    setSaveOpen(false);
    setProjectName('');
    setProjectDescription('');
    setNameError('');
  };

  return (
    <div className="page lab-page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Interactive playground</p>
          <h1>Code Lab</h1>
          <p className="page-description">
            Write HTML, CSS, and JavaScript side by side. Run your code in an isolated preview, inspect console
            output, and save the result as a project.
          </p>
        </div>
        <div className="page-header__stats">
          <span className="pill">
            <Icon name="lab" size={14} />
            {state.stats.codeRuns} runs
          </span>
          <span className="pill">
            <Icon name="folder" size={14} />
            {state.projects.length} saved projects
          </span>
        </div>
      </header>

      <CodeWorkspace
        html={html}
        css={css}
        js={js}
        setCode={setCode}
        onRun={handleRun}
        onReset={handleReset}
        onSave={({ html: savedHtml, css: savedCss, js: savedJs }) => {
          setHtml(savedHtml);
          setCss(savedCss);
          setJs(savedJs);
          setSaveOpen(true);
        }}
        saveLabel="Save project"
        fontSize={state.settings.editorFontSize}
        onFontSize={(value) => updateSettings({ editorFontSize: value })}
        previewTitle="Live preview"
        resetSignal={resetSignal}
      />

      <Modal
        open={saveOpen}
        onClose={() => {
          setSaveOpen(false);
          setNameError('');
        }}
        title="Save project"
        size="sm"
        footer={
          <>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                setSaveOpen(false);
                setNameError('');
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => handleSave({ name: projectName, description: projectDescription })}
            >
              <Icon name="save" size={15} />
              Save project
            </button>
          </>
        }
      >
        <div className="field">
          <label htmlFor="project-name">Project name</label>
          <input
            id="project-name"
            type="text"
            value={projectName}
            maxLength={80}
            onChange={(event) => {
              setProjectName(event.target.value);
              if (nameError) setNameError('');
            }}
            aria-invalid={Boolean(nameError)}
            aria-describedby={nameError ? 'project-name-error' : 'project-name-hint'}
            autoFocus
          />
          <p id="project-name-hint" className="field__hint">
            Choose something recognisable. You can rename it later.
          </p>
          {nameError ? (
            <p id="project-name-error" className="field__error" role="alert">
              {nameError}
            </p>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="project-description">Description <span className="optional">(optional)</span></label>
          <textarea
            id="project-description"
            rows={3}
            maxLength={300}
            value={projectDescription}
            onChange={(event) => setProjectDescription(event.target.value)}
            placeholder="What does this project demonstrate?"
          />
        </div>
        <p className="muted small">
          Saving stores the current HTML, CSS, and JavaScript in your browser. It does not publish anything
          online.
        </p>
      </Modal>

      <div className="lab-footer-links">
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={() => navigate('/projects')}
        >
          Manage projects <Icon name="arrowRight" size={14} />
        </button>
        <span className="muted small">
          Draft auto-saves locally after you stop typing.
        </span>
      </div>
    </div>
  );
}
