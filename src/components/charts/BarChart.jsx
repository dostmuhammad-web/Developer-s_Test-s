export default function BarChart({
  data,
  valueKey = 'value',
  labelKey = 'label',
  height = 160,
  tone = 'brand',
  ariaLabel = 'Bar chart',
  formatValue = (value) => value,
}) {
  const values = data.map((item) => Number(item[valueKey]) || 0);
  const max = Math.max(...values, 1);
  const total = values.reduce((sum, value) => sum + value, 0);

  return (
    <div className={`bar-chart bar-chart--${tone}`} aria-label={ariaLabel} role="img">
      <div className="bar-chart__plot" style={{ height }}>
        {data.map((item, index) => {
          const value = Number(item[valueKey]) || 0;
          const percent = value === 0 ? 0 : Math.max(4, Math.round((value / max) * 100));
          return (
            <div className="bar-chart__column" key={`${item[labelKey]}-${index}`}>
              <span className="bar-chart__value">{value > 0 ? formatValue(value) : ''}</span>
              <div className="bar-chart__bar-wrap">
                <div
                  className="bar-chart__bar"
                  style={{ height: `${percent}%` }}
                  title={`${item[labelKey]}: ${formatValue(value)}`}
                />
              </div>
              <span className="bar-chart__label">{item[labelKey]}</span>
            </div>
          );
        })}
      </div>
      <p className="sr-only">
        {ariaLabel}. Total {total}. Values: {data.map((item) => `${item[labelKey]} ${item[valueKey]}`).join(', ')}.
      </p>
    </div>
  );
}
