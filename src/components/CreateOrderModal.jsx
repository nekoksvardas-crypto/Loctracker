export default function CreateOrderModal({ isOpen, onClose }) {
  if (!isOpen) return null
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal panel" onClick={(e) => e.stopPropagation()}>
        <h3>Create Order</h3>
        <div className="form-grid">
          <input placeholder="Customer name" />
          <input placeholder="Pickup location" />
          <input placeholder="Dropoff location" />
          <select><option>Priority: Medium</option><option>Priority: High</option></select>
        </div>
        <div className="topbar-actions"><button className="btn secondary" onClick={onClose}>Cancel</button><button className="btn primary">Save</button></div>
      </div>
    </div>
  )
}
