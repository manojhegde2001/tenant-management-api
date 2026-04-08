const path = require('path');
// Explicitly define path to .env to prevent directory execution issues
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = require('./app');
const connectDB = require('./config/db');

// Validate critical environment variables early
console.log('Available Env Keys on Startup:', Object.keys(process.env));
// Helper to clean potential quotes from Railway environment variables
Object.keys(process.env).forEach(key => {
  if (process.env[key]) {
    process.env[key] = process.env[key].replace(/^["']|["']$/g, '');
  }
});

// Hardcoded fallback since Railway is failing to inject the variable
const fallbackUri = "mongodb+srv://adalovelacetechnologies:Nq5FKqfPNo20YLmE@cluster0.2sufhgn.mongodb.net/tenant_db?retryWrites=true&w=majority";

const currentUri = process.env.MONGO_URI || process.env.MONGODB_URI || fallbackUri;

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
