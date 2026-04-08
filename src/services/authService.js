const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password').populate('role').populate('site');

  if (user && (await user.matchPassword(password))) {
    if (user.status === 'inactive') {
      throw new Error('Account is inactive. Please contact administrator.');
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      site: user.site,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid email or password');
  }
};

module.exports = { loginUser };
