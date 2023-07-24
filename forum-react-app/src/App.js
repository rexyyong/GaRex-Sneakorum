import logo from './logo.svg';
import './App.css';
import ForumHome from './pages/ForumHome';
import Thread from './pages/Thread';
import GarexSneakorumLogo from './components/GarexSneakorumLogo';
import GarexNavbar from './components/GarexNavbar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';

import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';

function App() {
  return (
    // <ForumHome/>
    <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forum" element={<ForumHome />} />
          <Route path="/threads/:id" element={<Thread />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<AboutUs />} />

        </Routes>
    </Router>
  );
}


export default App;
