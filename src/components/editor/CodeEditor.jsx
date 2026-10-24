import { useRef } from 'react';
import Icon from '../common/Icon';

export default function CodeEditor({
  id,
  label,
  language,
  value,
  onChange,
  fontSize = 14,
  minHeight = 220,
  onClear,
  actions,
}) {
  const textareaRef = useRef(null);
  const gutterRef = useRef(null);

  const handleTab = (event) => {
    if (event.key !== 'Tab') return;
    event.preventDefault();
    const textarea = event.currentTarget;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const next = `${value.slice(0, start)}  ${value.slice(end)}`;
    onChange(next);
    requestAnimationFrame(() => {
      textarea.selectionStart = start + 2;
      textarea.selectionEnd = start + 2;
    });
  };

  const handleScroll = (event) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = event.currentTarget.scrollTop;
    }
  };

  const lines = value.split('\n').length;

  return (
    <section className="code-editor" aria-label={`${label} editor`}>
      <header className="code-editor__header">
        <span className="code-editor__title">
          <span className={`code-dot code-dot--${language}`} aria-hidden="true" />
          {label}
          <span className="code-editor__lang">{language}</span>
        </span>
        <div className="code-editor__actions">
          {actions}
          {onClear ? (
            <button
              type="button"
              className="icon-button icon-button--sm"
              onClick={onClear}
              aria-label={`Clear ${label} code`}
              title="Clear"
            >
              <Icon name="trash" size={15} />
            </button>
          ) : null}
        </div>
      </header>
      <div className="code-editor__body" style={{ minHeight }}>
        <div className="code-editor__gutter" ref={gutterRef} aria-hidden="true">
          {Array.from({ length: lines }, (_, index) => (
            <span key={index}>{index + 1}</span>
          ))}
        </div>
        <textarea
          id={id}
          ref={textareaRef}
          className="code-editor__textarea"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleTab}
          onScroll={handleScroll}
          spellCheck="false"
          autoCapitalize="off"
          autoCorrect="off"
          wrap="off"
          aria-label={`${label} code`}
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
        />
      </div>
    </section>
  );
}
