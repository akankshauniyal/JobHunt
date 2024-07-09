const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    logo: { type: String, required: true },
    about: { type: String },
    location: { type: String },
    resume: { type: String, required: true },
    education: {
      type: String, required: true
    },
    experience: { type: String, required: true },
    skills: [String],
    linkedInProfile: { type: String },
    desiredJobTitle: { type: String, required: true },
    followers: { type: Number, default: 0 },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    shareOption: { type: Boolean, default: false },
  });
  
  const Applicant = mongoose.model('Applicant', applicantSchema);
  
  module.exports = Applicant;
  