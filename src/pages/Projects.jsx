import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';
import Icon from '../components/common/Icon';
import Modal from '../components/common/Modal';
import ProjectCard from '../components/projects/ProjectCard';
import CodePreview from '../components/editor/CodePreview';
import { useAppData } from '../hooks/useAppData';
import { useToast } from '../hooks/useToast';

const sortOptions = [
  { id: 'updated', label: 'Recently edited' },
  { id: 'created', label: 'Newest first' },
  { id: 'name', label: 'Name A–Z' },
];

export default function Projects() {
  const { state, createProject, duplicateProject, deleteProject } = useAppData();
  const { pushToast } = useToast();
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('updated');
  const [preview, setPreview] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const projects = useMemo(() => {
    const term = query.trim().toLowerCase();
    let list = state.projects.filter((project) => {
      if (!term) return true;
      return (
        project.name.toLowerCase().includes(term) ||
        (project.description || '').toLowerCase().includes(term)
      );
    });
    list.sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'created') return new Date(b.createdAt) - new Date(a.createdAt);
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
    return list;
  }, [state.projects, query, sort]);

  const handleCreate = () => {
    if (!name.trim()) {
      setError('Give your project a name.');
      return;
    }
    const project = createProject({
      name,
      description,
      html: '<h1>New project</h1>\n<p>Start building here.</p>',
      css: 'body { font-family: system-ui, sans-serif; background: #0f1220; color: #e7e9f3; padding: 32px; }\n',
      js: '',
    });
    setCreateOpen(false);
    setName('');
    setDescription('');
    setError('');
    pushToast({ title: 'Project created', message: `“${project.name}” is ready to edit.`, type: 'success' });
    navigate(`/projects/${project.id}`);
  };

  const handleDuplicate = (id) => {
    const copy = duplicateProject(id);
    if (copy) {
      pushToast({ title: 'Project duplicated', message: `Created “${copy.name}”.`, type: 'success' });
      navigate(`/projects/${copy.id}`);
    }
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteProject(deleteTarget.id);
    pushToast({
      title: 'Project deleted',
      message: `“${deleteTarget.name}” was removed from your workspace.`,
      type: 'warning',
    });
    setDeleteTarget(null);
  };

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Workspace</p>
          <h1>Projects</h1>
          <p className="page-description">
            Save HTML, CSS, and JavaScript projects to localStorage. Edit them later, duplicate, preview, or
            delete them with confirmation.
          </p>
        </div>
        <button type="button" className="btn btn--primary" onClick={() => setCreateOpen(true)}>
          <Icon name="plus" size={15} />
          New project
        </button>
      </header>

      <div className="filter-bar">
        <div className="filter-search filter-search--wide">
          <Icon name="search" size={16} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects by name or description"
            aria-label="Search projects"
          />
        </div>
        <label className="select-field select-field--compact">
          <span>Sort</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <span className="filter-count">
          {projects.length} project{projects.length === 1 ? '' : 's'}
        </span>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon="projects"
          title={query ? 'No projects match your search' : 'No projects yet'}
          description={
            query
              ? 'Try a different name or clear the search.'
              : 'Create your first project to save ideas and build reusable snippets.'
          }
          action={
            query ? (
              <button type="button" className="btn btn--soft" onClick={() => setQuery('')}>
                Clear search
              </button>
            ) : (
              <button type="button" className="btn btn--primary" onClick={() => setCreateOpen(true)}>
                <Icon name="plus" size={15} />
                Create project
              </button>
            )
          }
        />
      ) : (
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onPreview={() => setPreview(project)}
              onDuplicate={() => handleDuplicate(project.id)}
              onDelete={() => setDeleteTarget(project)}
            />
          ))}
        </div>
      )}

      <Modal
        open={createOpen}
        onClose={() => {
          setCreateOpen(false);
          setError('');
        }}
        title="Create a new project"
        size="sm"
        footer={
          <>
            <button type="button" className="btn btn--ghost" onClick={() => setCreateOpen(false)}>
              Cancel
            </button>
            <button type="button" className="btn btn--primary" onClick={handleCreate}>
              <Icon name="plus" size={15} />
              Create and edit
            </button>
          </>
        }
      >
        <div className="field">
          <label htmlFor="new-project-name">Project name</label>
          <input
            id="new-project-name"
            type="text"
            value={name}
            maxLength={80}
            onChange={(event) => {
              setName(event.target.value);
              if (error) setError('');
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'new-project-error' : undefined}
            autoFocus
          />
          {error ? (
            <p id="new-project-error" className="field__error" role="alert">
              {error}
            </p>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="new-project-desc">
            Description <span className="optional">(optional)</span>
          </label>
          <textarea
            id="new-project-desc"
            rows={3}
            maxLength={300}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="What are you building?"
          />
        </div>
      </Modal>

      <Modal
        open={Boolean(preview)}
        onClose={() => setPreview(null)}
        title={preview ? preview.name : 'Project preview'}
        size="xl"
      >
        {preview ? (
          <div className="preview-modal">
            <CodePreview
              html={preview.html}
              css={preview.css}
              js={preview.js}
              runToken={preview.id}
              title="Saved project preview"
            />
            {preview.description ? <p className="muted">{preview.description}</p> : null}
          </div>
        ) : null}
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete this project?"
        description={
          deleteTarget
            ? `“${deleteTarget.name}” will be permanently removed from this browser. This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete project"
        tone="danger"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
