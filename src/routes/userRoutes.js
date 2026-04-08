const express = require('express');
const router = express.Router();
const {
  authUser,
  getUsers,
  createUser,
  updateUser,
  deactivateUser,
} = require('../controllers/userController');
const { authUser: loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public route
router.post('/login', loginUser);

// Protected routes
router.use(protect);
router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .put(updateUser)
  .delete(deactivateUser);

module.exports = router;
