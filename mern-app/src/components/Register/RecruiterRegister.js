import React from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import RegisterForm from '../Common/RegisterForm';

const RecruiterRegister = () => {
  const handleRegister = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      window.location.href = '/recruiter/completeprofile';
    } catch (error) {
      alert('Error registering', error);
    }
  };

  return <RegisterForm role="Recruiter" handleRegister={handleRegister} />;
};

export default RecruiterRegister;
