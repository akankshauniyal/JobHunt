import React from "react";
import './About.css';

const AboutMain = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        Welcome to JobHunt, your ultimate platform for job seekers and recruiters. Our mission is to connect top talents with leading companies to create a seamless job search experience. Whether you are looking for your dream job or the perfect candidate, we are here to help.
      </div>
      <div className="team-section">
        <div className="team-member">
          <img src="https://static.vecteezy.com/system/resources/previews/002/767/731/original/jh-logo-letter-initial-logo-designs-template-free-vector.jpg" alt="Team Member" className="team-image" />
          <h2 className="team-name">Ikansh Goyal</h2>
          <p className="team-role">Web Developer</p>
        </div>
        <div className="team-member">
          <img src="https://static.vecteezy.com/system/resources/previews/002/767/731/original/jh-logo-letter-initial-logo-designs-template-free-vector.jpg" alt="Team Member" className="team-image" />
          <h2 className="team-name">Akanksha Uniyal</h2>
          <p className="team-role">Web Developer</p>
        </div>
      </div>
    </div>
  );
};

export default AboutMain;