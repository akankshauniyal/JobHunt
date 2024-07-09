import React, { useState } from "react";
import './ContactUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPerson, faMessage } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="contact-container">
            <h1 className="contact-header">Contact Us</h1>
            <form className="content" onSubmit={handleSubmit}>
                <div className='field'>
                    <span className="icon">
                        <FontAwesomeIcon icon={faPerson} />
                    </span>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
                <div className='field'>
                    <span className="icon">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
                <div className='field'>
                    <span className="icon">
                        <FontAwesomeIcon icon={faMessage} />
                    </span>
                    <textarea
                        name="message"
                        rows="5"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        className="text-area"
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">Send Message</button>
            </form>
        </div>
    );
};

export default Contact;