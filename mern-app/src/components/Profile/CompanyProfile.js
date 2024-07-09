import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation, faBuilding, faGlobe, faIndustry, faUsers, faAlignLeft } from '@fortawesome/free-solid-svg-icons';

const CompanyProfile = () => {
    const [user, loading] = useAuthState(auth);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, website, logo, location, industry, size, description } = event.target.elements;
        const email = user?.email;
        const userId = user?.uid;

        const newCompany = {
            userId,
            name: name.value,
            email,
            website: website.value,
            logo: logo.value, 
            location: location.value,
            industry: industry.value,
            size: size.value,
            description: description.value
        };

        try {
            console.log(newCompany);
            await axios.post('https://jobhunt-six.vercel.app/api/company', newCompany);
            alert("Profile Created!");
            window.location.href = '/company/dashboard';
        } catch (error) {
            alert("Error submitting the form: " + error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="content">
            <img src="https://static.vecteezy.com/system/resources/previews/002/767/731/original/jh-logo-letter-initial-logo-designs-template-free-vector.jpg" alt="logo" />
            <h2 className="text">Complete Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faBuilding} />
                    </span>
                    <input name="name" placeholder="Name" required />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faGlobe} />
                    </span>
                    <input type="text" name="website" placeholder="Website" required />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faBuilding} />
                    </span>
                    <input type="text" name="logo" placeholder="Enter image url" />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faLocation} />
                    </span>
                    <input name="location" placeholder="Location" required />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faIndustry} />
                    </span>
                    <input name="industry" placeholder="Industry" required />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faUsers} />
                    </span>
                    <input type="number" name="size" placeholder="Employees" required />
                </div>
                <div className="field">
                    <span className="icon">
                        <FontAwesomeIcon icon={faAlignLeft} />
                    </span>
                    <textarea name="description" placeholder="Description" required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CompanyProfile;
