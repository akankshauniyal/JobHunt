const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        profilePicture: { type: String, required: true },
        name: { type: String, required: true },
    },
    date: { type: Date, default: Date.now },
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Applicant' },
        text: { type: String, required: true },
        date: { type: Date, default: Date.now },
    }],
    shareOption: { type: Boolean, default: false },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
