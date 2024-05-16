import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import BoltSharpIcon from '@mui/icons-material/BoltSharp';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';


const Sidebar = ({ open, menuBarWidth }) => {
  return (
    <div>
         <Drawer
          variant="permanent"
          open={open}
          sx={
            {
              width: menuBarWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper':
              {
                width: menuBarWidth,
                overflow: 'hidden',
                boxSizing: 'border-box',
                bgcolor: '#1A202D',
                transition: 'width 0.3s ease',
                zIndex: 1,
              },
              '& .MuiListItem-root:hover': {
                color: '#8059F4',
              },
              '& .MuiListItemIcon-root, & .MuiListItemText-root': {
                color: '#ffffff',

              },
              '& .MuiListItem-root:hover .MuiListItemIcon-root, & .MuiListItem-root:hover .MuiListItemText-root': {
                color: '#8059F4',

              },
            }
          }
        >
          <List>
            <ListItem>
              <ListItemIcon sx={{ color: '#ffffff' }}>
                <BoltSharpIcon />
              </ListItemIcon>
              {open && <ListItemText primary="QueryQuick" sx={{ color: '#ffffff' }} />}
            </ListItem>
            <ListItem button>
              <ListItemIcon sx={{ color: '#ffffff' }}>
                <InboxIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Inbox" sx={{ color: '#ffffff' }} />}
            </ListItem>
            <ListItem button>
              <ListItemIcon sx={{ color: '#ffffff' }}>
                <MailIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Mail" sx={{ color: '#ffffff' }} />}
            </ListItem>
          </List>
        </Drawer>
    </div>
  )
}

export default Sidebar