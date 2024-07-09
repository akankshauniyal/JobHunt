const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    liveLink: { type: String },
    githubLink: { type: String },
    technologiesUsed: [String],
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
