const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Site name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Site', siteSchema);
