import React from "react";


//MUI stuff

import Grid from '@mui/material/Grid';
import { Container } from "@mui/material";
import Paper from '@mui/material/Paper';
import Box from "@mui/material";
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';


const ForumHome = () => {

    // style the paper component, found this online
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    }));


    return (
        <div style={{ marginTop: 100 }}>

            <Grid item xs={12} md={6} >
                <Typography variant="h5" >Latest Thread</Typography>


                <Item>

                </Item>

            </Grid>

        </div>

    )
}


export default ForumHome