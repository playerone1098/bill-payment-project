import express from 'express';
import { resetMockData } from '../data/mockData.js';

const router = express.Router();

// POST /api/reset - Reset all bills and transactions to initial mock values
router.post('/', (req, res) => {
  try {
    const data = resetMockData();
    res.json({
      success: true,
      message: 'Mock data successfully reset to initial state.',
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
