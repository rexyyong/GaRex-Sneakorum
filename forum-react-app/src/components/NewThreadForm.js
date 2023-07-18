import React from "react";
import { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { createTheme } from '@mui/material/styles';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddBoxIcon from '@mui/icons-material/AddBox';

//related to dialog box
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// new thread button theme
const buttonTheme = createTheme({
    palette: {
        primary: {
            main: '#6a5acd',
        }
    },
});

const NewThreadForm = () => {

    //for dialog box form
    const [thread, setThread] = useState({
        subject: "",
        content: "",
    })
    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');



    //isOpen is the state, setIsOpen is the function to change the state, for popping up dialog box
    const [open, setIsOpen] = useState(false);

    //to open
    const handleOpen = () => {
        setIsOpen(true);
    };

    //to close
    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform any desired actions with the submitted data
        console.log('Subject:', thread.subject);
        console.log('Content:', thread.content);

        //clear the form
        setThread('');
        // Close the dialog
        handleClose();
    };

    let handleThread = async (event) => {
        event.preventDefault();
        const csrftoken = Cookies.get('csrftoken');
        const response = await fetch('https://garexsneakorum.onrender.com/forum_api/createThread/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(thread)
        })
        const data = await response.json()
        //clear the form
        setThread('');
        // Close the dialog
        handleClose();
  }

    return (
        <div>
            <Grid container justifyContent="flex-end">
                <Button theme={buttonTheme}
                    style={{ maxWidth: '300px', maxHeight: '40px', minWidth: '150px', minHeight: '36px' }}
                    endIcon={<AddBoxIcon />}
                    variant="contained"
                    onClick={handleOpen}
                >
                    New Thread
                </Button>

            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create New Thread</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleThread} id="NewThreadForm">
                        <TextField
                            label="Subject"
                            value={thread.subject || ""}
                            onChange={(e) => setThread({...thread, subject: e.target.value})}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Content"
                            value={thread.content || ""}
                            onChange={(e) => setThread({...thread, content: e.target.value})}
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                            required
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button
                                type="submit"
                                form="NewThreadForm"
                                variant="contained"
                                color="primary"
                                endIcon={<AddBoxIcon />} >
                                Create
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>

            </Dialog>
        </div>


    )
}

export default NewThreadForm
