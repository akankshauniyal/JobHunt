import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faEye, faMousePointer } from '@fortawesome/free-solid-svg-icons';
import './adCard.css';

const AdCard = ({ ad }) => {
    return (
        <div className='ad-card'>
            <div className='ad-header'>
                <h3 className='ad-company'>{ad.company.name}</h3>
                <span className='ad-date'>{new Date(ad.date).toLocaleDateString()}</span>
            </div>
            <div className='ad-content'>{ad.content}</div>
            <a href={ad.link} className='ad-link'><FontAwesomeIcon icon={faLink} /> Learn More</a>
            <div className='ad-analytics'>
                <span><FontAwesomeIcon icon={faEye} /> {ad.analytics.views} Views</span>
                <span><FontAwesomeIcon icon={faMousePointer} /> {ad.analytics.clicks} Clicks</span>
            </div>
        </div>
    );
};

export default AdCard;
