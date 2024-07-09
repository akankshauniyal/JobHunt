const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    industry: { type: String, required: true },
    description: { type: String, required: true },
    qualifications: { type: String, required: true },
    compensation: { type: String, required: true },
    applyLink: { type: String, required: true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Applicant' }],
    shareOption: { type: Boolean, default: false },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
