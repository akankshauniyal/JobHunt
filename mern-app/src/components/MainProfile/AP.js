import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import axios from 'axios';
import './profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLocation, faGraduationCap, faBriefcase, faTools, faLink, faBullseye, faUserFriends, faShareAlt } from '@fortawesome/free-solid-svg-icons';

const AP = () => {
    const [user, loading] = useAuthState(auth);
    const [profile, setProfile] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/applicant/profile/${user.uid}`);
                    setProfile(response.data || null);
                } catch (error) {
                    console.error('Error fetching profile:', error);
                }
            }
        };

        if (!loading) {
            fetchProfile();
        }
    }, [user, loading]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.setAttribute('data-theme', darkMode ? 'light' : 'dark');
    };

    const handleEditProfile = () => {
        window.location.href = '/applicant/completeprofile'; 
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profile) {
        return <div>No profile data available.</div>;
    }

    return (
        <div className={`profile-page ${darkMode ? 'dark-mode' : ''}`}>
            <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <div className="profile-header">
                <img src={profile.profilePicture || 'https://via.placeholder.com/150'} alt="profile" />
                <h2>{profile.fullName}</h2>
                <button className="edit-button" onClick={handleEditProfile}>Edit Details</button>
                <button className="share-button"><FontAwesomeIcon icon={faShareAlt} /> Share</button>
            </div>
            <div className="followers-following">
                <button className="followers-button">
                    <FontAwesomeIcon icon={faUserFriends} /> Followers
                </button>
                <button className="following-button">
                    <FontAwesomeIcon icon={faUserFriends} /> Following
                </button>
            </div>
            <div className="profile-details">
                <div className="detail-item">
                    <FontAwesomeIcon icon={faUser} />
                    <span>{profile.fullName}</span>
                </div>
                <div className="detail-item">
                    <FontAwesomeIcon icon={faLocation} />
                    <span>{profile.location}</span>
                </div>
                <div className="detail-item">
                    <FontAwesomeIcon icon={faGraduationCap} />
                    <span>{profile.educationDetails}</span>
                </div>
                <div className="detail-item">
                    <FontAwesomeIcon icon={faBriefcase} />
                    <span>{profile.experience}</span>
                </div>
                <div className="detail-item">
                    <FontAwesomeIcon icon={faTools} />
                    <span>{profile.skills ? profile.skills.join(', ') : 'No skills specified'}</span>
                </div>
                <div className="detail-item">
                    <FontAwesomeIcon icon={faLink} />
                    <span>{profile.linkedInProfile || 'No LinkedIn profile specified'}</span>
                </div>
                <div className="detail-item">
                    <FontAwesomeIcon icon={faBullseye} />
                    <span>{profile.goals}</span>
                </div>
                <div className="detail-item">
                    <FontAwesomeIcon icon={faUserFriends} />
                    <span>{profile.followers} followers</span>
                </div>
            </div>
            <div className="profile-sections">
                <div className="profile-section">
                    <h3>Posts</h3>
                    {/* Render posts here */}
                </div>
                <div className="profile-section">
                    <h3>Projects</h3>
                    {/* Render projects here */}
                </div>
            </div>
        </div>
    );
};

export default AP;
