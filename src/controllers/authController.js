const asyncHandler = require('express-async-handler');
const { loginUser } = require('../services/authService');

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);
  res.status(200).json({
    success: true,
    data: result,
  });
});

module.exports = { authUser };
