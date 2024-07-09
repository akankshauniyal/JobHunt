import React, { useState } from 'react';
import axios from 'axios';
import './newjob.css';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faMapMarkerAlt, faIndustry, faAlignLeft, faDollarSign, faLink } from '@fortawesome/free-solid-svg-icons';

const NewJob = () => {
    const { role } = useParams();
    const way = `/${role}/dashboard`;
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        industry: '',
        description: '',
        qualifications: '',
        compensation: '',
        applyLink: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://jobhunt-six.vercel.app/api/jobs', formData);
            alert('Job added:' + response.data);
            window.location.href = way;
        } catch (error) {
            alert('Error adding job:' + error);
        }
    };

    return (
        <div className="content">
            <form onSubmit={handleSubmit}>
                <div className="text">Add Job</div>
                <div className="field">
                    <span className='icon'>
                    <FontAwesomeIcon icon={faBuilding} style={{ color: 'var(--primary-text)' }} />
                    </span>
                    <input
                        type="text"
                        name="title"
                        placeholder="Job Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field">
                    <span className='icon'>
                    <FontAwesomeIcon icon={faBuilding} style={{ color: 'var(--primary-text)' }} />
                    </span>
                    <input
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field">
                <span className='icon'>
                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: 'var(--primary-text)' }} />
                    </span>
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field">
                <span className='icon'>
                    <FontAwesomeIcon icon={faIndustry} style={{ color: 'var(--primary-text)' }} />
                    </span>
                    <input
                        type="text"
                        name="industry"
                        placeholder="Industry"
                        value={formData.industry}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field">
                <span className='icon'>
                    <FontAwesomeIcon icon={faAlignLeft} style={{ color: 'var(--primary-text)' }} />
                    </span>
                    <textarea
                        name="description"
                        placeholder="Job Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field">
                <span className='icon'>
                    <FontAwesomeIcon icon={faAlignLeft} style={{ color: 'var(--primary-text)' }} />
                    </span>
                    <textarea
                        name="qualifications"
                        placeholder="Qualifications"
                        value={formData.qualifications}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field">
                <span className='icon'>
                    <FontAwesomeIcon icon={faDollarSign} style={{ color: 'var(--primary-text)' }} />
                    </span>
                    <input
                        type="text"
                        name="compensation"
                        placeholder="Compensation"
                        value={formData.compensation}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field">
                <span className='icon'>
                    <FontAwesomeIcon icon={faLink} style={{ color: 'var(--primary-text)' }} />
                    </span>
                    <input
                        type="text"
                        name="applyLink"
                        placeholder="Apply Link"
                        value={formData.applyLink}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Job</button>
            </form>
            <div className="info">
                <a href={way}>Back to Dashboard</a>
            </div>
        </div>
    );
};

export default NewJob;
