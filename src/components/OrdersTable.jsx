export default function OrdersTable({ orders }) {
  return (
    <section className="panel">
      <div className="section-title">Orders</div>
      <table>
        <thead><tr><th>Order</th><th>Customer</th><th>Route</th><th>Priority</th><th>Status</th></tr></thead>
        <tbody>{orders.map((o) => <tr key={o.id}><td>{o.id}</td><td>{o.customer}</td><td>{o.route}</td><td>{o.priority}</td><td>{o.status}</td></tr>)}</tbody>
      </table>
    </section>
  )
}
