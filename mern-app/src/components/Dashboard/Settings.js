import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import axios from 'axios';
import './Dashboard.css';

const Settings = ({ role }) => {
    const [user] = useAuthState(auth);
    const [confirmation, setConfirmation] = useState(false);
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

    const handleLogout = () => {
        auth.signOut();
        window.location.href = '/';
    };

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
        document.body.className = darkMode ? 'dark-theme' : 'light-theme';
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    };

    const handleDeleteProfile = async () => {
        if (confirmation) {
            try {
                await axios.delete(`https://jobhunt-six.vercel.app/api/${role}/${user.uid}`);
                handleLogout();
            } catch (error) {
                console.error('Error deleting profile:', error);
            }
        }
    };

    const handleEditProfile = () => {
        window.location.href = `/${role}/completeprofile`;
    };

    return (
        <div className="settings-container">
            <h2>Settings</h2>
            <div className="settings-option">
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="settings-option">
                <button onClick={toggleDarkMode}>
                    Toggle {document.documentElement.getAttribute('data-theme') === 'dark' ? 'Light' : 'Dark'} Mode
                </button>
            </div>
            <div className="settings-option">
                <button onClick={() => setConfirmation(!confirmation)}>
                    {confirmation ? 'Cancel' : 'Delete Profile'}
                </button>
            </div>
            {confirmation && (
                <div className="settings-option">
                    <button onClick={handleDeleteProfile}>Confirm Delete</button>
                </div>
            )}
            <div className="settings-option">
                <button onClick={handleEditProfile}>Edit Profile</button>
            </div>
            <div className="settings-option">
                <span>Profile Creation Date: {user?.metadata.creationTime}</span>
            </div>
        </div>
    );
};

export default Settings;
