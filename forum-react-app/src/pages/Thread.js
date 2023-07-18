import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { CardContent, CardActions, Typography, Container, Grid, IconButton, Card } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import GarexNavbar from '../components/GarexNavbar';
import GarexSneakorumLogo from '../components/GarexSneakorumLogo';
import ReplyThreadForm from '../components/ReplyThreadForm';
import ListComments from '../components/ListComments';
import InfiniteScroll from 'react-infinite-scroll-component';

const Thread = () => {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchThread = async () => {
      const response = await fetch(`https://garexsneakorum.onrender.com/forum_api/threads/${id}`);
      const data = await response.json();
      setThread(data.results);
    };

    fetchThread();
  }, [id]);

  const getComments = useCallback(async () => {
    const response = await fetch(`https://garexsneakorum.onrender.com/forum_api/threads/${id}/comments?page=${page}`);
    const data = await response.json();
    setComments((prevComments) => [...prevComments, ...data.results]);

    if (data.next === null) {
      setHasMore(false);
    } else {
      setPage((prevPage) => prevPage + 1);
    }
  }, [id, page]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <div className="vh-100 gradient-custom">
      <GarexSneakorumLogo />
      <GarexNavbar />

      <div style={{ marginTop: 100 }}>
        <Container>
          <Card sx={{ minWidth: 300, marginTop: 3 }} elevation={3}>
            <CardContent>
              <Grid container justifyContent="space-between">
                <Typography sx={{ m: 1, p: 1 }} variant="h6" component="div">
                  {thread?.subject}
                </Typography>

                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              </Grid>

              <Typography style={{ whiteSpace: 'pre-line' }} sx={{ m: 1, p: 1 }} variant="body1">
                {thread?.content}
              </Typography>
            </CardContent>

            <CardActions sx={{ marginBottom: 2, marginRight: 3 }}>
              <Grid container justifyContent="flex-end">
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </Grid>
            </CardActions>
          </Card>

          <ReplyThreadForm thread={thread} />

          <InfiniteScroll
            dataLength={comments.length}
            next={getComments}
            hasMore={hasMore}
            loader={<h4 style={{ textAlign: 'center', marginTop: 20 }}>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center', marginTop: 40 }} className="text-muted">
                You have seen all the comments.
              </p>
            }
          >
            <div style={{ padding: 1 }}>
              {comments.map((comment, index) => (
                <ListComments key={index} comment={comment} />
              ))}
            </div>
          </InfiniteScroll>
        </Container>
      </div>
    </div>
  );
};

export default Thread;
