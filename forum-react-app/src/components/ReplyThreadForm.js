import React, { useState } from 'react';
import {
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CommentIcon from '@mui/icons-material/Comment';

const ReplyThreadForum = () => {
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = () => {
        // Handle the submission of the comment here
        console.log('Comment:', comment);
        //clear the form
        setComment('')
        handleClose();
    };

       // add reply button style and theme
   const fabStyle = {
    margin: 2,
    top: 'auto',
    bottom: 10,
    position: 'fixed'
  };


    return (
        <div>

            {/* The part for the add comment fab button */}
            <Box sx={{ justifyContent: 'flex-end', display: 'flex', mr: 2 }}>
                <Fab color="#FFC0CB" aria-label="add" sx = {fabStyle} onClick={handleOpen}>
                    <CommentIcon />
                </Fab>
            </Box>

            {/* Dialog form code */}
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
                        variant='standard'
                        multiline
                        rows={10}
                        value={comment}
                        onChange={handleCommentChange}
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

export default ReplyThreadForum;
