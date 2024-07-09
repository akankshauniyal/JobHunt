const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
    },
    profileType: {
        type: String,
        enum: ['applicant', 'recruiter', 'company'],
        required: true,
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    profilePicture: {
        type: String,
    },
    uid: {
        type: String,
        required: true,
        unique: true,
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
