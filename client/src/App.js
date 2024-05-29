import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Landing from "./components/Landing/Landing";
import Help from "./components/Help/Help";
import Notebook from "./components/Notebook/Notebook";
import "./App.css";
import Home from "./components/Home/Home";
import Loading from "./components/Loading/Loading";

const miniDrawerWidth = 60;
const maxDrawerWidth = 240;

const App = () => {
  const { isAuthenticated, isLoading, user, logout } = useAuth0();
  const [open, setOpen] = useState(true);
  const [menuBarWidth, setMenuBarWidth] = useState(maxDrawerWidth);

  const handleDrawerToggle = () => {
    setOpen(!open);
    setMenuBarWidth(open ? miniDrawerWidth : maxDrawerWidth);
  };


  return isLoading ? (
    <Loading />
  ) : (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                <Home />
                <Dashboard
                  open={open}
                  setOpen={setOpen}
                  user={user}
                  logout={logout}
                  handleDrawerToggle={handleDrawerToggle}
                  menuBarWidth={menuBarWidth}
                  setMenuBarWidth={setMenuBarWidth}
                  miniDrawerWidth={miniDrawerWidth}
                  maxDrawerWidth={maxDrawerWidth}
                  />
                </>
              ) : (
                // <HomePage
                //   open={open}
                //   user={user}
                //   logout={logout}
                //   handleDrawerToggle={handleDrawerToggle}
                //   menuBarWidth={menuBarWidth}
                // />
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
            element={
              <Notebook
                open={open}
                setOpen={setOpen}
                handleDrawerToggle={handleDrawerToggle}
                user={user}
                menuBarWidth={menuBarWidth}
                miniDrawerWidth={miniDrawerWidth}
                maxDrawerWidth={maxDrawerWidth}
                setMenuBarWidth={setMenuBarWidth}
                logout={logout}
              />
            } // Render Notebook component
          />
          <Route
            path="/profile" // Define dynamic route with parameter notebook_id
            element={
              <Dashboard
                open={open}
                user={user}
                logout={logout}
                handleDrawerToggle={handleDrawerToggle}
                menuBarWidth={menuBarWidth}
              />
            } // Render Notebook component
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
