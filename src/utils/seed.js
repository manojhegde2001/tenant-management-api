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

    // Clear existing data for a fresh showcase start
    await User.deleteMany({});
    await Role.deleteMany({});
    console.log('Existing users and roles purged.');

    // 1. Create EXACTLY 10 Showcase Roles
    const rolesData = [
      { name: 'Super Administrator', permissions: ['READ_USERS', 'WRITE_USERS', 'READ_ROLES', 'WRITE_ROLES'] },
      { name: 'Security Architect', permissions: ['READ_ROLES', 'WRITE_ROLES'] },
      { name: 'Identity Manager', permissions: ['READ_USERS', 'WRITE_USERS'] },
      { name: 'Compliance Officer', permissions: ['READ_USERS', 'READ_ROLES'] },
      { name: 'System Auditor', permissions: ['READ_ROLES'] },
      { name: 'Technical Support', permissions: ['READ_USERS'] },
      { name: 'Data Analyst', permissions: ['READ_USERS'] },
      { name: 'Operations Lead', permissions: ['WRITE_USERS'] },
      { name: 'External Partner', permissions: ['READ_USERS'] },
      { name: 'Guest Observer', permissions: ['READ_USERS'] }
    ];

    const createdRoles = await Role.insertMany(rolesData);
    console.log(`${createdRoles.length} Showcase Roles created.`);

    const getRoleId = (name) => createdRoles.find(r => r.name === name)._id;

    // 2. Create EXACTLY 10 Showcase Users
    const usersData = [
      { name: 'Alice Johnson', email: 'alice@example.com', password: 'password123', role: getRoleId('Super Administrator'), status: 'active' },
      { name: 'Bob Smith', email: 'bob@example.com', password: 'password123', role: getRoleId('Security Architect'), status: 'active' },
      { name: 'Charlie Davis', email: 'charlie@example.com', password: 'password123', role: getRoleId('Identity Manager'), status: 'active' },
      { name: 'Diana Prince', email: 'diana@example.com', password: 'password123', role: getRoleId('Compliance Officer'), status: 'inactive' },
      { name: 'Edward Norton', email: 'edward@example.com', password: 'password123', role: getRoleId('System Auditor'), status: 'active' },
      { name: 'Fiona Gallagher', email: 'fiona@example.com', password: 'password123', role: getRoleId('Technical Support'), status: 'active' },
      { name: 'George Costanza', email: 'george@example.com', password: 'password123', role: getRoleId('Data Analyst'), status: 'active' },
      { name: 'Hannah Abbott', email: 'hannah@example.com', password: 'password123', role: getRoleId('Operations Lead'), status: 'active' },
      { name: 'Ian Wright', email: 'ian@example.com', password: 'password123', role: getRoleId('External Partner'), status: 'inactive' },
      { name: 'Jenny Forrest', email: 'jenny@example.com', password: 'password123', role: getRoleId('Guest Observer'), status: 'active' }
    ];

    // Ensure we can always login as admin for showcase
    // Making Alice the primary admin
    usersData[0].email = 'admin@example.com';
    usersData[0].password = 'adminpassword123';

    await User.create(usersData);
    console.log(`${usersData.length} Showcase Users created.`);

    console.log('\n--- Credentials for Showcase ---');
    console.log('Username: admin@example.com');
    console.log('Password: adminpassword123');
    console.log('--------------------------------\n');

    mongoose.connection.close();
    console.log('Seeding complete. Showcase data (10 Users, 10 Roles) is ready.');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seed();
