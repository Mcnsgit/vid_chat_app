// src/components/Auth/firebase.jsx

import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebaseConfig';



const SignInUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInStatus, setSignInStatus] = useState('');
  const [accountDetails, setAccountDetails] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => { 

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignInStatus('Signed in');
        setAccountDetails(user);
        setEmailVerified(user.emailVerified);
      } else {
        setSignInStatus('Signed out');
        setAccountDetails(null);
      }
    });
  }, []);

  const handleSignIn = (event) => {
    event.preventDefault();
    if (auth.currentUser) {
      signOut(auth);
    } else {
      signInWithEmailAndPassword(auth, email, password).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    }
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  };

  const handleSendVerificationEmail = () => {
    sendEmailVerification(auth, accountDetails).then(() => {
      alert('Email Verification Sent!');
    });
  };

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Password Reset Email Sent!');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode === 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSignIn}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Sign in</button>
        <button onClick={handleSignUp}>Sign up</button>
        <button onClick={handleSendVerificationEmail} disabled={emailVerified}>
          Verify email
        </button>
        <button onClick={handlePasswordReset}>Reset password</button>
      </form>
      <p>{signInStatus}</p>
      <pre>{JSON.stringify(accountDetails, null, '  ')}</pre>
    </div>
  );
};

export default SignInUp;

