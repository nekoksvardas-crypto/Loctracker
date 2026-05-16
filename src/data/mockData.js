export const fleet = [
  { id: 'TR-231', driver: 'Miguel Torres', status: 'In Transit', location: 'I-5 North, Mile 102', eta: '11:22' },
  { id: 'TR-118', driver: 'Alicia Zhang', status: 'Loading', location: 'Port Terminal B', eta: '12:05' },
  { id: 'TR-552', driver: 'David Brown', status: 'Idle', location: 'Yard 3, Bay 7', eta: '--:--' },
  { id: 'TR-609', driver: 'Elena Petrova', status: 'In Transit', location: 'US-101 South, Exit 22', eta: '10:54' },
]

export const orders = [
  { id: 'ORD-90012', customer: 'Norwest Foods', route: 'Seattle → Tacoma', priority: 'High', status: 'Assigned' },
  { id: 'ORD-90013', customer: 'Everline Retail', route: 'Tacoma → Olympia', priority: 'Medium', status: 'Pending' },
  { id: 'ORD-90014', customer: 'MediSupply Inc.', route: 'Seattle → Bellevue', priority: 'High', status: 'In Progress' },
]

export const driverHours = [
  { driver: 'Miguel Torres', used: 7.2, remaining: 3.8 },
  { driver: 'Alicia Zhang', used: 5.1, remaining: 5.9 },
  { driver: 'David Brown', used: 2.9, remaining: 8.1 },
  { driver: 'Elena Petrova', used: 8.4, remaining: 2.6 },
]
