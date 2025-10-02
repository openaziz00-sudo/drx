const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth');

const prisma = new PrismaClient();

/**
 * GET /api/conversations
 * Get all conversations for the current user
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: { userId: req.user.id },
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { messages: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    res.json({ conversations });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/conversations/:id
 * Get a specific conversation with all messages
 */
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const conversation = await prisma.conversation.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json({ conversation });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/conversations
 * Create a new conversation
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title } = req.body;

    const conversation = await prisma.conversation.create({
      data: {
        title: title || 'محادثة جديدة',
        userId: req.user.id,
      },
    });

    res.status(201).json({ conversation });
  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /api/conversations/:id
 * Update conversation title
 */
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    // Check if conversation belongs to user
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!existingConversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const conversation = await prisma.conversation.update({
      where: { id },
      data: { title },
    });

    res.json({ conversation });
  } catch (error) {
    console.error('Update conversation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /api/conversations/:id
 * Delete a conversation
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if conversation belongs to user
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!existingConversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    await prisma.conversation.delete({
      where: { id },
    });

    res.json({ message: 'Conversation deleted successfully' });
  } catch (error) {
    console.error('Delete conversation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/conversations/:id/messages
 * Add a message to a conversation
 */
router.post('/:id/messages', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { role, content, model, tokens } = req.body;

    // Check if conversation belongs to user
    const conversation = await prisma.conversation.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        conversationId: id,
        role,
        content,
        model: model || null,
        tokens: tokens || null,
      },
    });

    // Update conversation updatedAt
    await prisma.conversation.update({
      where: { id },
      data: { updatedAt: new Date() },
    });

    res.status(201).json({ message });
  } catch (error) {
    console.error('Add message error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
