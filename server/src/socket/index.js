import jwt from 'jsonwebtoken';
import { saveMessage } from '../controllers/messageController.js';

const onlineUsers = new Map();

export const setupSocket = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error('Unauthorized'));
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = payload;
      return next();
    } catch (error) {
      return next(new Error('Unauthorized'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.user.id;
    onlineUsers.set(userId, socket.id);
    io.emit('online-users', Array.from(onlineUsers.keys()));

    socket.on('send-message', async ({ receiverId, text }) => {
      if (!receiverId || !text) return;

      const message = await saveMessage({
        sender: userId,
        receiver: receiverId,
        text,
      });

      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('new-message', message);
      }
      socket.emit('new-message', message);
    });

    socket.on('disconnect', () => {
      onlineUsers.delete(userId);
      io.emit('online-users', Array.from(onlineUsers.keys()));
    });
  });
};
