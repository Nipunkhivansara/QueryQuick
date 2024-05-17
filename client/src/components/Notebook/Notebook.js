import { Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Appbar from '../Appbar/Appbar';


const Notebook = ({menuBarWidth, open, logout,user , handleDrawerToggle}) => {
    // Accessing the notebook_id parameter using useParams hook
    const { notebook_id } = useParams();

    return (
        <div>
            <Box sx={{ zIndex: 1, display: 'flex', minHeight: '100%', minWidth:'100%', bgcolor:'#222B3D' }}>
                <Appbar handleDrawerToggle={handleDrawerToggle} menuBarWidth={menuBarWidth} user={user} />
                <Sidebar open={open} menuBarWidth={menuBarWidth} logout={logout} user={user} />
                <Box sx={{ 
                    marginLeft:'-30px', marginTop: '100px', marginRight:'30px', marginBottom:'100px', 
                    width: `99%`, minHeight: '975px' 
                }}>
                    <Typography variant='h1' color={'#fff'}>Notebook ID: {notebook_id}</Typography>
                </Box>
            </Box>
        </div>
    );
};

export default Notebook;
