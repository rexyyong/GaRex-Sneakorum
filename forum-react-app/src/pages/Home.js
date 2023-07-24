import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GarexSneakorumLogo from '../components/GarexSneakorumLogo';
import GarexNavbar from '../components/GarexNavbar';
import { useNavigate } from 'react-router-dom';

import './Home.css';

const Home = () => {
  const pageTitle = 'Garex Sneakorum Home Page';
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

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

useEffect(() => {
  const fetchUserData = async () => {
    try {
      const csrfToken = await fetchCsrfToken();
      const response = await fetch('https://garexsneakorum.onrender.com/get-session-user', {
        credentials: 'include', // Include credentials (session cookie) in the request
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
      } else {
        console.log('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Call fetchUserData whenever csrfToken changes
  fetchUserData();
}, []); // Add csrfToken as a dependency to useEffect


  const handleLogout = () => {
    // Make API request to sign out
    fetch('https://garexsneakorum.onrender.com/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include any necessary headers, such as authentication token
      },
      // Include any necessary request data, such as user ID
      // body: JSON.stringify({ userId: 123 }),
    })
      .then(response => {
        if (response.ok) {
          // Handle successful sign out
          console.log('Sign out successful');
          navigate('/signin');
        } else {
          // Handle sign out error
          console.error('Sign out error');
        }
      })
      .catch(error => {
        // Handle network or other errors
        console.error('Sign out failed:', error);
      });
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <div className="vh-100 gradient-custom">
        <div>
          <GarexSneakorumLogo />
        </div>
        <h3>Hello {username}</h3>
        <h4>You are successfully logged in</h4>
        <button onClick={handleLogout}>Logout</button>
        <GarexNavbar />

        <div className="shoeDrops">
          <h1>Latest Models</h1>
          <img
            src="https://drive.google.com/uc?id=1EAvU9vTKAorClBsnNQ86zRiyBAqwZEfb"
            alt="Nike Paris Dunk"
            className="center"
            style={{ marginBottom: '-25px' }}
          />
          <h2 style={{ marginBottom: '-15px' }}>Nike MotherFly Model 2</h2>
          <h2>$6969</h2>
        </div>
      </div>
    </>
  );
};

export default Home;
