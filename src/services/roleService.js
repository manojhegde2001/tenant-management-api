const Role = require('../models/Role');
const User = require('../models/User');

const createRole = async (roleData) => {
  return await Role.create(roleData);
};

const getAllRoles = async () => {
  return await Role.find({});
};

const updateRole = async (id, roleData) => {
  const role = await Role.findById(id);
  if (!role) throw new Error('Role not found');

  role.name = roleData.name || role.name;
  role.permissions = roleData.permissions || role.permissions;

  return await role.save();
};

const deleteRole = async (id) => {
  const role = await Role.findById(id);
  if (!role) throw new Error('Role not found');

  // Check if assigned to any users
  const userCount = await User.countDocuments({ role: id });
  if (userCount > 0) {
    throw new Error('Cannot delete role assigned to users');
  }

  await Role.findByIdAndDelete(id);
  return { message: 'Role removed' };
};

module.exports = {
  createRole,
  getAllRoles,
  updateRole,
  deleteRole,
};
