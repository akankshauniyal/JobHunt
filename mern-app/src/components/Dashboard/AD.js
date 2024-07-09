import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import axios from 'axios';
import './Dashboard.css';
import ApplicantMain from './ADMain';
import ApplicantAnalytics from '../MainProfile/ApplicantAnalytics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faFileAlt, faChartLine, faSearch, faCog, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import Loading from '../Common/Loading';
import Settings from './Settings';
import ShowPosts from './ShowPosts';
import Search from './Search';
import ShowJobs from './ShowJobs';

const ApplicantDashboard = () => {
    const [activeComponent, setActiveComponent] = useState('Dashboard');
    const [user, loading] = useAuthState(auth);
    const [profile, setProfile] = useState(null);
    const darkMode = localStorage.getItem('theme') === 'dark';

    useEffect(() => {
        document.body.className = darkMode ? 'dark-theme' : 'light-theme';
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                try {
                    const response = await axios.get(`https://jobhunt-six.vercel.app/api/applicant/profile/${user.uid}`);
                    setProfile(response.data);
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

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        return <div>No user authenticated.</div>;
    }

    if (!profile) {
        return <div>No profile data available.</div>;
    }

    const renderComponent = () => {
        switch (activeComponent) {
            case 'Dashboard':
                return <ApplicantMain />;
            case 'Posts':
                return <ShowPosts />;
            case 'Analytics':
                return <ApplicantAnalytics views={0} clicks={0} />;
            case 'Search':
                return <Search userProfile={profile} />;
            case 'Jobs':
                return <ShowJobs />;
            case 'Settings':
                return <Settings role='applicant' />;
            default:
                return <div>Welcome to the Dashboard</div>;
        }
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="logo">
                    <img src={profile.logo} alt="Logo" />
                    <h1>{profile.name}</h1>
                </div>
                <nav className="nav-menu">
                    <ul>
                        {[
                            { name: 'Dashboard', icon: faTachometerAlt },
                            { name: 'Posts', icon: faFileAlt },
                            { name: 'Analytics', icon: faChartLine },
                            { name: 'Search', icon: faSearch },
                            { name: 'Jobs', icon: faBriefcase },
                            { name: 'Settings', icon: faCog }
                        ].map(item => (
                            <li
                                key={item.name}
                                className={`nav-item ${activeComponent === item.name ? 'active' : ''}`}
                                onClick={() => setActiveComponent(item.name)}
                            >
                                <FontAwesomeIcon icon={item.icon} />
                                <span>{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            <main className="main-content-d">
                {renderComponent()}
            </main>
        </div>
    );
};

export default ApplicantDashboard;
