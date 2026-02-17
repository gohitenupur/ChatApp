import User from '../models/User.js';

export const getUsers = async (req, res) => {
  const { search = '' } = req.query;

  const users = await User.find({
    _id: { $ne: req.user.id },
    name: { $regex: search, $options: 'i' },
  }).select('_id name email');

  return res.json(users);
};
