const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Import Routes
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Static files for Frontend
// We resolve the path to be absolute to avoid any relative path ambiguity
const frontendPath = path.resolve(__dirname, '../../frontend/dist');
console.log('Serving frontend from:', frontendPath);
app.use(express.static(frontendPath));

// SPA Fallback: Serve index.html for any non-API routes
// Using a standard middleware to avoid regex errors in Express 5
app.use((req, res, next) => {
  // If it's an API route that wasn't handled, pass to 404 handler
  if (req.url.startsWith('/api')) {
    return next();
  }
  
  // For any other route, try to serve the frontend index.html
  // We use the absolute path here as well
  const indexPath = path.join(frontendPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      // If index.html is missing or error occurs, pass to standard error handlers
      console.error('Fallback error:', err.message);
      next();
    }
  });
});

// Error Handling (Middleware)
app.use(notFound); 
app.use(errorHandler);

module.exports = app;
