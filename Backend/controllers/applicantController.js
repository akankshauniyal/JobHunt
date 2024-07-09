const Applicant = require('../models/Applicant');

exports.createApplicant = async (req, res) => {
  const { userId, name, logo, email, about, location, resume, education, experience, skills, linkedInProfile, desiredJobTitle } = req.body;
  try {
    const applicant = new Applicant({ userId, name, logo, email, about, location, resume, education, experience, skills, linkedInProfile, desiredJobTitle });
    await applicant.save();
    res.status(201).json(applicant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find();
    res.status(200).json(applicants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApplicantById = async (req, res) => {
  try {
    const applicant = await Applicant.find(req.params.id);
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }
    res.status(200).json(applicant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApplicantProfileByUserId = async (req, res) => {
  try {
    const applicant = await Applicant.findOne({ userId: req.params.userId });
    if (!applicant) {
      console.log('Applicant not found for userId:', req.params.userId);
      return res.status(404).json({ message: 'Applicant not found' });
    }
    res.status(200).json(applicant);
  } catch (error) {
    console.error('Error fetching applicant profile:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.updateApplicant = async (req, res) => {
  try {
    const applicant = await Applicant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }
    res.status(200).json(applicant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteApplicant = async (req, res) => {
  try {
    const applicant = await Applicant.findByIdAndDelete(req.params.id);
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }
    res.status(200).json({ message: 'Applicant deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
