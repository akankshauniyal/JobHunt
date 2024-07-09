import React from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import LoginForm from '../Common/LoginForm';

const CompanyLogin = () => {
  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      window.location.href = '/company/dashboard';
    } catch (error) {
      alert('Error logging in', error);
    }
  };

  return <LoginForm role="Company" handleLogin={handleLogin} />;
};

export default CompanyLogin;
