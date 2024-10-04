// src/components/Auth/SignInUp.jsx

import  { useEffect, useState } from 'react';
import {
  
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const SignInUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInStatus, setSignInStatus] = useState('Signed out');
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setSignInStatus('Signed in');
        setUser(currentUser);
        setEmailVerified(currentUser.emailVerified);
      } else {
        setSignInStatus('Signed out');
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Optionally, send email verification
      await sendEmailVerification(auth.currentUser);
      alert('Verification email sent!');
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert('Signed out successfully');
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{signInStatus}</h2>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
          {!emailVerified && (
            <button onClick={async () => {
              await sendEmailVerification(auth.currentUser);
              alert('Verification email sent!');
            }}>
              Send Verification Email
            </button>
          )}
        </div>
      ) : (
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <br /><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <br /><br />
          <button type="submit">Sign In</button>
          <button onClick={handleSignUp}>Sign Up</button>
          <button onClick={handlePasswordReset}>Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default SignInUp;