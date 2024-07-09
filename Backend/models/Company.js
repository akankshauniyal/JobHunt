const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String, required: true },
  logo: { type: String, required: true },
  location: { type: String, required: true },
  industry: { type: String, required: true },
  size: { type: String, required: true },
  description: { type: String, required: true },
  followers: { type: Number, default: 0 },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  ads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ad' }],
  analytics: {
    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
  },
  shareOption: { type: Boolean, default: false },
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;