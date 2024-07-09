import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';
import './projectCard.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/projects');
                setProjects(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='projects-container'>
            {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
            ))}
        </div>
    );
};

export default Projects;
