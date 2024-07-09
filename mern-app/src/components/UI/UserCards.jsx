import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserCards.css';
import jobSeekerImage from '../images/jobSeeker.jpg';
import recruiterImage from '../images/recruiterImage.jpg'; 
import companyImage from '../images/companyImage.jpg';

const UserCards = () => {
  const navigate = useNavigate();

  const handleCardClick = (userType) => {
    switch (userType) {
      case 'applicant':
        navigate('/applicant/register');
        break;
      case 'recruiter':
        navigate('/recruiter/register');
        break;
      case 'company':
        navigate('/company/register');
        break;
      default:
        break;
    }
  };

  return (
    <section className="user-cards-section">
      <div className="user-cards-heading">
        <h1>Welcome to JobHunt</h1>
        <p>Select your role to log in and explore opportunities tailored just for you.</p>
      </div>
      <div className="user-cards">
        <div className="card" onClick={() => navigate('/applicant/register')}>
          <div className="card-image">
            <img src={jobSeekerImage} alt="Job Seeker" />
          </div>
          <h3>Job Seeker</h3>
          <p>Find your dream job here!</p>
        </div>
        <div className="card" onClick={() => handleCardClick('recruiter')}>
          <div className="card-image">
            <img src={recruiterImage} alt="Recruiter" />
          </div>
          <h3>Recruiter</h3>
          <p>Discover the best talents!</p>
        </div>
        <div className="card" onClick={() => handleCardClick('company')}>
          <div className="card-image">
            <img src={companyImage} alt="Company" />
          </div>
          <h3>Company</h3>
          <p>Connect with job seekers and recruiters!</p>
        </div>
      </div>
    </section>
  );
};

export default UserCards;
