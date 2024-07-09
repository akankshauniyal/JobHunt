const Recruiter = require('../models/Recruiter');

exports.createRecruiter = async (req, res) => {
  const { userId, name, email, logo, company, about, location, position, educationDetails, yearsOfExperience, specializations, linkedInProfile } = req.body;
  try {
    const recruiter = new Recruiter({ userId, name, email, logo, company, about, location, position, educationDetails, yearsOfExperience, specializations, linkedInProfile });
    await recruiter.save();
    res.status(201).json(recruiter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find();
    res.status(200).json(recruiters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecruiterById = async (req, res) => {
  try {
    const recruiter = await Recruiter.find(req.params.id);
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }
    res.status(200).json(recruiter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecruiterProfileByUserId = async (req, res) => {
  try {
    const recruiter = await Recruiter.findOne({ userId: req.params.userId });
    if (!recruiter) {
      console.log('Recruiter not found for userId:', req.params.userId);
      return res.status(404).json({ message: 'recruiter not found' });
    }
    res.status(200).json(recruiter);
  } catch (error) {
    console.error('Error fetching recruiter profile:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.updateRecruiter = async (req, res) => {
  try {
    const recruiter = await Recruiter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recruiter) {
      return res.status(404).json({ message: 'recruiter not found' });
    }
    res.status(200).json(recruiter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRecruiter = async (req, res) => {
  try {
    const recruiter = await Recruiter.findByIdAndDelete(req.params.id);
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }
    res.status(200).json({ message: 'Recruiter deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
