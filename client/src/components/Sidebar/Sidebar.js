import React from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import BoltSharpIcon from "@mui/icons-material/BoltSharp";
import InboxIcon from "@mui/icons-material/Inbox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LinkIcon from "@mui/icons-material/Link";
import { Link } from "react-router-dom";

const Sidebar = ({ open, menuBarWidth, toggleConnections, toggleHome, toggleProfile }) => {
  return (
    <div>
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
            bgcolor: "#1A202D",
            transition: "width 0.3s ease",
            zIndex: 1,
          },
          "& .MuiListItem-root:hover": {
            color: "#8059F4",
          },
          "& .MuiListItemIcon-root, & .MuiListItemText-root": {
            color: "#ffffff",
          },
          "& .MuiListItem-root:hover .MuiListItemIcon-root, & .MuiListItem-root:hover .MuiListItemText-root":
          {
            color: "#8059F4",
          },
        }}
      >
        <List>
          <ListItem>
            <ListItemIcon sx={{ color: "#ffffff" }}>
              <IconButton edge="end" color="inherit" component={Link} to="/">
                <BoltSharpIcon />
              </IconButton>
            </ListItemIcon>
            {open && (
              <ListItemText primary="QueryQuick" sx={{ color: "#ffffff" }} />
            )}
          </ListItem>
        </List>
        <List>
          <ListItem button onClick={() => {
            toggleHome();
          }}>
            <ListItemIcon sx={{ color: "#ffffff" }}>
              <InboxIcon />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Home"
                sx={{ color: "#ffffff" }}

              />
            )}
          </ListItem>

          <ListItem button onClick={() => { toggleProfile(); }} >
            <ListItemIcon sx={{ color: "#ffffff" }}>
              <AccountCircleIcon />
            </ListItemIcon>
            {open && (
              <ListItemText primary="Profile" sx={{ color: "#ffffff" }} />
            )}
          </ListItem>
          <ListItem button onClick={() => {
            toggleConnections();
          }}>
            <ListItemIcon sx={{ color: "#ffffff" }}>
              <LinkIcon />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Connections"
                sx={{ color: "#ffffff" }}
              />
            )}
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
