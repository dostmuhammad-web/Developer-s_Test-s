import Icon from '../common/Icon';
import { formatRelative } from '../../utils/stats';

export default function ProjectCard({ project, onPreview, onDuplicate, onDelete }) {
  return (
    <article className="project-card">
      <div className="project-card__thumb" aria-hidden="true">
        <span className="project-card__thumb-icon">
          <Icon name="code" size={26} />
        </span>
        <span className="project-card__thumb-lines">
          <span />
          <span />
          <span />
        </span>
      </div>
      <div className="project-card__body">
        <div className="project-card__title-row">
          <h2>{project.name}</h2>
        </div>
        <p className="project-card__description">
          {project.description || 'No description yet. Open the editor to add details.'}
        </p>
        <div className="project-card__meta">
          <span>
            <Icon name="clock" size={13} /> Edited {formatRelative(project.updatedAt)}
          </span>
          <span>Created {formatRelative(project.createdAt)}</span>
        </div>
        <div className="project-card__actions">
          <a href={`/projects/${project.id}`} className="btn btn--primary btn--sm" onClick={(event) => {
            event.preventDefault();
            window.history.pushState({}, '', `/projects/${project.id}`);
            window.dispatchEvent(new PopStateEvent('popstate'));
          }}>
            Open editor
          </a>
          <button type="button" className="btn btn--ghost btn--sm" onClick={onPreview}>
            <Icon name="eye" size={14} />
            Preview
          </button>
          <button
            type="button"
            className="icon-button"
            onClick={onDuplicate}
            aria-label={`Duplicate ${project.name}`}
            title="Duplicate"
          >
            <Icon name="copy" size={16} />
          </button>
          <button
            type="button"
            className="icon-button icon-button--danger"
            onClick={onDelete}
            aria-label={`Delete ${project.name}`}
            title="Delete"
          >
            <Icon name="trash" size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
