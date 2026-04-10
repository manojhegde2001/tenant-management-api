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

    // Clear existing data for a fresh testing start
    await User.deleteMany({});
    await Role.deleteMany({});
    console.log('Existing users and roles purged.');

    // 1. Create EXACTLY 5 Testing Roles
    const rolesData = [
      { name: 'Admin', permissions: ['READ_USERS', 'WRITE_USERS', 'READ_ROLES', 'WRITE_ROLES', 'READ_SITES', 'WRITE_SITES'] },
      { name: 'Editor', permissions: ['READ_USERS', 'WRITE_USERS', 'READ_ROLES', 'READ_SITES', 'WRITE_SITES'] },
      { name: 'Manager', permissions: ['READ_USERS', 'WRITE_USERS', 'READ_ROLES', 'READ_SITES'] },
      { name: 'Auditor', permissions: ['READ_USERS', 'READ_ROLES', 'READ_SITES'] },
      { name: 'Viewer', permissions: ['READ_USERS', 'READ_SITES'] }
    ];

    const createdRoles = await Role.insertMany(rolesData);
    console.log(`${createdRoles.length} Testing Roles created.`);

    const getRoleId = (name) => createdRoles.find(r => r.name === name)._id;

    // 2. Create EXACTLY 5 Testing Users
    const usersData = [
      { name: 'Admin User', email: 'admin@example.com', password: 'adminpassword123', role: getRoleId('Admin'), status: 'active' },
      { name: 'Jane Editor', email: 'jane@example.com', password: 'password123', role: getRoleId('Editor'), status: 'active' },
      { name: 'Mike Manager', email: 'mike@example.com', password: 'password123', role: getRoleId('Manager'), status: 'active' },
      { name: 'Sarah Auditor', email: 'sarah@example.com', password: 'password123', role: getRoleId('Auditor'), status: 'inactive' },
      { name: 'Tom Viewer', email: 'tom@example.com', password: 'password123', role: getRoleId('Viewer'), status: 'active' }
    ];

    await User.create(usersData);
    console.log(`${usersData.length} Testing Users created.`);

    console.log('\n--- Credentials for Testing ---');
    console.log('Username: admin@example.com');
    console.log('Password: adminpassword123');
    console.log('--------------------------------\n');

    mongoose.connection.close();
    console.log('Seeding complete. Testing data (5 Users, 5 Roles) is ready.');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seed();
