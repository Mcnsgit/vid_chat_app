// src/pages/SignUp.jsx


import SignUpForm from '../../components/Auth/SignUpForm.jsx';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update the display name
      await updateProfile(userCredential.user, { displayName });
      // Redirect to home page
      navigate('/');
    } catch (error) {
      alert(error.message);
      console.error('Error signing up:', error);
    }
  };

  return (
    <SignUpForm onSignUp={handleSignUp} />
  );
};

export default SignUp;