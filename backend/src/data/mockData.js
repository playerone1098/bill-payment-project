// In-memory mock data store for Bill Payment App
// Note: All data is completely simulated/mocked for demonstration and testing.

export const categories = [
  {
    id: 'electricity',
    name: 'Electricity',
    icon: 'Zap',
    color: '#eab308',
    billers: [
      { id: 'biller-elec-1', name: 'PowerGrid Electric Corp', code: 'PG-ELEC' },
      { id: 'biller-elec-2', name: 'Metro Energy Distribution', code: 'METRO-ENG' },
      { id: 'biller-elec-3', name: 'GreenLife Renewable Power', code: 'GL-POW' }
    ]
  },
  {
    id: 'water',
    name: 'Water Supply',
    icon: 'Droplets',
    color: '#06b6d4',
    billers: [
      { id: 'biller-wat-1', name: 'City Municipal Water Board', code: 'CMWB-WAT' },
      { id: 'biller-wat-2', name: 'ClearFlow Utilities', code: 'CF-UTIL' }
    ]
  },
  {
    id: 'broadband',
    name: 'Broadband & Fiber',
    icon: 'Wifi',
    color: '#8b5cf6',
    billers: [
      { id: 'biller-net-1', name: 'FiberSpeed Ultra Broadband', code: 'FS-BB' },
      { id: 'biller-net-2', name: 'AuraNet Highspeed Cable', code: 'AURA-NET' }
    ]
  },
  {
    id: 'mobile',
    name: 'Mobile Postpaid',
    icon: 'Smartphone',
    color: '#3b82f6',
    billers: [
      { id: 'biller-mob-1', name: 'TeleConnect Postpaid 5G', code: 'TC-5G' },
      { id: 'biller-mob-2', name: 'Horizon Telecom Cellular', code: 'HT-CELL' }
    ]
  },
  {
    id: 'gas',
    name: 'Piped Gas',
    icon: 'Flame',
    color: '#f97316',
    billers: [
      { id: 'biller-gas-1', name: 'Metropolitan City Gas Limited', code: 'MCGL-GAS' },
      { id: 'biller-gas-2', name: 'EcoGas Energy Corp', code: 'ECO-GAS' }
    ]
  },
  {
    id: 'dth',
    name: 'DTH & Cable TV',
    icon: 'Tv',
    color: '#ec4899',
    billers: [
      { id: 'biller-dth-1', name: 'SkyVision HD Digital', code: 'SKY-DTH' },
      { id: 'biller-dth-2', name: 'StarBeam Direct TV', code: 'SBD-TV' }
    ]
  }
];

export const initialBills = [
  {
    id: 'BILL-1001',
    category: 'electricity',
    billerId: 'biller-elec-1',
    billerName: 'PowerGrid Electric Corp',
    consumerId: 'EL-90428172',
    customerName: 'Alex Morgan',
    billDate: '2026-10-28',
    dueDate: '2026-11-18',
    amount: 142.50,
    lateFee: 15.00,
    status: 'pending',
    billingPeriod: '28 Sep 2026 - 27 Oct 2026',
    unitsConsumed: '312 kWh',
    meterNumber: 'MTR-772189'
  },
  {
    id: 'BILL-1002',
    category: 'broadband',
    billerId: 'biller-net-1',
    billerName: 'FiberSpeed Ultra Broadband',
    consumerId: 'FS-550192',
    customerName: 'Alex Morgan',
    billDate: '2026-10-25',
    dueDate: '2026-11-10',
    amount: 65.00,
    lateFee: 5.00,
    status: 'overdue',
    billingPeriod: '01 Oct 2026 - 31 Oct 2026',
    unitsConsumed: 'Unlimited Fiber 300 Mbps',
    meterNumber: 'MODEM-A491F'
  },
  {
    id: 'BILL-1003',
    category: 'mobile',
    billerId: 'biller-mob-1',
    billerName: 'TeleConnect Postpaid 5G',
    consumerId: 'MOB-5550192834',
    customerName: 'Alex Morgan',
    billDate: '2026-11-01',
    dueDate: '2026-11-21',
    amount: 45.99,
    lateFee: 5.00,
    status: 'pending',
    billingPeriod: '01 Oct 2026 - 31 Oct 2026',
    unitsConsumed: 'Postpaid Infinity Plan (50GB + Unlimited Calls)',
    meterNumber: 'SIM-99210'
  },
  {
    id: 'BILL-1004',
    category: 'water',
    billerId: 'biller-wat-1',
    billerName: 'City Municipal Water Board',
    consumerId: 'WAT-331092',
    customerName: 'Alex Morgan',
    billDate: '2026-10-15',
    dueDate: '2026-11-05',
    amount: 32.75,
    lateFee: 3.50,
    status: 'paid',
    billingPeriod: '15 Sep 2026 - 14 Oct 2026',
    unitsConsumed: '18,500 Gallons',
    meterNumber: 'WM-3318',
    paidAt: '2026-11-04T14:22:10.000Z',
    transactionRef: 'TXN-2026-99120',
    paymentMethod: 'UPI'
  },
  {
    id: 'BILL-1005',
    category: 'gas',
    billerId: 'biller-gas-1',
    billerName: 'Metropolitan City Gas Limited',
    consumerId: 'GAS-771290',
    customerName: 'Alex Morgan',
    billDate: '2026-10-20',
    dueDate: '2026-11-25',
    amount: 58.20,
    lateFee: 7.00,
    status: 'pending',
    billingPeriod: '20 Sep 2026 - 19 Oct 2026',
    unitsConsumed: '42 SCM',
    meterNumber: 'GM-99104'
  },
  {
    id: 'BILL-1006',
    category: 'dth',
    billerId: 'biller-dth-1',
    billerName: 'SkyVision HD Digital',
    consumerId: 'DTH-4491028',
    customerName: 'Alex Morgan',
    billDate: '2026-10-05',
    dueDate: '2026-10-25',
    amount: 29.99,
    lateFee: 2.00,
    status: 'paid',
    billingPeriod: '05 Oct 2026 - 04 Nov 2026',
    unitsConsumed: 'Mega Entertainment Pack + Sports HD',
    meterNumber: 'STB-11928',
    paidAt: '2026-10-22T09:15:30.000Z',
    transactionRef: 'TXN-2026-87451',
    paymentMethod: 'Credit Card'
  }
];

export const initialTransactions = [
  {
    id: 'TXN-2026-99120',
    billId: 'BILL-1004',
    billerName: 'City Municipal Water Board',
    category: 'water',
    consumerId: 'WAT-331092',
    customerName: 'Alex Morgan',
    amount: 32.75,
    paidAt: '2026-11-04T14:22:10.000Z',
    paymentMethod: 'UPI',
    paymentDetails: 'alex@mockbank (UPI ID)',
    status: 'SUCCESS',
    authCode: 'AUTH-66291'
  },
  {
    id: 'TXN-2026-87451',
    billId: 'BILL-1006',
    billerName: 'SkyVision HD Digital',
    category: 'dth',
    consumerId: 'DTH-4491028',
    customerName: 'Alex Morgan',
    amount: 29.99,
    paidAt: '2026-10-22T09:15:30.000Z',
    paymentMethod: 'Credit Card',
    paymentDetails: 'Visa ending in 4242',
    status: 'SUCCESS',
    authCode: 'AUTH-11492'
  }
];

// In-memory state holder that can be mutated during runtime and reset anytime
export let bills = JSON.parse(JSON.stringify(initialBills));
export let transactions = JSON.parse(JSON.stringify(initialTransactions));

export function resetMockData() {
  bills = JSON.parse(JSON.stringify(initialBills));
  transactions = JSON.parse(JSON.stringify(initialTransactions));
  return { bills, transactions };
}
