const User = require('../models/User');
const Role = require('../models/Role');
const Site = require('../models/Site');

const getDashboardStats = async () => {
  const [totalUsers, activeUsers, totalRoles, totalSites] = await Promise.all([
    User.countDocuments({}),
    User.countDocuments({ status: 'active' }),
    Role.countDocuments({}),
    Site.countDocuments({}),
  ]);

  return {
    totalUsers,
    activeUsers,
    totalRoles,
    totalSites,
  };
};

module.exports = { getDashboardStats };
