import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import GarexSneakorumLogo from '../components/GarexSneakorumLogo';
import GarexNavbar from '../components/GarexNavbar';
import ListThreads from '../components/ListThreads'; // Import the ListThreads component

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [threads, setThreads] = useState([]); // State variable to store the threads data
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const pageTitle = 'Garex Sneakorum User Profile Page';

  useEffect(() => {
    // Retrieve the username from local storage
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);

    // Fetch threads data from the backend API
    loadThreads();
  }, []);

  useEffect(() => {
    if (username) {
      // Load threads for the logged-in user
      loadThreads();
    }
  }, [username]);

  // Call this function to load threads for the logged-in user
  const loadThreads = useCallback(() => {
    setThreads([]);
    setPage(1);
    setHasMore(true);
    fetchMoreThreads();
  }, [fetchMoreThreads]);

  // Function to fetch more threads from the backend API
  const fetchMoreThreads = useCallback(async () => {
    try {
      const response = await fetch(`https://garexsneakorum.onrender.com/forum_api/profile/${username}/?page=${page}`);
      const data = await response.json();
      if (data.length === 0 || data.length < 15) {
        setHasMore(false);
      }
      setThreads(prevThreads => [...prevThreads, ...data]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  }, [page, username]);

  const handleLogout = () => {
    // Make API request to sign out
    fetch('https://garexsneakorum.onrender.com/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          // Handle successful sign out
          console.log('Sign out successful');
          localStorage.removeItem('username'); // Clear the username from local storage
          setUsername(''); // Clear the username from state
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

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <div className="vh-100 gradient-custom">
        <div>
          <GarexSneakorumLogo />
          <h3>Hello {username}</h3>
          <h4>You are successfully logged in</h4>
          <button onClick={handleLogout}>Logout</button>
          <GarexNavbar />
        </div>

        <Container maxWidth="lg">
          <Typography component="h1" variant="h3" sx={{ mb: 3 }} style={{ marginTop: '20px' }}>
            Random's Profile
          </Typography>

          <Card sx={{ boxShadow: 3 }}>
            {/* Implement InfiniteScroll to load more threads */}
            <InfiniteScroll
              dataLength={threads.length}
              next={fetchMoreThreads}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={<p>No more threads to load.</p>}
            >
              {threads.map((thread, index) => (
                <ListThreads key={index} thread={thread} />
              ))}
            </InfiniteScroll>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default Profile;
