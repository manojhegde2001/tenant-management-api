const asyncHandler = require('express-async-handler');
const dashboardService = require('../services/dashboardService');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard
// @access  Private
const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await dashboardService.getDashboardStats();
  res.status(200).json({
    success: true,
    data: stats,
  });
});

module.exports = { getDashboardStats };
