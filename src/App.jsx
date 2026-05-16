import { useMemo, useState } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import MapPanel from './components/MapPanel'
import FleetTable from './components/FleetTable'
import SelectedTransportPanel from './components/SelectedTransportPanel'
import DriverHoursPanel from './components/DriverHoursPanel'
import OrdersTable from './components/OrdersTable'
import CreateOrderModal from './components/CreateOrderModal'
import ChatPopup from './components/ChatPopup'
import { driverHours, fleet, orders } from './data/mockData'

export default function App() {
  const [selectedId, setSelectedId] = useState(fleet[0].id)
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(true)

  const selectedTransport = useMemo(
    () => fleet.find((item) => item.id === selectedId),
    [selectedId],
  )

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="workspace">
        <TopBar onOpenOrderModal={() => setOrderModalOpen(true)} onToggleChat={() => setChatOpen((v) => !v)} />
        <div className="main-grid">
          <div className="left-column">
            <MapPanel />
            <FleetTable fleet={fleet} selectedId={selectedId} onSelect={setSelectedId} />
          </div>
          <div className="right-column">
            <SelectedTransportPanel transport={selectedTransport} />
            <DriverHoursPanel hours={driverHours} />
            <OrdersTable orders={orders} />
          </div>
        </div>
      </main>
      <CreateOrderModal isOpen={orderModalOpen} onClose={() => setOrderModalOpen(false)} />
      <ChatPopup isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}
