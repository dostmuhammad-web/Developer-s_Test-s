import Icon from '../common/Icon';

export default function ConsolePanel({ entries, onClear }) {
  return (
    <section className="console" aria-label="Preview console">
      <header className="console__header">
        <span>
          Console
          {entries.length > 0 ? <span className="console__count">{entries.length}</span> : null}
        </span>
        <button
          type="button"
          className="icon-button icon-button--sm"
          onClick={onClear}
          aria-label="Clear console output"
          title="Clear console"
        >
          <Icon name="trash" size={15} />
        </button>
      </header>
      <div className="console__body" role="log" aria-live="polite">
        {entries.length === 0 ? (
          <p className="console__empty">Console output appears here after you run your code.</p>
        ) : (
          entries.map((entry, index) => (
            <div key={`${entry.time}-${index}`} className={`console__line console__line--${entry.type}`}>
              <span className="console__type">{entry.type}</span>
              <span className="console__message">{entry.message}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
