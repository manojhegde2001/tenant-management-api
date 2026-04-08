const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes Placeholder
app.get('/', (req, res) => {
  res.json({ message: 'Tenant Management API is running...' });
});

// Import Routes
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const siteRoutes = require('./routes/siteRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
