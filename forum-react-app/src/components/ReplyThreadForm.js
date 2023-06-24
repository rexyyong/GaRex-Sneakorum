import React, { useState } from 'react';
import { Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CommentIcon from '@mui/icons-material/Comment';
import Cookies from 'js-cookie';

const ReplyThreadForm = ({ thread }) => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState({
    content: '',
    thread: ''
  });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    // Handle the submission of the comment here
    const csrftoken = Cookies.get('csrftoken');
    const response = await fetch(`/forum_api/createComment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify(comment)
    });
    const data = await response.json();
    // Clear the form
    setComment({
      content: '',
      thread: ''
    });
    handleClose();
  };

  const handleContentChange = (e) => {
    setComment({
      ...comment,
      content: e.target.value.replace(/\\n/g, '\n').replace(/\\"/g, '"'),
      thread: thread?.id
    });
  };

  const fabStyle = {
    margin: 2,
    top: 'auto',
    bottom: 10,
    position: 'fixed'
  };

  return (
    <div>
      <Box sx={{ justifyContent: 'flex-end', display: 'flex', mr: 2 }}>
        <Fab color="#FFC0CB" aria-label="add" sx={fabStyle} onClick={handleOpen}>
          <CommentIcon />
        </Fab>
      </Box>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>Add Comment to thread</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            placeholder="What's on your mind?"
            id="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={10}
            value={comment.content}
            onChange={handleContentChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReplyThreadForm;
