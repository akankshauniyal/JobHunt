import React from 'react';
import { Link } from 'react-router-dom';
import '../Common/form.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const LoginForm = ({ role, handleLogin }) => {
    return (
        <div className="login-form content">
            <img src="https://static.vecteezy.com/system/resources/previews/002/767/731/original/jh-logo-letter-initial-logo-designs-template-free-vector.jpg" alt="logo"></img>
            <h2 className='text'>{role} Login</h2>
            <form onSubmit={handleLogin}>
                <div className='field'>
                    <span className="icon">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <input type="email" name="email" placeholder="Email" required />
                </div>
                <div className='field'>
                    <span className="icon">
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input type="password" name="password" placeholder="Password" required />
                </div>
                <button type="submit">Login</button>
                <div className="info">
                    <Link to="/reset">Forgot Password?</Link>
                </div>
                <div className="info">
                    Don't have an account? <Link to={`/${role.toLowerCase()}/register`}>Register</Link> now.
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
