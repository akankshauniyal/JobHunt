import React from 'react';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import './form.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ResetPassword = () => {
	const handleResetPassword = async (event) => {
		event.preventDefault();
		const { email } = event.target.elements;
		try {
			await sendPasswordResetEmail(auth, email.value);
			alert('Password reset email sent');
		} catch (error) {
			alert('Error sending password reset email', error);
		}
	};

	return (
		<div className="reset-password-form content">
			<img src="https://static.vecteezy.com/system/resources/previews/002/767/731/original/jh-logo-letter-initial-logo-designs-template-free-vector.jpg" alt="logo"></img>
			<h2 className='text'>Reset Password</h2>
			<form onSubmit={handleResetPassword}>
				<div className='field'>
					<span className="icon">
						<FontAwesomeIcon icon={faEnvelope} />
					</span>
					<input type="email" name="email" placeholder="Email" required />
				</div>
				<button type="submit">Send Password Reset Email</button>
			</form>
		</div>
	);
};

export default ResetPassword;
