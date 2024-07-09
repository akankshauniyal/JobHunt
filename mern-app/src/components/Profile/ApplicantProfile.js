import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLocation, faGraduationCap, faBriefcase, faTools, faLink, faBullseye, faFileAlt, faImage } from '@fortawesome/free-solid-svg-icons';

const ApplicantProfile = () => {
    const [user, loading] = useAuthState(auth);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { fullName, profilePicture, about, location, resume, education, experience, skills, linkedInProfile, desiredJobTitle } = event.target.elements;
        const email = user?.email;
        const userId = user?.uid;

        const newApplicant = {
            userId,
            name: fullName.value,
            email,
            logo: profilePicture.value, 
            about: about.value,
            location: location.value,
            resume: resume.value, 
            education: education.value,
            experience: experience.value,
            skills: skills.value.split(','),
            linkedInProfile: linkedInProfile.value,
            desiredJobTitle: desiredJobTitle.value
        };

        try {
            await axios.post('https://jobhunt-six.vercel.app/api/applicant', newApplicant);
            alert("Profile Created!");
            window.location.href = '/applicant/dashboard';
        } catch (error) {
            alert("Error submitting the form: " + error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="content">
            <h2 className="text">Complete Applicant Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input name="fullName" placeholder="Full Name" required />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faImage} />
                    </span>
                    <input type="url" name="profilePicture" placeholder="Profile Picture URL" required />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <textarea name="about" placeholder="About" required />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faLocation} />
                    </span>
                    <input name="location" placeholder="Location" required />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faFileAlt} />
                    </span>
                    <input type="url" name="resume" placeholder="Resume URL" required />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faGraduationCap} />
                    </span>
                    <input name="education" placeholder="Education" required />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faBriefcase} />
                    </span>
                    <input name="experience" placeholder="Experience" required />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faTools} />
                    </span>
                    <input name="skills" placeholder="Skills (comma separated)" required />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faLink} />
                    </span>
                    <input name="linkedInProfile" placeholder="LinkedIn Profile" required />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faBullseye} />
                    </span>
                    <input name="desiredJobTitle" placeholder="Desired Job Title" required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ApplicantProfile;
