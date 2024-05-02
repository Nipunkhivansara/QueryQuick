import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Prompt from './components/Prompt/Prompt';

function App() {
  return (
   <div>
    <Router>
     <Navbar/>
     <Prompt/>
     {/* <Home /> */}
     </Router>
   </div>
  );
}

export default App;
