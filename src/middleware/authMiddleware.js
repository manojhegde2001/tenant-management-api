const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Decode token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey123');

      // Populate role to access permissions array
      req.user = await User.findById(decoded.id).select('-password').populate('role');

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      if (req.user.status === 'inactive') {
        res.status(401);
        throw new Error('Not authorized, account is inactive');
      }

      next();
    } catch (error) {
      if (res.statusCode === 200) res.status(401);
      throw new Error(error.message || 'Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Middleware to authorize specific permissions
const authorize = (...requiredPermissions) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      res.status(403);
      throw new Error('Access denied: Role information missing');
    }

    // Check if user has ALL the required permissions
    const hasAllPermissions = requiredPermissions.every((perm) =>
      req.user.role.permissions.includes(perm)
    );

    if (!hasAllPermissions) {
      res.status(403);
      throw new Error(`Access denied: Required permissions missing (${requiredPermissions.join(', ')})`);
    }

    next();
  };
};

module.exports = { protect, authorize };
