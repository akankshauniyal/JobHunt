import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ profile, onFollow }) => {
    return (
        <div className="profile-card">
            <img src={profile.logo} alt={`${profile.name}'s logo`} className="profile-logo" />
            <h3>{profile.name}</h3>
            <p>Followers: {profile.followers.length}</p>
            <button onClick={() => onFollow(profile._id)}>Follow</button>
        </div>
    );
};

export default ProfileCard;
