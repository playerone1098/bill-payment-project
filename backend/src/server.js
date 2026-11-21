import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import billsRouter from './routes/bills.js';
import transactionsRouter from './routes/transactions.js';
import categoriesRouter from './routes/categories.js';
import summaryRouter from './routes/summary.js';
import resetRouter from './routes/reset.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDist = path.resolve(__dirname, '../../frontend/dist');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger for debugging/testing
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Bill Payment Mock Backend API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/bills', billsRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/summary', summaryRouter);
app.use('/api/reset', resetRouter);

// Serve frontend static build if available (enables single-process full-stack offline mode)
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// 404 Handler for unhandled API routes
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route '${req.originalUrl}' not found.`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'An unexpected internal server error occurred',
    error: err.message
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(` 🚀 Bill Payment Mock Backend Server running `);
  console.log(` 🌐 URL: http://localhost:${PORT}`);
  console.log(` 🔍 Health check: http://localhost:${PORT}/api/health`);
  if (fs.existsSync(frontendDist)) {
    console.log(` 📱 Frontend served offline at: http://localhost:${PORT}`);
  }
  console.log(`===============================================`);
});
