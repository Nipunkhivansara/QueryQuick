import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
     <Home />
     </Router>
   </div>
  );
}

export default App;
