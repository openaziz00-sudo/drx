const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const chatRoutes = require('../gentle-ai-backend-nodejs/routes/chat');
const authRoutes = require('../gentle-ai-backend-nodejs/routes/auth');
const conversationsRoutes = require('../gentle-ai-backend-nodejs/routes/conversations');

// API Routes
app.use('/api/chat', chatRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversationsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Gentle AI API is running' });
});

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../gentle-ai-backend-nodejs/public')));

// Catch all route - serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../gentle-ai-backend-nodejs/public/index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
