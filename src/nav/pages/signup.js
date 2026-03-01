import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/signup.css';

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [voter, setVoter] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getErrorMessage = (err, fallback) =>
    err?.response?.data?.message || fallback;

  async function submit(e) {
    e.preventDefault();

    if (isSubmitting) return; // ✅ Prevent double submit

    setError('');
    setMessage('');

    const cleanName = name.trim();
    const cleanVoter = voter.trim().toUpperCase();
    const cleanEmail = email.trim();

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(cleanEmail)) {
      setError('Invalid email format.');
      return;
    }

    const voterRegex = /^([A-Z]{3}\d{7})$/;
    if (!voterRegex.test(cleanVoter)) {
      setError('Invalid Voter ID format. Use ABC1234567 format.');
      return;
    }

    // ✅ Strong password validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== reenterPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post(
        'http://localhost:5000/api/signup',
        {
          name: cleanName,
          email: cleanEmail,
          voterId: cleanVoter,
          password,
        }
      );

      setMessage(response.data.message || 'Account created successfully.');

      // ✅ Smooth UX delay
      setTimeout(() => navigate('/login'), 1000);

    } catch (err) {
      setError(
        getErrorMessage(err, 'Signup failed. Please try again.')
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="signup-page-wrapper">
      <div className="signup-container">

        <h1 className="signup-title">Sign Up</h1>

        <form onSubmit={submit}>

          {error && <p className="error-message">{error}</p>}
          {message && <p className="info-message">{message}</p>}

          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Voter ID:</label>
            <input
              type="text"
              placeholder="e.g., ABC1234567"
              value={voter}
              onChange={(e) => setVoter(e.target.value.toUpperCase())}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Re-enter Password:</label>
            <input
              type="password"
              placeholder="Re-enter your Password"
              value={reenterPassword}
              onChange={(e) => setReenterPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="signup-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;