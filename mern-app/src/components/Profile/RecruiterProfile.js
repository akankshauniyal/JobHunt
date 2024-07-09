import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faLocation, faUserTie, faGraduationCap, faBriefcase, faUser, faLink, faTasks, faImage } from '@fortawesome/free-solid-svg-icons';

const RecruiterProfile = () => {
    const [user, loading] = useAuthState(auth);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { fullName, profilePicture, company, about, location, position, educationDetails, yearsOfExperience, specializations, linkedInProfile } = event.target.elements;
        const email = user?.email;
        const userId = user?.uid;

        const newRecruiter = {
            userId,
            name: fullName.value,
            email,
            logo: profilePicture.value,
            company: company.value,
            about: about.value,
            location: location.value,
            position: position.value,
            educationDetails: educationDetails.value,
            yearsOfExperience: yearsOfExperience.value,
            specializations: specializations.value.split(','),
            linkedInProfile: linkedInProfile.value
        };

        try {
            await axios.post('https://jobhunt-six.vercel.app/api/recruiter', newRecruiter);
            alert("Profile Created!");
            window.location.href = '/recruiter/dashboard';
        } catch (error) {
            alert("Error submitting the form: " + error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="content">
            <h2 className="text">Complete Recruiter Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faUserTie} />
                    </span>
                    <input name="fullName" placeholder="Full Name" required />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faImage} />
                    </span>
                    <input type="text" name="profilePicture" placeholder="Profile Picture URL" required />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faBuilding} />
                    </span>
                    <input name="company" placeholder="Company" required />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faUserTie} />
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
                        <FontAwesomeIcon icon={faTasks} />
                    </span>
                    <input name="position" placeholder="Position" required />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faGraduationCap} />
                    </span>
                    <input name="educationDetails" placeholder="Education Details" required />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faBriefcase} />
                    </span>
                    <input name="yearsOfExperience" placeholder="Years of Experience" required />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input name="specializations" placeholder="Specializations (comma separated)" required />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faLink} />
                    </span>
                    <input name="linkedInProfile" placeholder="LinkedIn Profile" required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RecruiterProfile;
