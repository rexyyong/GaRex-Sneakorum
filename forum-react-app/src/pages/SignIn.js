import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import GarexSneakorumLogo from '../components/GarexSneakorumLogo';
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';


import './SignIn.css'

import './SignIn.css'

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false); // State to track form submission

  const navigate = useNavigate();
  const [wrongPasswordAlert, setPasswordAlert] = useState(false);
  const [submitted, setSubmitted] = useState(false); // State to track form submission


  const fetchCsrfToken = async () => {
    try {
      const response = await fetch('https://garexsneakorum.onrender.com/get-csrf-token');
      const data = await response.json();
      return data.csrfToken;
      // Use the csrfToken in your subsequent fetch requests
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true); // Set submitted to true when the form is submitted

    // Check if the fields are empty before submitting the form
    if (username.trim() === '' || password.trim() === '') {
      return; // Exit early if fields are empty
    }

    // Create an object with the form data
    const csrfToken = await fetchCsrfToken();
    const formData = {
      username: username,
      password: password
    };

    try {
      const response = await fetch('https://garexsneakorum.onrender.com/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          body: JSON.stringify(formData)
        });

      if (response.ok) {
        // Handle successful login
        const responseData = await response.json();
        const receivedUsername = responseData.username; // Get the username from the response
        // Store the received username in local storage
        localStorage.setItem('username', receivedUsername);
        console.log('Login successful');
        await fetch('https://garexsneakorum.onrender.com/test', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
        });
        navigate('/home'); // Redirect to the dashboard page
      } else {
        // Handle failed login
        console.log('Login failed');
        setPasswordAlert(true);
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const handleCloseAlert = () => {
    setPasswordAlert(false);
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
            <div>
              <Snackbar
                open={wrongPasswordAlert}
                autoHideDuration={5000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <Alert onClose={handleCloseAlert} severity="warning">
                  Please key in the correct username/password!
                </Alert>
              </Snackbar>
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
