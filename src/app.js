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

// 1. API Routes (Check these FIRST)
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/dashboard', dashboardRoutes);

// 2. Static files for Frontend
const frontendPath = path.resolve(__dirname, '..', '..', 'frontend', 'dist');

// 3. Serve physical static assets
app.use(express.static(frontendPath));

// 4. SPA Fallback: ALL non-API requests that haven't matched a file should serve index.html
// This regex matches any path that DOES NOT begin with /api
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Final Error Handling (Middleware)
app.use(notFound); 
app.use(errorHandler);

module.exports = app;
