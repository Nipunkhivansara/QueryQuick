import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Appbar from '../Appbar/Appbar';
import Performance from '../Performance/Performance';
import NewNotebook from '../NewNotebook/NewNotebook';
import SiteInfo from '../SiteInfo/SiteInfo';
// import Home from '../Home/Home';



const Dashboard = ({ open, handleDrawerToggle, menuBarWidth }) => {
    return (
        <div>

            {/* <Home /> */}
            <Box sx={{ zIndex: 1, display: 'flex' }}>
                <Appbar handleDrawerToggle={handleDrawerToggle} menuBarWidth={menuBarWidth} />
                <Sidebar open={open} menuBarWidth={menuBarWidth} />
                <Box sx={{ marginLeft: '-50px', marginTop: '60px', width: `${1930 - menuBarWidth}px`, height: '93.8vh', bgcolor: '#222B3D' }}>
                    <Performance />
                    <NewNotebook />
                    <SiteInfo open={open} />
                </Box>
            </Box>
        </div>
    )
}

export default Dashboard