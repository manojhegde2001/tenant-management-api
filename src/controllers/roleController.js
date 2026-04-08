const asyncHandler = require('express-async-handler');
const roleService = require('../services/roleService');

// @desc    Get all roles
// @route   GET /api/roles
// @access  Private
const getRoles = asyncHandler(async (req, res) => {
  const roles = await roleService.getAllRoles();
  res.status(200).json({
    success: true,
    data: roles,
  });
});

// @desc    Create new role
// @route   POST /api/roles
// @access  Private
const createRole = asyncHandler(async (req, res) => {
  const role = await roleService.createRole(req.body);
  res.status(201).json({
    success: true,
    data: role,
  });
});

// @desc    Update role
// @route   PUT /api/roles/:id
// @access  Private
const updateRole = asyncHandler(async (req, res) => {
  const role = await roleService.updateRole(req.params.id, req.body);
  res.status(200).json({
    success: true,
    data: role,
  });
});

// @desc    Delete role
// @route   DELETE /api/roles/:id
// @access  Private
const deleteRole = asyncHandler(async (req, res) => {
  const result = await roleService.deleteRole(req.params.id);
  res.status(200).json({
    success: true,
    ...result,
  });
});

module.exports = {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
};
