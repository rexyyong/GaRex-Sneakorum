import React, { useState, useEffect, useCallback } from "react";
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
import GarexSearchbar from '../components/GarexSearchBar';
import Box from '@mui/material/Box';
import { Container } from "@mui/material";
import { useNavigate } from 'react-router-dom';


const ForumHome = () => {
  const [threads, setThreads] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    const getThreads = async () => {
      const response = await fetch('https://garexsneakorum.onrender.com/forum_api/threads/?page=1');
      const data = await response.json();
      setThreads(data.results);
      if (data.next === null) {
        setHasMore(false);
      }
    };

    getThreads();
  }, []);

  const getMoreThreads = useCallback(async () => {
    const response = await fetch(`https://garexsneakorum.onrender.com/forum_api/threads/?page=${page}`);
    const data = await response.json();
    return data.results;
  }, [page]);

  const getData = useCallback(async () => {
    const moreThreads = await getMoreThreads();

    if (moreThreads) {
      setThreads((prevThreads) => {
        if (Array.isArray(prevThreads) && Array.isArray(moreThreads)) {
          return [...prevThreads, ...moreThreads];
        } else if (Array.isArray(moreThreads)) {
          return moreThreads;
        } else {
          return prevThreads;
        }
      });

      if (moreThreads.length === 0 || moreThreads.length < 15) {
        setHasMore(false);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [getMoreThreads, setThreads, setHasMore, setPage]);

  const handleNewThread = useCallback(() => {
    setThreads([]);
    setPage(1);
    setHasMore(true);
    getMoreThreads();
  }, [getMoreThreads]);

  const handleLogout = () => {
    // Make API request to sign out
    fetch('https://garexsneakorum.onrender.com/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include any necessary headers, such as authentication token
      },
      // Include any necessary request data, such as user ID
      // body: JSON.stringify({ userId: 123 }),
    })
      .then(response => {
        if (response.ok) {
          // Handle successful sign out
          console.log('Sign out successful');
          navigate('/signin');
        } else {
          // Handle sign out error
          console.error('Sign out error');
        }
      })
      .catch(error => {
        // Handle network or other errors
        console.error('Sign out failed:', error);
      });
  };

<<<<<<< Updated upstream
=======
  const handleSearch = useCallback(async (searchQuery) => {
    try {
      const response = await fetch(
        `https://garexsneakorum.onrender.com/forum_api/search/${searchQuery}`
      );
      const data = await response.json();

    if (Array.isArray(data.results)) {
      setThreads(data.results);
    } else {
      setThreads([]); // If data.results is not an array, set an empty array to clear the threads
    }
    setHasMore(false);
  } catch (error) {
    console.error("Error fetching filtered threads:", error);
  }
}, []);

>>>>>>> Stashed changes
  return (
    <div className="vh-100 gradient-custom">
      <GarexSneakorumLogo />
      <h3>Hello {username}</h3>
      <h4>You are successfully logged in</h4>
      <button onClick={handleLogout}>Logout</button>

      <GarexNavbar />
      <GarexSearchbar />

      <Container maxWidth="lg">
        <div style={{ marginTop: 20 }}>
          <Grid item xs={12} md={6}>
            <div className="d-flex justify-content-between mb-3">
              <Typography variant="h5">Latest Threads</Typography>
              <NewThreadForm handleNewThread={handleNewThread} />
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
      </Container>
    </div>
  );
};

export default ForumHome;
