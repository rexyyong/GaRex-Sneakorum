import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import GarexSneakorumLogo from '../components/GarexSneakorumLogo';
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState(null);
  let csrfToken;

    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('https://garexsneakorum.onrender.com/authentication/get-csrf-token/');
        const data = await response.json();
        const csrfToken = data.csrfToken;
        // Use the csrfToken in your subsequent fetch requests
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

  const fetchSessionData = async () => {
    try {
      const response = await fetch('https://garexsneakorum.onrender.com/authentication/test',
      {
        method: 'GET',
        headers: {
        'X-CSRFToken': csrfToken,
      },
        credentials: 'include', // Include credentials (session cookie) in the request
      });

      if (response.ok) {
        const data = await response.json();
        // Handle session data
        console.log('Session data:', data);
      } else {
        console.log('Failed to fetch session data');
      }
    } catch (error) {
      console.error('Error fetching session data:', error);
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  // Create an object with the form data
  await fetchCsrfToken();
  const formData = {
    username: username,
    password: password
  };

  try {
    const response = await fetch('https://garexsneakorum.onrender.com/authentication/signin',
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
      console.log('Login successful');
      fetchSessionData();
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
        <GarexSneakorumLogo />
        <h1 style={{ textAlign: "center" }}>Welcome to Garex's Sneakorum!</h1>

        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center">Log in</h2>
            <div className="form-group">
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
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
