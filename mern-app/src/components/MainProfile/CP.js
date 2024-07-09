import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import axios from 'axios';
import './profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faGlobe, faLocation, faIndustry, faUsers, faAlignLeft, faUserFriends, faShareAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import Posts from '../Posts/posts';
import Jobs from '../Jobs/jobs';
import Ads from '../Ads/AdCards';
import CompanyAnalytics from './CompanyAnalytics';
import Loading from '../Common/Loading';

const CP = () => {
    const [user, loading] = useAuthState(auth);
    const [profile, setProfile] = useState(null); 
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/company/profile/${user.uid}`);
                    setProfile(response.data); 
                    fetchFollowersCount(response.data.id); 
                    fetchFollowingCount(response.data.id); 
                } catch (error) {
                    console.error('Error fetching profile:', error);
                    setProfile({}); 
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
        window.location.href = '/company/completeprofile';
    };

    const fetchFollowersCount = async (profileId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/company/followers/${profileId}`);
            setFollowersCount(response.data.count || 0);
        } catch (error) {
            console.error('Error fetching followers count:', error);
        }
    };

    const fetchFollowingCount = async (profileId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/company/following/${profileId}`);
            setFollowingCount(response.data.count || 0);
        } catch (error) {
            console.error('Error fetching following count:', error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        return <div>No user authenticated.</div>;
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
                <img src={profile.logo || 'https://static.vecteezy.com/system/resources/previews/002/767/731/original/jh-logo-letter-initial-logo-designs-template-free-vector.jpg'} alt="logo" />
                <h2>{profile.name || 'Company Name'}</h2>
                <button className="edit-button" onClick={handleEditProfile}><FontAwesomeIcon icon={faEdit} /> Edit Details</button>
                <button className="share-button"><FontAwesomeIcon icon={faShareAlt} /> Share</button>
            </div>
            <div className="followers-following">
                    <button className="followers-button">
                        <FontAwesomeIcon icon={faUserFriends} /> Followers ({followersCount})
                    </button>
                    <button className="following-button">
                        <FontAwesomeIcon icon={faUserFriends} /> Following ({followingCount})
                    </button>
                </div>
            <div className="profile-details">
                <div className="detail-item">
                    <FontAwesomeIcon icon={faBuilding} />
                    <span>{profile.name || 'Company Name'}</span>
                </div>
                <div className="detail-item">
                    <FontAwesomeIcon icon={faGlobe} />
                    <span>{profile.website || 'Website URL'}</span>
                </div>
                <div className="detail-item">
                    <FontAwesomeIcon icon={faLocation} />
                    <span>{profile.location || 'Location'}</span>
                </div>
                <div className="detail-item">
                    <FontAwesomeIcon icon={faIndustry} />
                    <span>{profile.industry || 'Industry'}</span>
                </div>
                <div className="detail-item">
                    <FontAwesomeIcon icon={faUsers} />
                    <span>{profile.size ? `${profile.size} employees` : 'Company Size'}</span>
                </div>
                <div className="detail-item">
                    <FontAwesomeIcon icon={faAlignLeft} />
                    <span>{profile.description || 'Company Description'}</span>
                </div>
            </div>
            <div className="profile-sections">
                <div className="profile-section">
                    <h3>Posts</h3>
                    <Posts />
                </div>
                <div className="profile-section">
                    <h3>Jobs</h3>
                    <Jobs />
                </div>
                <div className="profile-section">
                    <h3>Ads</h3>
                    <Ads />
                </div>
                <div className="profile-section">
                    <h3>Analytics</h3>
                    <CompanyAnalytics views={profile.analytics?.views || 0} clicks={profile.analytics?.clicks || 0} />
                </div>
            </div>
        </div>
    );
};

export default CP;
