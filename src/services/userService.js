const User = require('../models/User');

const createUser = async (userData) => {
  return await User.create(userData);
};

const getUsers = async (query) => {
  const { page = 1, limit = 10, search = '' } = query;

  const searchQuery = search
    ? {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ],
      }
    : {};

  const skip = (page - 1) * limit;

  const users = await User.find(searchQuery)
    .populate('role')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await User.countDocuments(searchQuery);

  return {
    users,
    page: parseInt(page),
    limit: parseInt(limit),
    pages: Math.ceil(total / limit),
    total,
  };
};

const updateUser = async (id, userData) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');

  user.name = userData.name || user.name;
  user.email = userData.email || user.email;
  user.role = userData.role || user.role;
  user.status = userData.status || user.status;

  if (userData.password) {
    user.password = userData.password;
  }

  return await user.save();
};

const toggleUserStatus = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');

  user.status = user.status === 'active' ? 'inactive' : 'active';
  return await user.save();
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  toggleUserStatus,
};
