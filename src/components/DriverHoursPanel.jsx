export default function DriverHoursPanel({ hours }) {
  return (
    <section className="panel">
      <div className="section-title">Driver Hours</div>
      {hours.map((item) => (
        <div key={item.driver} className="hours-row">
          <span>{item.driver}</span>
          <div className="progress"><div style={{ width: `${(item.used / 11) * 100}%` }} /></div>
          <small>{item.remaining.toFixed(1)}h left</small>
        </div>
      ))}
    </section>
  )
}
