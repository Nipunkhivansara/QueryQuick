import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import Appbar from "../Appbar/Appbar";
import Connection from "../Connections/Connections";
import { useState } from "react";
import HomePage from "../../Pages/HomePage";
import Profile from "../Profile/Profile";

const Dashboard = ({
  open,
  setOpen,
  user,
  logout,
  handleDrawerToggle,
  menuBarWidth,
  miniDrawerWidth,
  maxDrawerWidth,
  setMenuBarWidth,
}) => {
  const [Home, setHome] = useState(true);
  const [connections, setConnections] = useState(false);
  const [profile, setProfile] = useState(false);

  const toggleConnections = () => {
    setConnections(true);
    setHome(false);
    setProfile(false);
  };

  const toggleHome = () => {
    setHome(true);
    setConnections(false);
    setProfile(false);
  };

  const toggleProfile = () => {
    setProfile(true);
    setHome(false);
    setConnections(false);
  };

  const renderComponent = () => {
    switch (true) {
      case connections:
        return <Connection />;
      case Home:
        return <HomePage user={user} />;
      case profile:
        return <Profile open={open} />;
      default:
        return (
          <>
            {/*  <Performance />
            { <NewNotebook /> }
            <SiteInfo open={open} /> */}
            <div>Nothing</div>
          </>
        );
    }
  };

  // console.log(connections);

  return (
    <div>
      <Box sx={{ zIndex: 1, display: "flex" }}>
        <Appbar
          handleDrawerToggle={handleDrawerToggle}
          menuBarWidth={menuBarWidth}
          user={user}
        />
        <Sidebar
          handleDrawerToggle={handleDrawerToggle}
          open={open}
          setOpen={setOpen}
          menuBarWidth={menuBarWidth}
          logout={logout}
          user={user}
          toggleHome={toggleHome}
          toggleConnections={toggleConnections}
          toggleProfile={toggleProfile}
          miniDrawerWidth={miniDrawerWidth}
          maxDrawerWidth={maxDrawerWidth}
          setMenuBarWidth={setMenuBarWidth}
        />
        <Box
          sx={{
            marginLeft: "-48px",
            marginTop: "60px",
            // minWidth: `${1930 - menuBarWidth}px`,
            // minHeight: "94.4vh",
            width: `calc(100vw - ${menuBarWidth}px)`,
            height: {
              xs: '80vh', // Small screens
              sm: '85vh', // Medium screens
              md: '92.8vh', // Large screens
            },
            bgcolor: "#383838",
            overflow: "auto",
          }}
        >
          {renderComponent()}
          {/* {connections ? (
            <Connection />
          ) : (
            <>
              <Performance />
              <NewNotebook />
              <SiteInfo open={open} />
            </>
          )} */}
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
