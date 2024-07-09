const Ad = require('../models/Ad');

exports.createAd = async (req, res) => {
  const { company, content, link } = req.body;
  try {
    const ad = new Ad({ company, content, link });
    await ad.save();
    res.status(201).json(ad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAds = async (req, res) => {
  try {
    const ads = await Ad.find();
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateAd = async (req, res) => {
  try {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findByIdAndDelete(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }
    res.status(200).json({ message: 'Ad deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
