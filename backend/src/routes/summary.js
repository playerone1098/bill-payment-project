import express from 'express';
import { bills, transactions } from '../data/mockData.js';

const router = express.Router();

// GET /api/summary - Dashboard high-level analytics and metrics
router.get('/', (req, res) => {
  try {
    const pendingBills = bills.filter(b => b.status === 'pending');
    const overdueBills = bills.filter(b => b.status === 'overdue');
    const paidBills = bills.filter(b => b.status === 'paid');

    const totalPendingAmount = pendingBills.reduce((acc, b) => acc + b.amount, 0);
    const totalOverdueAmount = overdueBills.reduce((acc, b) => acc + b.amount + (b.lateFee || 0), 0);
    const totalPaidAmount = transactions.reduce((acc, t) => acc + t.amount, 0);

    // Upcoming due within next 7 days
    const now = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(now.getDate() + 7);

    const upcomingBills = pendingBills.filter(b => {
      const due = new Date(b.dueDate);
      return due >= now && due <= nextWeek;
    });

    res.json({
      success: true,
      data: {
        totals: {
          totalPendingAmount: Number(totalPendingAmount.toFixed(2)),
          totalOverdueAmount: Number(totalOverdueAmount.toFixed(2)),
          totalDueNow: Number((totalPendingAmount + totalOverdueAmount).toFixed(2)),
          totalPaidAmount: Number(totalPaidAmount.toFixed(2))
        },
        counts: {
          all: bills.length,
          pending: pendingBills.length,
          overdue: overdueBills.length,
          paid: paidBills.length,
          upcomingDue: upcomingBills.length,
          transactions: transactions.length
        },
        upcomingDueBills: upcomingBills
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
