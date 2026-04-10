const express = require('express');
const router = express.Router();
const {
  getSites,
  createSite,
  updateSite,
  deleteSite,
} = require('../controllers/siteController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .get(authorize('READ_SITES'), getSites)
  .post(authorize('WRITE_SITES'), createSite);

router.route('/:id')
  .put(authorize('WRITE_SITES'), updateSite)
  .delete(authorize('WRITE_SITES'), deleteSite);

module.exports = router;
