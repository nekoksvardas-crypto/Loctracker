export default function TopBar({ onOpenOrderModal, onToggleChat }) {
  return (
    <header className="topbar panel">
      <div>
        <h1>Dispatcher Workstation</h1>
        <p>Live visibility for fleet and order execution</p>
      </div>
      <div className="topbar-actions">
        <button className="btn secondary" onClick={onToggleChat}>Chat</button>
        <button className="btn primary" onClick={onOpenOrderModal}>+ Create Order</button>
      </div>
    </header>
  )
}
