const path = require('path');
// Explicitly define path to .env to prevent directory execution issues
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = require('./app');
const connectDB = require('./config/db');

// Validate critical environment variables early
console.log('Available Env Keys on Startup:', Object.keys(process.env));
// Hardcoded fallback since Railway is failing to inject the variable

const currentUri = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!currentUri) {
  console.error('FATAL ERROR: MONGO_URI is not defined in environment variables.');
  process.exit(1);
}

// In db.js it uses process.env.MONGO_URI or MONGODB_URI, we should ensure process.env has it
process.env.MONGO_URI = currentUri;

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
