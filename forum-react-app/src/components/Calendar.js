import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import ItemData from './ItemData'; // Create an itemData.js file with sample data

const ItemBox = ({ image, description, price, release_date, link }) => (
    <Box sx={{ textAlign: 'center' }}>
        <a href={link} target="_blank" rel="noopener noreferrer" >
            <img src={image} alt="Item" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <Typography variant="body1" mt={2}>
                {description}
            </Typography>
            <Typography variant="body1">
                {price}
            </Typography>
            <Typography variant="body1">
                {release_date}
            </Typography>
        </a>
    </Box>
);

const Calendar = () => {
    return (
        <Container maxWidth="md">
            <Grid container spacing={2}>
                {ItemData.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <ItemBox image={item.image} description={item.description} price={item.price} release_date={item.release_date} link={item.link} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Calendar;
