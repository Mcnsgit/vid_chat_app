/* eslint-disable react/no-unescaped-entities */
// src/pages/LoginPage.jsx

import  { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to the home page or dashboard
      navigate('/');
    } catch (error) {
      console.error('Login error:', error.message);
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
      <Typography variant="body1" style={{ marginTop: `1rem` }}>
        Don't have an account? <a href="/register">Register</a>
      </Typography>
    </div>
  );
}

export default LoginPage;