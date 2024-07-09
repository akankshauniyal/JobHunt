import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import axios from 'axios';
import '../MainProfile/profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faGlobe, faLocation, faIndustry, faUsers, faAlignLeft, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Posts from '../Posts/posts';
import Jobs from '../Jobs/jobs';
import Loading from '../Common/Loading';

const CDMain = () => {
    const [user, loading] = useAuthState(auth);
    const [profile, setProfile] = useState(null);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                try {
                    const response = await axios.get(`https://jobhunt-six.vercel.app/api/company/profile/${user.uid}`);
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

    const fetchFollowersCount = async (profileId) => {
        try {
            const response = await axios.get(`https://jobhunt-six.vercel.app/api/company/followers/${profileId}`);
            setFollowersCount(response.data.count || 0);
        } catch (error) {
            console.error('Error fetching followers count:', error);
        }
    };

    const fetchFollowingCount = async (profileId) => {
        try {
            const response = await axios.get(`https://jobhunt-six.vercel.app/api/company/following/${profileId}`);
            setFollowingCount(response.data.count || 0);
        } catch (error) {
            console.error('Error fetching following count:', error);
        }
    };

    const handleNewPost = () => {
        window.location.href = '/add-newPost/company';
    };

    const handleNewJob = () => {
        window.location.href = '/add-newJob/company';
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
        <div className={'profile-page'}>
            <div className="profile-details">
                <div className="detail-item">
                    <div>
                        <FontAwesomeIcon icon={faUserFriends} size='2x' />
                        <span className='first-span'>{followersCount}</span>
                    </div>
                    <span className='second-span'>Followers</span>
                </div>
                <div className="detail-item">
                    <div>
                        <FontAwesomeIcon icon={faUserFriends} size='2x' />
                        <span className='first-span'>{followingCount}</span>
                    </div>
                    <span className='second-span'>Following</span>
                </div>
                <div className="detail-item">
                    <div>
                        <FontAwesomeIcon icon={faGlobe} size='2x' />
                        <span className='first-span'>{profile.website}</span>
                    </div>
                    <span className='second-span'>Website</span>
                </div>
                <div className="detail-item">
                    <div>
                        <FontAwesomeIcon icon={faLocation} size='2x' />
                        <span className='first-span'>{profile.location}</span>
                    </div>
                    <span className='second-span'>Location</span>
                </div>
                <div className="detail-item">
                    <div>
                        <FontAwesomeIcon icon={faIndustry} size='2x' />
                        <span className='first-span'>{profile.industry}</span>
                    </div>
                    <span className='second-span'>Industry</span>
                </div>
                <div className="detail-item">
                    <div>
                        <FontAwesomeIcon icon={faUsers} size='2x' />
                        <span className='first-span'>{profile.size}+</span>
                    </div>
                    <span className='second-span'>Employees</span>
                </div>
                <div className="detail-item about-field">
                    <div>
                        <FontAwesomeIcon icon={faAlignLeft} size='2x' />
                        <span className='first-span'>{profile.description}</span>
                    </div>
                    <span className='second-span'>About</span>
                </div>
            </div>
            <div className="profile-sections">
                <div className="profile-section posts-sec">
                    <div className='top-title'>
                        <h2>Posts</h2>
                        <div className='add-post' onClick={handleNewPost} >
                                <FontAwesomeIcon icon={faPlus} />
                                <span>Add Post</span>
                        </div>
                    </div>
                    <Posts profile={profile} />
                </div>
                <div className="profile-section">
                    <div className='top-title'>
                        <h2>Jobs</h2>
                        <div className='add-post' onClick={handleNewJob}>
                            <FontAwesomeIcon icon={faPlus} />
                            <span>Add Job</span>
                        </div>
                    </div>
                    <Jobs profile={profile} />
                </div>
            </div>
        </div>
    );
};

export default CDMain;
