import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { Container } from '@mui/material';

const GarexSearchbar = ({ onSearch }) => {
  const [query, setQuery] = useState(""); // Add the useState hook to manage the query state

  const handleSearchBar = () => {
    // Call the onSearch callback function and pass the search query as an argument
    console.log(query)
    onSearch(query);
  };

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
            fullWidth
            value={query} // Bind the value of the TextField to the query state
            onChange={(e) => setQuery(e.target.value)} // Update the query state on input change
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchBar(); // Trigger the search when the user presses Enter
              }
            }}
          />
        </Box>
      </Container>
    </div>
  );
};

export default GarexSearchbar;
