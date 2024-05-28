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
import {Menu as MenuIcon} from "@mui/icons-material";
import './NavIcon.css';
import { useState } from "react";

const Sidebar = ({
  handleDrawerToggle,
  open,
  menuBarWidth,
  toggleConnections,
  toggleHome,
  toggleProfile,
}) => {
  const { logout } = useAuth0();
  const [isOpen, setIsOpen] = useState('open');

  const hamburgerOnclick = () =>{
    handleDrawerToggle();
    setIsOpen(!isOpen);
  }

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
          zIndex: 1,
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ListItemIcon sx={{ color: "#ffffff" }} onClick={hamburgerOnclick}>
          

              <div id="nav-icon1" className={isOpen ? 'open' : ''}>
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
            <AccountCircleIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Profile" sx={{ color: "#ffffff" }} />}
        </ListItem>
        <ListItem button onClick={toggleConnections}>
          <ListItemIcon sx={{ color: "#ffffff" }}>
            <LinkIcon />
          </ListItemIcon>
          {open && (
            <ListItemText primary="Connections" sx={{ color: "#ffffff" }} />
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
