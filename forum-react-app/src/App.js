import logo from './logo.svg';
import './App.css';
import ForumHome from './pages/ForumHome';
import Thread from './pages/Thread';
import GarexSneakorumLogo from './components/GarexSneakorumLogo';
import GarexNavbar from './components/GarexNavbar';

import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';

function App() {
    return (

        <Router>
            <Routes>
                <Route path="/forum" element={<ForumHome />} />
                <Route path="/threads/:id" element={<Thread />} />
            </Routes>
        </Router>
                // <div>
                //     {/* { <GarexSneakorumLogo /> }
                //     { <GarexNavbar /> } */}
                //     {/* <ForumHome /> */}
                //     <Thread />
                // </div>

    );
}

export default App;
