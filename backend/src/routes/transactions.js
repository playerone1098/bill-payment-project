import express from 'express';
import { transactions } from '../data/mockData.js';

const router = express.Router();

// GET /api/transactions - List all transactions
router.get('/', (req, res) => {
  try {
    const { category, search } = req.query;
    let filtered = [...transactions];

    if (category && category !== 'all') {
      filtered = filtered.filter(t => t.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(t =>
        t.id.toLowerCase().includes(q) ||
        t.billerName.toLowerCase().includes(q) ||
        t.consumerId.toLowerCase().includes(q) ||
        t.billId.toLowerCase().includes(q)
      );
    }

    // Sort newest first
    filtered.sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt));

    res.json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/transactions/:id - Get specific transaction receipt
router.get('/:id', (req, res) => {
  try {
    const txn = transactions.find(t => t.id.toLowerCase() === req.params.id.toLowerCase());
    if (!txn) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }
    res.json({ success: true, data: txn });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
