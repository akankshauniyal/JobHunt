import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Jobs/newjob.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeading, faAlignLeft, faLink } from '@fortawesome/free-solid-svg-icons';
import Loading from '../Common/Loading';

const AddPostForm = () => {
    const [user, loading] = useAuthState(auth);
    const { role } = useParams();
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        author: { profilePicture: '', name: '' },
        title: '',
        description: '',
        link: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                try {
                    const response = await axios.get(`https://jobhunt-six.vercel.app/api/${role}/profile/${user.uid}`);
                    const profileData = response.data;
                    setProfile(profileData);
                    setFormData({
                        ...formData,
                        author: { profilePicture: profileData.logo, name: profileData.name },
                    });
                } catch (error) {
                    console.error('Error fetching profile:', error);
                }
            }
        };

        if (!loading) {
            fetchProfile();
        }
    }, [user, loading, role]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const way = `/${role}/dashboard`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://jobhunt-six.vercel.app/api/posts', formData);
            alert('Post added: ' + response.data);
            window.location.href = way;
        } catch (error) {
            alert('Error adding post: ' + error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        return <div>No user authenticated.</div>;
    }

    if (!profile) {
        return <div>Loading profile data...</div>;
    }

    return (
        <div className="content">
            <form onSubmit={handleSubmit}>
                <div className="text">Add Post</div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faHeading} />
                    </span>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faAlignLeft} />
                    </span>
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faLink} />
                    </span>
                    <input
                        type="text"
                        name="link"
                        placeholder="Link"
                        value={formData.link}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Post</button>
            </form>
            <div className="info">
                <a href={way} >Back to Dashboard</a>
            </div>
        </div>
    );
};

export default AddPostForm;
