import React from "react";
import {
  Drawer,
  List,
  ListItem,
  Box,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import BoltSharpIcon from "@mui/icons-material/BoltSharp";
import InboxIcon from "@mui/icons-material/Inbox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LinkIcon from "@mui/icons-material/Link";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Menu as MenuIcon } from "@mui/icons-material";
import "./NavIcon.css";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import PaidIcon from "@mui/icons-material/Paid";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const Sidebar = ({
  handleDrawerToggle,
  open,
  setOpen,
  menuBarWidth,
  toggleConnections,
  toggleHome,
  toggleProfile,
  miniDrawerWidth,
  maxDrawerWidth,
  setMenuBarWidth,
}) => {
  const { logout } = useAuth0();

  const hamburgerOnclick = () => {
    setOpen(!open);
    setMenuBarWidth(open ? miniDrawerWidth : maxDrawerWidth);
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: menuBarWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: menuBarWidth,
          overflow: "hidden",
          boxSizing: "border-box",
          bgcolor: "#1F1E1F",
          transition: "width 0.3s ease",
          display: "flex",
          flexDirection: "column",
          zIndex: 101,
        },
        "& .MuiListItem-root:hover": {
          color: "#1976DB",
        },
        "& .MuiListItemIcon-root, & .MuiListItemText-root": {
          color: "#ffffff",
        },
        "& .MuiListItem-root:hover .MuiListItemIcon-root, & .MuiListItem-root:hover .MuiListItemText-root":
          {
            color: "#1976DB",
          },
        "& .MuiListItem-root:hover .MuiSvgIcon-root": {
          color: "#1976DB",
        },
      }}
    >
      <List>
        <ListItem>
          {/* <ListItemIcon sx={{ color: "#ffffff" }}>
            <IconButton edge="end" color="inherit" component={Link} to="/">
              <BoltSharpIcon />
            </IconButton>
          </ListItemIcon>
          {open && (
            <ListItemText primary="QueryQuick" sx={{ color: "#ffffff" }} />
          )} */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <ListItemIcon sx={{ color: "#ffffff" }} onClick={hamburgerOnclick}>
              <div id="nav-icon1" className={open ? "open" : ""}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </ListItemIcon>
          </Box>
        </ListItem>
        <ListItem button onClick={toggleHome}>
          <ListItemIcon sx={{ color: "#ffffff" }}>
            <InboxIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Home" sx={{ color: "#ffffff" }} />}
        </ListItem>
        <ListItem button onClick={toggleProfile}>
          <ListItemIcon sx={{ color: "#ffffff" }}>
            <AnalyticsIcon />
          </ListItemIcon>
          {open && (
            <ListItemText primary="Analytics" sx={{ color: "#ffffff" }} />
          )}
        </ListItem>
        <ListItem button onClick={toggleConnections}>
          <ListItemIcon sx={{ color: "#ffffff" }}>
            <LinkIcon />
          </ListItemIcon>
          {open && (
            <ListItemText primary="Connections" sx={{ color: "#ffffff" }} />
          )}
        </ListItem>
        <ListItem button onClick={toggleConnections}>
          <ListItemIcon sx={{ color: "#ffffff" }}>
            <PaidIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Billing" sx={{ color: "#ffffff" }} />}
        </ListItem>
        <ListItem button onClick={toggleConnections}>
          <ListItemIcon sx={{ color: "#ffffff" }}>
            <SettingsIcon />
          </ListItemIcon>
          {open && (
            <ListItemText primary="Settings" sx={{ color: "#ffffff" }} />
          )}
        </ListItem>
      </List>
      <List sx={{ marginTop: "auto" }}>
        <ListItem button onClick={toggleConnections}>
          <ListItemIcon sx={{ color: "#ffffff" }}>
            <LogoutIcon
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            />
          </ListItemIcon>
          {open && <ListItemText primary="Logout" sx={{ color: "#ffffff" }} />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
