import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GarexSneakorumLogo from '../components/GarexSneakorumLogo';
import GarexNavbar from '../components/GarexNavbar';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container'
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const pageTitle = "Garex Sneakorum User Profile Page";

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

                <Container maxWidth="lg">
                    <Typography component="h1" variant="h3" sx={{ mb: 3 }} style={{ marginTop: '20px' }}>
                        {/* {profile?.name}'s Profile */}
                        Random's Profile
                    </Typography>


                    <Card sx={{ boxShadow: 3 }}>
                        Random's List of threads

                        {/* The code here is wrong. Refer to ListThreads.js to see how we drag the threads to this page */}

                    </Card>


                </Container>


            </div>
        </>
    );
};

export default Profile;