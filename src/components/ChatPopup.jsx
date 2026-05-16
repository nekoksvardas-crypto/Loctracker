export default function ChatPopup({ isOpen, onClose }) {
  if (!isOpen) return null
  return (
    <aside className="chat-popup panel">
      <div className="chat-header"><strong>Dispatch Chat</strong><button onClick={onClose}>✕</button></div>
      <div className="chat-body">
        <p><b>Ops:</b> TR-609 delayed by 12 minutes.</p>
        <p><b>You:</b> Acknowledged. Re-optimizing next load.</p>
      </div>
      <input placeholder="Type message..." />
    </aside>
  )
}
