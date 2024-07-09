import React from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import RegisterForm from '../Common/RegisterForm';

const CompanyRegister = () => {
  const handleRegister = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      window.location.href = '/company/completeprofile';
    } catch (error) {
      alert('Error registering', error);
    }
  };

  return <RegisterForm role="Company" handleRegister={handleRegister} />;
};

export default CompanyRegister;
