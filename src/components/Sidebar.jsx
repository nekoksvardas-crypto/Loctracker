export default function Sidebar() {
  const links = ['Dispatch Board', 'Fleet', 'Orders', 'Drivers', 'Analytics', 'Settings']
  return (
    <aside className="sidebar panel">
      <h2>Loctracker</h2>
      <nav>
        {links.map((item) => (
          <button key={item} className={`nav-btn ${item === 'Dispatch Board' ? 'active' : ''}`}>
            {item}
          </button>
        ))}
      </nav>
    </aside>
  )
}
