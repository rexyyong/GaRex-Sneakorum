import React, { useState } from "react";
import Cookies from 'js-cookie';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { createTheme } from '@mui/material/styles';
import AddBoxIcon from '@mui/icons-material/AddBox';

// related to dialog box
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: '#6a5acd',
    },
  },
});

const NewThreadForm = ({ setRefreshFlag }) => {
  const [open, setOpen] = useState(false);
  const [thread, setThread] = useState({
    subject: "",
    content: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Subject:', thread.subject);
    console.log('Content:', thread.content);

    setThread({
      subject: "",
      content: "",
    });
    handleClose();
  };

  const handleThread = async (event) => {
    event.preventDefault();
    const csrftoken = Cookies.get('csrftoken');
    const response = await fetch('https://garexsneakorum.onrender.com/forum_api/createThread/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(thread),
    });
    const data = await response.json();
    setThread({
      subject: "",
      content: "",
    });
    setRefreshFlag((prevFlag) => !prevFlag);
    handleClose();
  };

  return (
    <div>
      <Grid container justifyContent="flex-end">
        <Button
          theme={buttonTheme}
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
              value={thread.subject}
              onChange={(e) => setThread({ ...thread, subject: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Content"
              value={thread.content}
              onChange={(e) => setThread({ ...thread, content: e.target.value })}
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
              >
                Create
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewThreadForm;
