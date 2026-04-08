const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Role = require('../models/Role');

const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB for seeding...');

    // Create Initial Role if not exists
    let adminRole = await Role.findOne({ name: 'Admin' });
    if (!adminRole) {
      adminRole = await Role.create({
        name: 'Admin',
        permissions: ['ALL'],
      });
      console.log('Admin Role created');
    }

    // Create Admin User if not exists
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      await User.create({
        name: 'System Admin',
        email: 'admin@example.com',
        password: 'adminpassword123',
        role: adminRole._id,
        status: 'active',
      });
      console.log('Admin User created (admin@example.com / adminpassword123)');
    } else {
      console.log('Admin User already exists');
    }

    mongoose.connection.close();
    console.log('Seeding complete');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seed();
