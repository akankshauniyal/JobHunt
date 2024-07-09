import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../Jobs/job';
import '../Posts/post.css';

const ShowJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('https://jobhunt-six.vercel.app/api/jobs');
                setJobs(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='posts-container-main'>
            {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
            ))}
        </div>
    );
};

export default ShowJobs;
