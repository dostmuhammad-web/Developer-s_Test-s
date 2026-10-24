import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmptyState from '../components/common/EmptyState';
import Icon from '../components/common/Icon';
import Modal from '../components/common/Modal';
import CodeWorkspace from '../components/editor/CodeWorkspace';
import { useAppData } from '../hooks/useAppData';
import { useToast } from '../hooks/useToast';
import { formatRelative } from '../utils/stats';

export default function ProjectEditor() {
  const { projectId } = useParams();
  const { state, updateProject, duplicateProject } = useAppData();
  const { pushToast } = useToast();
  const navigate = useNavigate();
  const project = state.projects.find((item) => item.id === projectId);

  const [html, setHtml] = useState(project ? project.html : '');
  const [css, setCss] = useState(project ? project.css : '');
  const [js, setJs] = useState(project ? project.js : '');
  const [resetSignal, setResetSignal] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);
  const [name, setName] = useState(project ? project.name : '');
  const [description, setDescription] = useState(project ? project.description : '');

  useEffect(() => {
    if (!project) return;
    setHtml(project.html);
    setCss(project.css);
    setJs(project.js);
    setName(project.name);
    setDescription(project.description);
    setResetSignal((value) => value + 1);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const timer = window.setTimeout(() => {
      updateProject(project.id, { html, css, js });
    }, 900);
    return () => window.clearTimeout(timer);
  }, [html, css, js, project, updateProject]);

  if (!project) {
    return (
      <div className="page">
        <EmptyState
          icon="projects"
          title="Project not found"
          description="This saved project does not exist in this browser."
          action={
            <button type="button" className="btn btn--primary" onClick={() => navigate('/projects')}>
              Back to projects
            </button>
          }
        />
      </div>
    );
  }

  const setCode = (key, value) => {
    if (key === 'html') setHtml(value);
    if (key === 'css') setCss(value);
    if (key === 'js') setJs(value);
  };

  const handleReset = () => {
    setHtml(project.html);
    setCss(project.css);
    setJs(project.js);
    setResetSignal((value) => value + 1);
    pushToast({ title: 'Reverted to saved version', message: 'The editor now matches the last saved copy of this project.', type: 'info' });
  };

  const saveMeta = () => {
    updateProject(project.id, { name: name.trim() || 'Untitled project', description: description.trim() });
    setInfoOpen(false);
    pushToast({ title: 'Project updated', message: 'Name and description have been saved.', type: 'success' });
  };

  const duplicate = () => {
    const copy = duplicateProject(project.id);
    if (copy) {
      pushToast({ title: 'Project duplicated', message: `Opened “${copy.name}”.`, type: 'success' });
      navigate(`/projects/${copy.id}`);
    }
  };

  return (
    <div className="page lab-page">
      <header className="page-header project-editor-header">
        <div>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <button type="button" className="breadcrumbs__button" onClick={() => navigate('/projects')}>
              Projects
            </button>
            <Icon name="chevronRight" size={13} />
            <span aria-current="page">{project.name}</span>
          </nav>
          <h1>{project.name}</h1>
          <p className="page-description">
            {project.description || 'Add a description so you remember what this project explores.'}
          </p>
          <div className="project-editor-meta">
            <span>
              <Icon name="clock" size={14} /> Edited {formatRelative(project.updatedAt)}
            </span>
            <span>Created {formatRelative(project.createdAt)}</span>
          </div>
        </div>
        <div className="project-editor-actions">
          <button type="button" className="btn btn--soft btn--sm" onClick={() => setInfoOpen(true)}>
            <Icon name="edit" size={15} />
            Edit details
          </button>
          <button type="button" className="btn btn--ghost btn--sm" onClick={duplicate}>
            <Icon name="copy" size={15} />
            Duplicate
          </button>
        </div>
      </header>

      <CodeWorkspace
        html={html}
        css={css}
        js={js}
        setCode={setCode}
        onRun={() => {}}
        onReset={handleReset}
        onSave={() => {
          updateProject(project.id, { html, css, js });
          pushToast({ title: 'Project saved', message: 'Current code has been saved to your project.', type: 'success' });
        }}
        saveLabel="Save now"
        fontSize={state.settings.editorFontSize}
        onFontSize={(value) => updateSettings({ editorFontSize: value })}
        previewTitle="Project preview"
        resetSignal={resetSignal}
      />

      <p className="workspace__note">
        Changes auto-save every ~900ms. Use Save now to force an immediate save. Reset restores the code to the
        version last saved in this project.
      </p>

      <Modal
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        title="Project details"
        size="sm"
        footer={
          <>
            <button type="button" className="btn btn--ghost" onClick={() => setInfoOpen(false)}>
              Cancel
            </button>
            <button type="button" className="btn btn--primary" onClick={saveMeta}>
              Save details
            </button>
          </>
        }
      >
        <div className="field">
          <label htmlFor="project-edit-name">Project name</label>
          <input
            id="project-edit-name"
            type="text"
            value={name}
            maxLength={80}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="project-edit-desc">
            Description <span className="optional">(optional)</span>
          </label>
          <textarea
            id="project-edit-desc"
            rows={4}
            maxLength={300}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe this project..."
          />
        </div>
      </Modal>
    </div>
  );
}
