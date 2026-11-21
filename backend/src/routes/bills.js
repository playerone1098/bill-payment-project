import express from 'express';
import { bills, transactions } from '../data/mockData.js';

const router = express.Router();

// GET /api/bills - list bills with optional filters
router.get('/', (req, res) => {
  try {
    const { status, category, search } = req.query;
    let filtered = [...bills];

    if (status && status !== 'all') {
      filtered = filtered.filter(b => b.status.toLowerCase() === status.toLowerCase());
    }

    if (category && category !== 'all') {
      filtered = filtered.filter(b => b.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(b =>
        b.billerName.toLowerCase().includes(q) ||
        b.consumerId.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q)
      );
    }

    // Sort by status (overdue first, then pending, then paid) and then by due date
    const statusPriority = { overdue: 1, pending: 2, paid: 3 };
    filtered.sort((a, b) => {
      const pDiff = (statusPriority[a.status] || 99) - (statusPriority[b.status] || 99);
      if (pDiff !== 0) return pDiff;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    res.json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/bills/:id - single bill detail
router.get('/:id', (req, res) => {
  try {
    const bill = bills.find(b => b.id.toLowerCase() === req.params.id.toLowerCase());
    if (!bill) {
      return res.status(404).json({ success: false, message: 'Bill not found' });
    }
    res.json({ success: true, data: bill });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/bills - Add / Fetch a new mock bill
router.post('/', (req, res) => {
  try {
    const { category, billerId, billerName, consumerId, customerName, amount, dueDate, unitsConsumed } = req.body;

    if (!billerName || !consumerId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Biller name, consumer ID, and amount are required'
      });
    }

    const newBill = {
      id: `BILL-${Math.floor(1000 + Math.random() * 9000)}`,
      category: category || 'electricity',
      billerId: billerId || `biller-${Date.now()}`,
      billerName,
      consumerId,
      customerName: customerName || 'Alex Morgan',
      billDate: new Date().toISOString().split('T')[0],
      dueDate: dueDate || new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      amount: Number(parseFloat(amount).toFixed(2)),
      lateFee: Math.round(Number(amount) * 0.05 * 100) / 100,
      status: 'pending',
      billingPeriod: 'Current Billing Cycle',
      unitsConsumed: unitsConsumed || 'Standard Monthly Consumption',
      meterNumber: `MTR-${Math.floor(100000 + Math.random() * 900000)}`
    };

    bills.unshift(newBill);

    res.status(201).json({
      success: true,
      message: 'Bill created successfully',
      data: newBill
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/bills/:id/pay - Pay a bill
router.post('/:id/pay', (req, res) => {
  try {
    const bill = bills.find(b => b.id.toLowerCase() === req.params.id.toLowerCase());

    if (!bill) {
      return res.status(404).json({ success: false, message: 'Bill not found' });
    }

    if (bill.status === 'paid') {
      return res.status(400).json({
        success: false,
        message: 'This bill has already been paid.'
      });
    }

    const { paymentMethod = 'UPI', paymentDetails = 'alex@mockbank' } = req.body;

    const totalPaid = bill.status === 'overdue' ? bill.amount + (bill.lateFee || 0) : bill.amount;
    const now = new Date().toISOString();
    const txnId = `TXN-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const authCode = `AUTH-${Math.floor(10000 + Math.random() * 90000)}`;

    // Update bill
    bill.status = 'paid';
    bill.paidAt = now;
    bill.transactionRef = txnId;
    bill.paymentMethod = paymentMethod;

    // Create transaction receipt
    const transactionRecord = {
      id: txnId,
      billId: bill.id,
      billerName: bill.billerName,
      category: bill.category,
      consumerId: bill.consumerId,
      customerName: bill.customerName,
      amount: totalPaid,
      baseAmount: bill.amount,
      lateFeeApplied: bill.status === 'overdue' ? bill.lateFee : 0,
      paidAt: now,
      paymentMethod,
      paymentDetails,
      status: 'SUCCESS',
      authCode
    };

    transactions.unshift(transactionRecord);

    res.json({
      success: true,
      message: 'Payment completed successfully!',
      data: {
        bill,
        transaction: transactionRecord
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
