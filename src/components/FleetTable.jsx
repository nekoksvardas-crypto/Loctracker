export default function FleetTable({ fleet, selectedId, onSelect }) {
  return (
    <section className="panel">
      <div className="section-title">Fleet Monitoring</div>
      <table>
        <thead><tr><th>Unit</th><th>Driver</th><th>Status</th><th>Location</th><th>ETA</th></tr></thead>
        <tbody>
          {fleet.map((row) => (
            <tr key={row.id} className={selectedId === row.id ? 'selected' : ''} onClick={() => onSelect(row.id)}>
              <td>{row.id}</td><td>{row.driver}</td><td>{row.status}</td><td>{row.location}</td><td>{row.eta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
