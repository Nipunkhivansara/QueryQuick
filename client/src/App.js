import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import Help from './components/Help/Help';
import Notebook from './components/Notebook/Notebook';
import './App.css';

const miniDrawerWidth = 60;
const maxDrawerWidth = 240;

const App = () => {
  const { isAuthenticated, isLoading, user, logout } = useAuth0();
  const [open, setOpen] = useState(false);
  const [menuBarWidth, setMenuBarWidth] = useState(miniDrawerWidth);

  const handleDrawerToggle = () => {
    setOpen(!open);
    setMenuBarWidth(open ? miniDrawerWidth : maxDrawerWidth);
  };

  return isLoading ? (
    <h1>Loading....</h1>
  ) : (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Dashboard
                  open={open}
                  user={user}
                  logout={logout}
                  handleDrawerToggle={handleDrawerToggle}
                  menuBarWidth={menuBarWidth}
                />
              ) : (
                <Landing />
              )
            }
          />
          <Route
            path="/help"
            element={<Help />} // Render Help component when URL is /help
          />
          <Route
            path="/notebook/:notebook_id" // Define dynamic route with parameter notebook_id
            element={<Notebook />} // Render Notebook component
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
