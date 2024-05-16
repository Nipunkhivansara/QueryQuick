import { React, useState } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
// import Landing from './components/Landing/Landing';
import './App.css';


const miniDrawerWidth = 60;
const maxDrawerWidth = 240;




const App = () => {
  // const { isAuthenticated, isLoading, user, logout } = useAuth0();
  const [open, setOpen] = useState(false);
  const [menuBarWidth, setMenuBarWidth] = useState(miniDrawerWidth);

  const handleDrawerToggle = () => {
    setOpen(!open);
    setMenuBarWidth(open ? miniDrawerWidth : maxDrawerWidth);
  };

  /* return isLoading ? (
    <h1>Loading....</h1>
  ) : (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? 
              <Dashboard open={open} handleDrawerToggle={handleDrawerToggle} 
              menuBarWidth={menuBarWidth} /> 
              : <Landing />
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? 
              <Dashboard open={open} handleDrawerToggle={handleDrawerToggle} 
              menuBarWidth={menuBarWidth} /> 
              : <Landing />
            }
          />
        </Routes>
      </Router>
    </div>
  ); */

  return <Dashboard open={open} handleDrawerToggle={handleDrawerToggle} menuBarWidth={menuBarWidth} />;
}

export default App;
