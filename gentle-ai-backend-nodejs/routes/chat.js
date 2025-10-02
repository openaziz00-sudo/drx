const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize DeepSeek client (uses OpenAI-compatible API)
const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});

/**
 * POST /api/chat
 * Chat endpoint using OpenAI models
 */
router.post('/chat', async (req, res) => {
  try {
    const { messages, model = 'gpt-4.1-mini', stream = false } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    if (stream) {
      // Streaming response
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const completion = await openai.chat.completions.create({
        model,
        messages,
        stream: true,
      });

      for await (const chunk of completion) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } else {
      // Non-streaming response
      const completion = await openai.chat.completions.create({
        model,
        messages,
        stream: false,
      });

      const response = {
        content: completion.choices[0].message.content,
        model: completion.model,
        usage: completion.usage,
      };

      res.json(response);
    }
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ 
      error: error.message || 'Internal server error',
      details: error.response?.data || null
    });
  }
});

/**
 * POST /api/chat/deepseek
 * Chat endpoint using DeepSeek models
 */
router.post('/chat/deepseek', async (req, res) => {
  try {
    const { messages, model = 'deepseek-reasoner', stream = false } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    if (stream) {
      // Streaming response
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const completion = await deepseek.chat.completions.create({
        model,
        messages,
        stream: true,
      });

      for await (const chunk of completion) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } else {
      // Non-streaming response
      const completion = await deepseek.chat.completions.create({
        model,
        messages,
        stream: false,
      });

      const response = {
        content: completion.choices[0].message.content,
        model: completion.model,
        usage: completion.usage,
      };

      res.json(response);
    }
  } catch (error) {
    console.error('Error in /api/chat/deepseek:', error);
    res.status(500).json({ 
      error: error.message || 'Internal server error',
      details: error.response?.data || null
    });
  }
});

module.exports = router;
