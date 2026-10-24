export default function ChartCard({ title, subtitle, children, action, className = '' }) {
  return (
    <section className={`chart-card ${className}`.trim()}>
      <header className="chart-card__header">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {action ? <div className="chart-card__action">{action}</div> : null}
      </header>
      <div className="chart-card__body">{children}</div>
    </section>
  );
}
