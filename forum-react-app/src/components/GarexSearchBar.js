import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { Container } from '@mui/material';



function GarexSearchbar() {
    return (

        <div>
            <div>
                <Typography align="center" mt={2} variant="h5">Search Threads</Typography>
            </div>
            <Container maxWidth="md">
                <Box display="flex" justifyContent="center" >
                    <TextField
                        margin="none"
                        id="outlined-search"
                        label="Key in keywords to search for thread"
                        type="search"
                        color="success"
                        fullWidth />
                </Box>
            </Container>
        </div>
    )
}

export default GarexSearchbar