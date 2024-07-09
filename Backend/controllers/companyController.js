const Company = require('../models/Company');

exports.createCompany = async (req, res) => {
  const { userId, name, email, website, location, industry, size, description } = req.body;
  const logo = req.file ? req.file.path : null;
  try {
    const company = new Company({ userId, name, email, website, logo, location, industry, size, description });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.find(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompanyProfileByUserId = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.params.userId });
    if (!company) {
      console.log('Company not found for userId:', req.params.userId);
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error('Error fetching company profile:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json({ message: 'Company deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
