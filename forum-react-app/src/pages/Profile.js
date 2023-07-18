import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import GarexSneakorumLogo from '../components/GarexSneakorumLogo';
import GarexNavbar from '../components/GarexNavbar';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container'

const Profile = () => {

    const pageTitle = "Garex Sneakorum User Profile Page";

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <div className="vh-100 gradient-custom">
                <div>
                    <GarexSneakorumLogo />
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