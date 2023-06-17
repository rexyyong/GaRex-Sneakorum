import logo from './logo.svg';
import './App.css';
import Forum from './pages/forum'
import Greet from './pages/Greet';
import Welcome from './pages/Welcome';
import Message from './pages/message';


function App() {
    return (
        <div>
            <Message/>
            <Welcome name = "Kyle" lastName="Goh"/>
            <Greet name = "Kyle" lastName="Goh"/>
            <Forum />

        </div>
    )
    
}

export default App;
