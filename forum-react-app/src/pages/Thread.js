import React, { useEffect, useState } from 'react';
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
      const response = await fetch(`/forum_api/threads/${id}`);
      const data = await response.json();
      setThread(data);
    };

    fetchThread();
  }, [id]);

  // trigger posts update
  useEffect(() => {
      let getComments = async () => {
          let response = await fetch(``https://garexsneakorum.onrender.com/forum_api/threads/${id}/comments?page=${page}`)

          // parse the data in json
          let data = await response.json()

          // update the state of threads
          setComments(data.results)

          // check if there is more posts
          if (data.next === null) {
            setHasMore(false)
          }
          setPage(page + 1)
      }
      getComments ()
  }, [id])

  const getMoreComments = async () => {
    try{
      // fetch the posts from api endpoint
    const response = await fetch(`https://garexsneakorum.onrender.com/forum_api/threads/${id}/comments?page=${page}`)
    // parse the data in json
    let data = await response.json()
    console.log("fetching")

    return data.results

    } catch (err) {
      console.log("No next page.")
    }

  }

  const fetchData = async () => {
      // get more posts from next fetch
      let moreComments = await getMoreComments()

      // update the thread state by combining data
      setComments([...comments, ...moreComments])

      // check the fetch of last page, if yes, HasMore is false
      if (moreComments.length === 0 || moreComments.length < 10) {
          setHasMore(false)
      }
      setPage(page + 1)
  }

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
            dataLength={comments.length} //This is important field to render the next data
            next={fetchData}
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
