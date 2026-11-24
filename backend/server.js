const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ── Routes ──
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/borrow', require('./routes/borrowRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'CampusBorrow backend is running successfully!',
    timestamp: new Date().toISOString(),
  });
});

// Global error handler (must be LAST)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
