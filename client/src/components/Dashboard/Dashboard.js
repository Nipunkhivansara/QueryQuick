import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import Appbar from "../Appbar/Appbar";
import Performance from "../Performance/Performance";
import NewNotebook from "../NewNotebook/NewNotebook";
import Connection from "../Connections/Connections";
import SiteInfo from "../SiteInfo/SiteInfo";
import Home from "../Home/Home";
import { useState } from "react";
import HomePage from "../../Pages/HomePage";

// c
const Dashboard = ({
  open,
  user,
  logout,
  handleDrawerToggle,
  menuBarWidth,
}) => {
  console.log(user);

  const [connections, setConnections] = useState(false);
  const [Home, setHome] = useState(false);

  const toggleConnections = () => {
    setConnections(!connections);
    setHome(false);
  };

  const toggleHome = () => {
    setHome(!Home);
    setConnections(false);
  }

  const renderComponent = () => {
    switch (true) {
      case connections:
        return <Connection />;
      case Home:
        return <HomePage />;
      default:
        return (
          <>
            <Performance />
            <NewNotebook />
            <SiteInfo open={open} />
          </>
        );
    }
  };

  // console.log(connections);

  return (
    <div>
      {/* <Home />  */}
      <Box sx={{ zIndex: 1, display: "flex" }}>
        <Appbar
          handleDrawerToggle={handleDrawerToggle}
          menuBarWidth={menuBarWidth}
          user={user}
        />
        <Sidebar
          open={open}
          menuBarWidth={menuBarWidth}
          logout={logout}
          user={user}
          toggleHome={toggleHome}
          toggleConnections={toggleConnections}
        />
        <Box
          sx={{
            marginLeft: "-50px",
            marginTop: "60px",
            width: `${1930 - menuBarWidth}px`,
            height: "94.4vh",
            bgcolor: "#222B3D",
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
