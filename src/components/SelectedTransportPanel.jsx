export default function SelectedTransportPanel({ transport }) {
  if (!transport) return null
  return (
    <section className="panel">
      <div className="section-title">Selected Transport</div>
      <div className="details-grid">
        <div><strong>Unit:</strong> {transport.id}</div>
        <div><strong>Driver:</strong> {transport.driver}</div>
        <div><strong>Status:</strong> {transport.status}</div>
        <div><strong>Last Location:</strong> {transport.location}</div>
        <div><strong>ETA:</strong> {transport.eta}</div>
        <div><strong>Telemetry:</strong> Ready for API/WebSocket integration</div>
      </div>
    </section>
  )
}
