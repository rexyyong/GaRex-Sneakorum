import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';




function GarexSearchbar() {

    const [keyword, searchKeyword] = useState({
        keyword: '',
    })

    const handleSearch = (event) => {
        event.preventDefault();
        if (keyword.keyword !== '') {
            console.log('Keyword:', keyword.keyword);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        searchKeyword((prevKeyword) => ({
            [name]: value,
        }));

    }

    return (

        <div>
            <div>
                <Typography align="center" mt={2} variant="h5">Search Threads</Typography>
            </div>

            <form onSubmit={handleSearch}>
                <Container maxWidth="md">
                    <Box display="flex" justifyContent="center" >
                        <TextField
                            label="Key in keywords to search for thread"
                            name='keyword'
                            value={keyword.keyword}
                            onChange={handleChange}
                            margin="none"
                            id="outlined-search"
                            variant='filled'
                            type="search"
                            color="success"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth />
                    </Box>
                </Container>
            </form>
        </div>
    )
}

export default GarexSearchbar