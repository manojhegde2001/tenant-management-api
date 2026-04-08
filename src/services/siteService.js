const Site = require('../models/Site');

const createSite = async (siteData) => {
  return await Site.create(siteData);
};

const getAllSites = async () => {
  return await Site.find({});
};

const updateSite = async (id, siteData) => {
  const site = await Site.findById(id);
  if (!site) throw new Error('Site not found');

  site.name = siteData.name || site.name;
  site.location = siteData.location || site.location;
  site.status = siteData.status || site.status;

  return await site.save();
};

const deleteSite = async (id) => {
  const site = await Site.findById(id);
  if (!site) throw new Error('Site not found');
  
  // Note: Could also check if users are assigned to this site
  await Site.findByIdAndDelete(id);
  return { message: 'Site removed' };
};

module.exports = {
  createSite,
  getAllSites,
  updateSite,
  deleteSite,
};
