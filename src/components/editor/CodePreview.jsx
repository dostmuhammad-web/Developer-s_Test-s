import { useEffect, useMemo, useRef } from 'react';
import { makePreviewDoc } from '../../utils/preview';
import Icon from '../common/Icon';

export default function CodePreview({ html, css, js, runToken = 0, onMessage, title = 'Preview' }) {
  const iframeRef = useRef(null);
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  const { doc, token } = useMemo(
    () => makePreviewDoc({ html, css, js }),
    // runToken intentionally triggers a rebuild for every explicit run
    [html, css, js, runToken]
  );

  useEffect(() => {
    const listener = (event) => {
      if (!event.data || event.data.__devverse !== token) return;
      if (iframeRef.current && event.source !== iframeRef.current.contentWindow) return;
      const message = Array.isArray(event.data.args) ? event.data.args.join(' ') : String(event.data.args);
      if (onMessageRef.current) {
        onMessageRef.current({ type: event.data.type || 'log', message });
      }
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, [token]);

  return (
    <section className="preview" aria-label="Code preview">
      <header className="preview__header">
        <span>
          <Icon name="eye" size={15} />
          {title}
        </span>
        <span className="preview__hint">Sandboxed iframe</span>
      </header>
      <div className="preview__frame-wrap">
        <iframe
          ref={iframeRef}
          title="Code preview"
          className="preview__frame"
          sandbox="allow-scripts allow-forms"
          srcDoc={doc}
          referrerPolicy="no-referrer"
        />
      </div>
    </section>
  );
}
