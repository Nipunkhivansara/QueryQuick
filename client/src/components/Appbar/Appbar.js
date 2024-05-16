import React from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Flag as FlagIcon,
  BoltSharp,
  HelpOutline,
  Message,
  Explore,
} from '@mui/icons-material';

const Appbar = ({ handleDrawerToggle, menuBarWidth, user }) => {
  return (
    <div>
      <AppBar position="fixed" sx={{ width: `${1930 - menuBarWidth}px`, bgcolor: '#1A202D', zIndex: 1 }}>
        <Toolbar>
          <IconButton sx={{ ml: '10px' }} edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, textAlign: 'center', textTransform: 'cursive' }}>
            <Typography variant="h4">
              QueryQuick
              <IconButton edge="end" color="inherit" component={Link} to="/example-url">
                <BoltSharp />
              </IconButton>
              <IconButton edge="end" color="inherit" component={Link} to="/another-url">
                <BoltSharp />
              </IconButton>
            </Typography>
          </Box>
          <IconButton sx={{ ml: '10px' }} color="inherit" component={Link} to="/help">
            <HelpOutline />
          </IconButton>
          <IconButton sx={{ ml: '10px' }} color="inherit" component={Link} to="/messages">
            <Message />
          </IconButton>
          <IconButton sx={{ ml: '10px' }} color="inherit" component={Link} to="/explore">
            <Explore />
          </IconButton>
          <IconButton sx={{ ml: '10px' }} color="inherit">
            <FlagIcon />
          </IconButton>
          <IconButton sx={{ ml: '10px' }} color="inherit">
            <NotificationsIcon />
          </IconButton>
          <Avatar alt={user.name} src={user.picture} sx={{ backgroundColor: 'red', ml: '10px' }}></Avatar>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
};

export default Appbar;
