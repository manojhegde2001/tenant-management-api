const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const history = require('connect-history-api-fallback');
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

// 1. API Routes (Must come BEFORE history-api-fallback)
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/dashboard', dashboardRoutes);

// 2. Static files for Frontend
const frontendPath = path.resolve(__dirname, '..', '..', 'frontend', 'dist');

// 3. SPA Fallback (Industry standard library)
// This will intercept any non-API, non-file request and point it to index.html
app.use(history({
  verbose: true,
  index: '/index.html',
  rewrites: [
    { from: /^\/api\/.*$/, to: (context) => context.parsedUrl.pathname }
  ]
}));

// 4. Serve static assets
app.use(express.static(frontendPath));

// Final Error Handling (Middleware)
app.use(notFound); 
app.use(errorHandler);

module.exports = app;
