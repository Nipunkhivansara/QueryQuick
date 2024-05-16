import React from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Box, Typography } from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon, Flag as FlagIcon, BoltSharp, HelpOutline, Message, Explore } from '@mui/icons-material';

const Appbar = ({ handleDrawerToggle, menuBarWidth }) => {
  return (
    <div>
      <AppBar position="fixed" sx={{ width: `${1930 - menuBarWidth}px`, bgcolor: '#1A202D', zIndex: 1 }}>
        <Toolbar>
          <IconButton sx={{ml:'10px'}} edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, textAlign: 'center', textTransform: 'cursive' }}>
            <Typography variant="h4" >
              QueryQuick
              <IconButton edge="end" color="inherit">
                <BoltSharp />
              </IconButton>
              <IconButton edge="end" color="inherit">
                <BoltSharp />
              </IconButton>
            </Typography>
          </Box>
          <IconButton sx={{ml:'10px'}} color="inherit">
            <HelpOutline />
          </IconButton>
          <IconButton sx={{ml:'10px'}} color="inherit">
            <Message />
          </IconButton>
          <IconButton sx={{ml:'10px'}} color="inherit">
            <Explore />
          </IconButton>
          <IconButton sx={{ml:'10px'}} color="inherit">
            <FlagIcon />
          </IconButton>
          <IconButton sx={{ml:'10px'}} color="inherit">
            <NotificationsIcon />
          </IconButton>
          <Avatar>🙂</Avatar>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default Appbar;
