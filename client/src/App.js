import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Prompt from './components/Prompt/Prompt';
import Login from './components/Login';
import { useAuth0 } from '@auth0/auth0-react';
import Logout from './components/Logout';
import UserProfile from './components/userprofile';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <AuthenticatedHome /> : <Login />} />
        </Routes>
      </Router>
    </div>
  );
}

function AuthenticatedHome() {
  console.log("here");
  return (
    <>
      <Navbar/>
      <UserProfile/>
      <Prompt />
      <Home />
      <Logout/>
    </>
  );
}


export default App;
