const asyncHandler = require('express-async-handler');
const userService = require('../services/userService');

// @desc    Get all users (with search and pagination)
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  const result = await userService.getUsers(req.query);
  res.status(200).json({
    success: true,
    ...result,
  });
});

// @desc    Create new user
// @route   POST /api/users
// @access  Private
const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Toggle user status (activate/deactivate)
// @route   DELETE /api/users/:id
// @access  Private
const toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await userService.toggleUserStatus(req.params.id);
  res.status(200).json({
    success: true,
    message: `User ${user.status === 'active' ? 'activated' : 'deactivated'} successfully`,
  });
});

module.exports = {
  getUsers,
  createUser,
  updateUser,
  toggleUserStatus,
};
