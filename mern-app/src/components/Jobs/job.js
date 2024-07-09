import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation, faIndustry, faMoneyBillWave, faLink } from '@fortawesome/free-solid-svg-icons';
import './jobs.css';

const JobCard = ({ job }) => {
    const qualificationsList = job.qualifications.split(',').map((qualification, index) => (
        <li key={index}>{qualification.trim()}</li>
    ));

    return (
        <div className='job-card'>
            <div className='job-header'>
                <h2 className='job-title'>{job.title}</h2>
                <h3 className='job-company'>{job.company.name}</h3>
            </div>
            <div className='job-details'>
                <span className='job-location quality1'><FontAwesomeIcon icon={faLocation} /> {job.location}</span>
                <span className='job-industry quality1'><FontAwesomeIcon icon={faIndustry} /> {job.industry}</span>
                <span className='job-compensation quality1'><FontAwesomeIcon icon={faMoneyBillWave} /> {job.compensation}</span>
            </div>
            <div className='job-description'>{job.description}</div>
            <div className='job-qualifications'>
                <h3>Qualifications</h3>
                <ul className='quality'>{qualificationsList}</ul>
            </div>
            <div className='job-applicants'>
                <button className='job-apply-link'><FontAwesomeIcon icon={faLink} /><a href={job.applyLink} target='_blank' rel="noreferrer"> Apply Now</a></button>
                <div className='applicants'>{job.applicants.length} Applicants</div>
            </div>
        </div>
    );
};

export default JobCard;
