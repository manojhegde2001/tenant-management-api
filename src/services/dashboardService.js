const User = require('../models/User');
const Role = require('../models/Role');

const getDashboardStats = async () => {
  const [totalUsers, activeUsers, totalRoles] = await Promise.all([
    User.countDocuments({}),
    User.countDocuments({ status: 'active' }),
    Role.countDocuments({}),
  ]);

  return {
    totalUsers,
    activeUsers,
    totalRoles,
  };
};

module.exports = { getDashboardStats };
