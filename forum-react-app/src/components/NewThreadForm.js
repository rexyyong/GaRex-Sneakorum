import React from "react";

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { createTheme } from '@mui/material/styles';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddBoxIcon from '@mui/icons-material/AddBox';

// new thread button theme
const buttonTheme = createTheme({
    palette: {
        primary: {
            main: '#6a5acd',
        }
    },
});

const NewThreadForm = () => {
    return (
        <div>
            <Grid container justifyContent="flex-end">
                <Button theme={buttonTheme}
                    style={{ maxWidth: '300px', maxHeight: '40px', minWidth: '150px', minHeight: '36px'  }}
                    endIcon={<AddBoxIcon />}
                    variant="contained"
                >
                    New Thread
                </Button>

            </Grid>
        </div>
    )
}

export default NewThreadForm