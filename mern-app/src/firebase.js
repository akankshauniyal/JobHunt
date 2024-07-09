import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCHfjtTFKUdgUfhVPFA5TahYtnyDbxVQHw",
  authDomain: "job-hunt-2024.firebaseapp.com",
  projectId: "job-hunt-2024",
  storageBucket: "job-hunt-2024.appspot.com",
  messagingSenderId: "416658707104",
  appId: "1:416658707104:web:fe8f445666f6ec18fb6fc5",
  measurementId: "G-Y4X2XTDWTF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
