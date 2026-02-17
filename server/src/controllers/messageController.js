import Message from '../models/Message.js';

export const getMessagesWithUser = async (req, res) => {
  const { userId } = req.params;
  const myId = req.user.id;

  const messages = await Message.find({
    $or: [
      { sender: myId, receiver: userId },
      { sender: userId, receiver: myId },
    ],
  }).sort({ createdAt: 1 });

  return res.json(messages);
};

export const saveMessage = async ({ sender, receiver, text }) => {
  return Message.create({ sender, receiver, text });
};
