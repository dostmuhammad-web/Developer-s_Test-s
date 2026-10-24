import { useEffect, useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { basicFormat } from '../../utils/preview';
import ConfirmDialog from '../common/ConfirmDialog';
import Icon from '../common/Icon';
import CodeEditor from './CodeEditor';
import CodePreview from './CodePreview';
import ConsolePanel from './ConsolePanel';

export default function CodeWorkspace({
  html,
  css,
  js,
  setCode,
  onRun,
  onReset,
  onSave,
  saveLabel = 'Save project',
  fontSize = 14,
  onFontSize,
  previewTitle = 'Preview',
  resetSignal = 0,
}) {
  const { pushToast } = useToast();
  const [activeTab, setActiveTab] = useState('html');
  const [executed, setExecuted] = useState({ html, css, js });
  const [runToken, setRunToken] = useState(0);
  const [consoleEntries, setConsoleEntries] = useState([]);
  const [fullscreen, setFullscreen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    setExecuted({ html, css, js });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSignal]);

  useEffect(() => {
    if (!fullscreen) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setFullscreen(false);
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [fullscreen]);

  const run = () => {
    setExecuted({ html, css, js });
    setConsoleEntries([]);
    setRunToken((value) => value + 1);
    setActiveTab('preview');
    if (onRun) onRun();
  };

  const handleConsole = (entry) => {
    setConsoleEntries((current) => [
      ...current.slice(-49),
      { ...entry, time: Date.now() },
    ]);
  };

  const tidy = () => {
    setCode('html', basicFormat(html));
    setCode('css', basicFormat(css));
    setCode('js', basicFormat(js));
    pushToast({ title: 'Code tidied', message: 'Trailing whitespace and extra blank lines were removed.', type: 'success' });
  };

  const changeFont = (delta) => {
    if (!onFontSize) return;
    const next = Math.min(22, Math.max(11, fontSize + delta));
    onFontSize(next);
  };

  const tabs = [
    { id: 'html', label: 'HTML' },
    { id: 'css', label: 'CSS' },
    { id: 'js', label: 'JS' },
    { id: 'preview', label: 'Preview' },
  ];

  return (
    <div className={`workspace ${fullscreen ? 'workspace--fullscreen' : ''}`.trim()}>
      <div className="workspace__toolbar">
        <div className="workspace__toolbar-main">
          <button type="button" className="btn btn--primary btn--sm" onClick={run}>
            <Icon name="play" size={15} />
            Run
          </button>
          {onSave ? (
            <button type="button" className="btn btn--soft btn--sm" onClick={() => onSave({ html, css, js })}>
              <Icon name="save" size={15} />
              {saveLabel}
            </button>
          ) : null}
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => setConfirmReset(true)}>
            <Icon name="reset" size={15} />
            Reset
          </button>
          <button type="button" className="btn btn--ghost btn--sm" onClick={tidy}>
            <Icon name="sparkles" size={15} />
            Tidy
          </button>
        </div>
        <div className="workspace__toolbar-side">
          <div className="font-control" role="group" aria-label="Editor font size">
            <button
              type="button"
              className="icon-button icon-button--sm"
              onClick={() => changeFont(-1)}
              aria-label="Decrease editor font size"
              disabled={!onFontSize || fontSize <= 11}
            >
              A−
            </button>
            <span aria-live="polite">{fontSize}px</span>
            <button
              type="button"
              className="icon-button icon-button--sm"
              onClick={() => changeFont(1)}
              aria-label="Increase editor font size"
              disabled={!onFontSize || fontSize >= 22}
            >
              A+
            </button>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={() => setFullscreen((value) => !value)}
            aria-label={fullscreen ? 'Exit fullscreen editor' : 'Open fullscreen editor'}
            aria-pressed={fullscreen}
            title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            <Icon name={fullscreen ? 'minimize' : 'maximize'} size={18} />
          </button>
        </div>
      </div>

      <div className="workspace__tabs" role="tablist" aria-label="Workspace panels">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`workspace__tab ${activeTab === tab.id ? 'is-active' : ''}`.trim()}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="workspace__body">
        <div className="workspace__editors">
          <div className={`workspace__pane ${activeTab === 'html' ? 'is-mobile-active' : ''}`.trim()}>
            <CodeEditor
              id="editor-html"
              label="HTML"
              language="html"
              value={html}
              onChange={(value) => setCode('html', value)}
              fontSize={fontSize}
              minHeight={190}
              onClear={() => setCode('html', '')}
            />
          </div>
          <div className={`workspace__pane ${activeTab === 'css' ? 'is-mobile-active' : ''}`.trim()}>
            <CodeEditor
              id="editor-css"
              label="CSS"
              language="css"
              value={css}
              onChange={(value) => setCode('css', value)}
              fontSize={fontSize}
              minHeight={190}
              onClear={() => setCode('css', '')}
            />
          </div>
          <div className={`workspace__pane ${activeTab === 'js' ? 'is-mobile-active' : ''}`.trim()}>
            <CodeEditor
              id="editor-js"
              label="JavaScript"
              language="js"
              value={js}
              onChange={(value) => setCode('js', value)}
              fontSize={fontSize}
              minHeight={190}
              onClear={() => setCode('js', '')}
            />
          </div>
        </div>
        <div className={`workspace__output workspace__pane ${activeTab === 'preview' ? 'is-mobile-active' : ''}`.trim()}>
          <CodePreview
            html={executed.html}
            css={executed.css}
            js={executed.js}
            runToken={runToken}
            onMessage={handleConsole}
            title={previewTitle}
          />
          <ConsolePanel entries={consoleEntries} onClear={() => setConsoleEntries([])} />
        </div>
      </div>

      <p className="workspace__note">
        Your code runs in an isolated iframe without same-origin access. It cannot read DEVVERSE data or
        localStorage. Press Run to refresh the preview.
      </p>

      <ConfirmDialog
        open={confirmReset}
        title="Reset this workspace?"
        description="The current HTML, CSS, and JavaScript will be replaced with the starter code. Saved projects are not affected."
        confirmLabel="Reset code"
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          onReset();
          setConfirmReset(false);
          setExecuted({ html: '', css: '', js: '' });
          setRunToken((value) => value + 1);
          setConsoleEntries([]);
          pushToast({ title: 'Workspace reset', message: 'Starter code has been restored.', type: 'info' });
        }}
      />
    </div>
  );
}
