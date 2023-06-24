import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import NewThreadForm from "../components/NewThreadForm";
import GarexSneakorumLogo from "../components/GarexSneakorumLogo";
import GarexNavbar from "../components/GarexNavbar";
import InfiniteScroll from "react-infinite-scroll-component";
import ListThreads from "../components/ListThreads";
import './ForumHome.css'

const ForumHome = () => {
  const [threads, setThreads] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
      const getThreads = async () => {
          // fetch the threads from api endpoint
          const response = await fetch(`/forum_api/threads/?page=1`)

          // parse the data in json
          let data = await response.json()

          // update the state of threads
          setThreads(data.results)

           // check if there is more threads
           if (data.next === null) {
            setHasMore(false)
          }
      }
      getThreads()

  }, [])

  const getMoreThreads = async () => {
      // fetch the threads from api endpoint
      const response = await fetch(`/forum_api/threads/?page=${page}`)
      // parse the data in json
      let data = await response.json()

      console.log("fetching")

      return data.results
  }

  const getData = async () => {
      // get more threads from next fetch
      const moreThreads = await getMoreThreads()

      // update the thread state by combining data
    setThreads(prevThreads => {
      // Check if both prevThreads and moreThreads are defined and iterable
      if (prevThreads && moreThreads && Array.isArray(prevThreads) && Array.isArray(moreThreads)) {
        return [...prevThreads, ...moreThreads];
      } else if (moreThreads && Array.isArray(moreThreads)) {
        return moreThreads; // Only moreThreads is defined, so use it as the new threads array
      } else {
        return prevThreads; // Return the previous threads array as fallback
      }
    });

      // check the fetch of last page, if yes, HasMore is false
      if (moreThreads.length === 0 || moreThreads.length < 15) {
          setHasMore(false)
      }
      setPage(page + 1)
  }


  useEffect(() => {
    getData();
  }, [page]);


  return (
    <div className="vh-100 gradient-custom">
      <GarexSneakorumLogo />
      <GarexNavbar />
      <div style={{ marginTop: 20 }}>
        <Grid item xs={12} md={6}>
          <div className="d-flex justify-content-between mb-3">
            <Typography variant="h5">Latest Thread</Typography>
            <NewThreadForm />
          </div>

          <Item>
            <InfiniteScroll
              dataLength={threads.length}
              next={getData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={<p>No more threads to load.</p>}
            >
              {threads.map((thread, index) => (
                <ListThreads key={index} thread={thread} />
              ))}
            </InfiniteScroll>
          </Item>
        </Grid>
      </div>
    </div>
  );
};

export default ForumHome;
