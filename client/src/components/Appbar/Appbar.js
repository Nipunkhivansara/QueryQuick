import React from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Box, Typography } from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon, Flag as FlagIcon, BoltSharp } from '@mui/icons-material';

const Appbar = ({ handleDrawerToggle, menuBarWidth }) => {
  return (
    <div>
      <AppBar position="fixed" sx={{ width: `${1930 - menuBarWidth}px`, bgcolor: '#1A202D', zIndex: 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
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
          <IconButton color="inherit">
            <FlagIcon />
          </IconButton>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <Avatar>🙂</Avatar>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default Appbar