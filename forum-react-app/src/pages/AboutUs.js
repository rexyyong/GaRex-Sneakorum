import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GarexSneakorumLogo from '../components/GarexSneakorumLogo';
import GarexNavbar from '../components/GarexNavbar';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import Container from '@mui/material/Container'
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {

    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const pageTitle = "Garex Sneakorum About Us Page";

      useEffect(() => {
    // Retrieve the username from local storage
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
  }, []);

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
                    localStorage.removeItem('username');
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
                    <h3>Hello {username}</h3>
                    <h4>You are successfully logged in</h4>
                    <button onClick={handleLogout}>Logout</button>
                    <GarexNavbar />
                </div>
                <Container maxWidth='lg'  >
                    <Box marginTop={2}>

                        <Typography variant="h1" gutterBottom>
                            NO MORE L'S, ONLY W'S
                        </Typography>

                        <Typography variant="h3" gutterBottom>
                            GaRex's Sneakorum is an online sneaker forum where Students in NUS can use to see the latest info on Sneaker drops, share tips on copping limited edition sneakers, and also a marketplace for buying/selling/trading such sneakers. Through this, we hope to spread our love for sneakers in NUS, and also to help students in NUS socialize through sneakers.
                        </Typography>

                    </Box>
                </Container>

            </div>
        </>
    );
};

export default AboutUs;