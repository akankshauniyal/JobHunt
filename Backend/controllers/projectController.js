const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  const { title, liveLink, githubLink, technologiesUsed, description } = req.body;
  try {
    const project = new Project({ title, liveLink, githubLink, technologiesUsed, description });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
