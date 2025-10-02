// Load environment variables
require('dotenv').config({ path: '../gentle-ai-backend-nodejs/.env' });

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Import routes
let chatRoutes, authRoutes, conversationsRoutes;

try {
  chatRoutes = require('../gentle-ai-backend-nodejs/routes/chat');
  authRoutes = require('../gentle-ai-backend-nodejs/routes/auth');
  conversationsRoutes = require('../gentle-ai-backend-nodejs/routes/conversations');
} catch (error) {
  console.error('Error loading routes:', error);
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Gentle AI API is running',
    env: {
      hasOpenAI: !!process.env.OPENAI_API_KEY,
      hasDeepSeek: !!process.env.DEEPSEEK_API_KEY,
      hasDatabase: !!process.env.DATABASE_URL,
      hasJWT: !!process.env.JWT_SECRET
    }
  });
});

// API Routes
if (chatRoutes) app.use('/api', chatRoutes);
if (authRoutes) app.use('/api/auth', authRoutes);
if (conversationsRoutes) app.use('/api/conversations', conversationsRoutes);

// Serve static files from frontend build
const publicPath = path.join(__dirname, '../gentle-ai-backend-nodejs/public');
app.use(express.static(publicPath));

// Catch all route - serve index.html for client-side routing
app.get('*', (req, res) => {
  const indexPath = path.join(publicPath, 'index.html');
  res.sendFile(indexPath);
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Export for Vercel
module.exports = app;
