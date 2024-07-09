const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    date: { type: Date, default: Date.now },
    content: { type: String, required: true },
    link: { type: String, required: true },
    analytics: {
        views: { type: Number, default: 0 },
        clicks: { type: Number, default: 0 },
    },
});

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
