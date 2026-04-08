const express = require('express');
const router = express.Router();
const {
  getSites,
  createSite,
  updateSite,
  deleteSite,
} = require('../controllers/siteController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .get(getSites)
  .post(createSite);

router.route('/:id')
  .put(updateSite)
  .delete(deleteSite);

module.exports = router;
