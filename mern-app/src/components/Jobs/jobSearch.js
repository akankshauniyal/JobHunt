import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './jobSearch.css';

const JobSearch = () => {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [industry, setIndustry] = useState('');
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('https://jobhunt-six.vercel.app/api/jobs');
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    const handleSearch = () => {
        const filteredJobs = jobs.filter(job => 
            (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             job.company.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
            job.location.toLowerCase().includes(location.toLowerCase()) &&
            job.industry.toLowerCase().includes(industry.toLowerCase())
        );
        setJobs(filteredJobs);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.setAttribute('data-theme', darkMode ? 'light' : 'dark');
    };

    return (
        <div className={`job-search-container ${darkMode ? 'dark-mode' : ''}`}>
            <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search job title or company" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="Location" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="Industry" 
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="job-listings">
                {jobs.map(job => (
                    <div key={job._id} className="job-card">
                        <div className="job-header">
                            <h3>{job.title}</h3>
                            <p>{job.company.name}</p>
                        </div>
                        <div className="job-details">
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Industry:</strong> {job.industry}</p>
                            <p><strong>Description:</strong> {job.description}</p>
                            <p><strong>Qualifications:</strong> {job.qualifications}</p>
                            <p><strong>Compensation:</strong> {job.compensation}</p>
                        </div>
                        <div className="job-footer">
                            <a href={job.applyLink} target="_blank" rel="noopener noreferrer">Apply Now</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobSearch;
