const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const Role = require('./src/models/Role');
const path = require('path');

dotenv.config();

const verify = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const userCount = await User.countDocuments({});
    const roleCount = await Role.countDocuments({});
    console.log(`Verification: { users: ${userCount}, roles: ${roleCount} }`);
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};

verify();
