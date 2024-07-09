import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faCodeBranch, faTools } from '@fortawesome/free-solid-svg-icons';
import './projectCard.css';

const ProjectCard = ({ project }) => {
    return (
        <div className='project-card'>
            <div className='project-header'>
                <h2 className='project-title'>{project.title}</h2>
                <span className='project-date'>{new Date(project.date).toLocaleDateString()}</span>
            </div>
            <div className='project-links'>
                {project.liveLink && <a href={project.liveLink} className='project-link'><FontAwesomeIcon icon={faLink} /> Live</a>}
                {project.githubLink && <a href={project.githubLink} className='project-link'><FontAwesomeIcon icon={faCodeBranch} /> GitHub</a>}
            </div>
            <div className='project-technologies'>
                {project.technologiesUsed.map((tech, index) => (
                    <span key={index} className='technology'><FontAwesomeIcon icon={faTools} /> {tech}</span>
                ))}
            </div>
            <div className='project-description'>{project.description}</div>
        </div>
    );
};

export default ProjectCard;
