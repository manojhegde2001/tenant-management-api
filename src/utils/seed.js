const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Role = require('../models/Role');
const Site = require('../models/Site');

const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB for seeding...');

    // Clear existing data (Optional, handle with care)
    // await User.deleteMany({});
    // await Role.deleteMany({});
    // await Site.deleteMany({});

    // Create Initial Role if not exists
    let adminRole = await Role.findOne({ name: 'Admin' });
    if (!adminRole) {
      adminRole = await Role.create({
        name: 'Admin',
        permissions: ['ALL'],
      });
      console.log('Admin Role created');
    }

    // Create Initial Site if not exists
    let defaultSite = await Site.findOne({ name: 'Headquarters' });
    if (!defaultSite) {
      defaultSite = await Site.create({
        name: 'Headquarters',
        location: 'Main Office',
        status: 'active',
      });
      console.log('Default Site created');
    }

    // Create Admin User if not exists
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      await User.create({
        name: 'System Admin',
        email: 'admin@example.com',
        password: 'adminpassword123',
        role: adminRole._id,
        site: defaultSite._id,
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
