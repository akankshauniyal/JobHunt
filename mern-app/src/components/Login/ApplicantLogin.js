import React from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import LoginForm from '../Common/LoginForm';

const ApplicantLogin = () => {
  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      window.location.href = '/applicant/dashboard';
    } catch (error) {
      alert('Error logging in', error);
    }
  };

  return <LoginForm role="Applicant" handleLogin={handleLogin} />;
};

export default ApplicantLogin;
