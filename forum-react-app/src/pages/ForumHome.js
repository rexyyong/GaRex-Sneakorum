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

  const fetchData = async () => {
    try {
      const response = await fetch(`/forum_api/threads/?page=${page}`);
      const data = await response.json();

      // Update the threads state with new data
      setThreads((prevThreads) => [...prevThreads, ...data.results]);

      // Check if there are more threads to load
      if (data.next === null) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

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
              next={handleLoadMore}
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
