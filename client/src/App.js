import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Prompt from './components/Prompt/Prompt';

function App() {
  return (
   <div>
     <Navbar/>
     <Prompt/>
     <Home />
   </div>
  );
}

export default App;
