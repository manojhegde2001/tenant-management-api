const express = require('express');
const router = express.Router();
const {
  authUser,
  getUsers,
  createUser,
  updateUser,
  toggleUserStatus,
} = require('../controllers/userController');
const { authUser: loginUser } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public route
router.post('/login', loginUser);

// Protected routes
router.use(protect);

router.route('/')
  .get(authorize('READ_USERS'), getUsers)
  .post(authorize('WRITE_USERS'), createUser);

router.route('/:id')
  .put(authorize('WRITE_USERS'), updateUser)
  .delete(authorize('WRITE_USERS'), toggleUserStatus);

module.exports = router;
