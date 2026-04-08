const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
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
const frontendPath = path.resolve(__dirname, '..', '..', 'frontend', 'dist');
console.log('[Server] Static assets location:', frontendPath);

// Serve static assets first
app.use(express.static(frontendPath));

// Final SPA Catch-all: Matches any route not handled by API or static files
// Using app.use() without a path matches all requests and avoids path-to-regexp issues in Express 5
app.use((req, res, next) => {
  // If it's an API route that wasn't handled, pass to the JSON 404 handler
  if (req.originalUrl.startsWith('/api')) {
    return next();
  }

  const indexPath = path.join(frontendPath, 'index.html');
  
  // Check if index.html exists before attempting to send it
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // If frontend isn't built, or file is missing, proceed to error handlers
    next();
  }
});

// Error Handling (Middleware)
app.use(notFound); 
app.use(errorHandler);

module.exports = app;
