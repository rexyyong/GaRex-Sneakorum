import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import GarexSneakorumLogo from '../components/GarexSneakorumLogo';
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import './SignIn.css'

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false); // State to track form submission

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true); // Set submitted to true when the form is submitted

    // Check if the fields are empty before submitting the form
    if (username.trim() === '' || password.trim() === '') {
      return; // Exit early if fields are empty
    }

    // Create an object with the form data
    const formData = {
      username: username,
      password: password
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Handle successful login
        console.log('Login successful');
        navigate('/home'); // Redirect to the dashboard page
      } else {
        // Handle failed login
        console.log('Login failed');
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };


  const pageTitle = "Garex Sneakorum Sign In Page";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <div className="vh-100 gradient-custom">
        <div>
          <GarexSneakorumLogo />
          <h1 style={{ textAlign: "center" }}>Welcome to Garex's Sneakorum!</h1>
        </div>

        <div className="login-form">
          <form data-testid="login-form" onSubmit={handleSubmit}>
            <h2 data-testid='login-text' className="text-center">Log in</h2>
            <div className="form-group">
              <input
                data-testid='username-input'
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                // required
              />
              {/* Display validation message for username */}
              {submitted && username.trim() === '' && (
                <div className="error-message">Please fill in the username field.</div>
              )}
            </div>
            <div className="form-group">
              <input
                data-testid='password-input'
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // required
              />
              {/* Display validation message for password */}
              {submitted && password.trim() === '' && (
                <div className="error-message">Please fill in the password field.</div>
              )}
            </div>
            <div className="form-group">
              <button data-testid='login-button' type="submit" className="btn btn-primary btn-block">
                Log in
              </button>
            </div>
            <div className="clearfix">
              <label className="pull-left checkbox-inline">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="pull-right">
                Forgot Password?
              </a>
            </div>
            <div>
              <label> </label>
            </div>
            <div className="clearfix" style={{ textAlign: "center" }}>
              <label>Don't have an account?</label>
              <a href="/signup">Register here</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
