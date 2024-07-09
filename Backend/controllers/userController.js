const User = require('../models/User');

const searchUsers = async (req, res) => {
    const { query } = req.query;
    try {
        const users = await User.find({
            $or: [
                { name: new RegExp(query, 'i') },
                { profileType: new RegExp(query, 'i') }
            ]
        }).select('name logo followers profileType uid');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching search results' });
    }
};

const followUser = async (req, res) => {
    const { followerUid, followingUid } = req.body;
    try {
        const follower = await User.findOne({ uid: followerUid });
        const following = await User.findOne({ uid: followingUid });
        
        if (!follower || !following) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!following.followers.includes(follower._id)) {
            following.followers.push(follower._id);
            await following.save();
            res.status(200).send('Followed successfully');
        } else {
            res.status(400).json({ error: 'Already following' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error following user' });
    }
};

const getProfileByUid = async (req, res) => {
    const { uid } = req.params;
    try {
        const profile = await User.findOne({ uid });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching profile' });
    }
};

module.exports = {
    searchUsers,
    followUser,
    getProfileByUid
};