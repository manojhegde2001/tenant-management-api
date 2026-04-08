const asyncHandler = require('express-async-handler');
const siteService = require('../services/siteService');

// @desc    Get all sites
// @route   GET /api/sites
// @access  Private
const getSites = asyncHandler(async (req, res) => {
  const sites = await siteService.getAllSites();
  res.status(200).json({
    success: true,
    data: sites,
  });
});

// @desc    Create new site
// @route   POST /api/sites
// @access  Private
const createSite = asyncHandler(async (req, res) => {
  const site = await siteService.createSite(req.body);
  res.status(201).json({
    success: true,
    data: site,
  });
});

// @desc    Update site
// @route   PUT /api/sites/:id
// @access  Private
const updateSite = asyncHandler(async (req, res) => {
  const site = await siteService.updateSite(req.params.id, req.body);
  res.status(200).json({
    success: true,
    data: site,
  });
});

// @desc    Delete site
// @route   DELETE /api/sites/:id
// @access  Private
const deleteSite = asyncHandler(async (req, res) => {
  const result = await siteService.deleteSite(req.params.id);
  res.status(200).json({
    success: true,
    ...result,
  });
});

module.exports = {
  getSites,
  createSite,
  updateSite,
  deleteSite,
};
