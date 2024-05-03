import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Prompt from './components/Prompt/Prompt';
import Login from './components/Login';
import { useAuth0 } from '@auth0/auth0-react';
import Logout from './components/Logout';
import UserProfile from './components/userprofile';
import { useEffect } from 'react';

const App = () => {
  const { isAuthenticated, isLoading, user, logout } = useAuth0();
  console.log( localStorage.getItem('authToken'));


  // useEffect(() => {
  //   logout({ logoutParams: { returnTo: window.location.origin } });
  // }, []);  

  if (isLoading) return <h1>Loading....</h1 >;

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <AuthenticatedHome /> : <Navigate to="login" />} />
          <Route path="/login" element={isAuthenticated ? <AuthenticatedHome /> : <Login />}/>        
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
