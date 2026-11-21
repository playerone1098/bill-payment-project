import express from 'express';
import { categories } from '../data/mockData.js';

const router = express.Router();

// GET /api/categories - list all categories and supported billers
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
