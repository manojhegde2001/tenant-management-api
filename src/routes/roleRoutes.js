const express = require('express');
const router = express.Router();
const {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} = require('../controllers/roleController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .get(authorize('READ_ROLES'), getRoles)
  .post(authorize('WRITE_ROLES'), createRole);

router.route('/:id')
  .put(authorize('WRITE_ROLES'), updateRole)
  .delete(authorize('WRITE_ROLES'), deleteRole);

module.exports = router;
