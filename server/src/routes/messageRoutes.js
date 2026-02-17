import express from 'express';
import { getMessagesWithUser } from '../controllers/messageController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:userId', authMiddleware, getMessagesWithUser);

export default router;
