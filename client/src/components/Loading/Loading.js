import React from 'react';
import loading from './loading.gif';
import { Box } from '@mui/material/';

const Loading = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        bgcolor: '#2B2C2F',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // Center vertically
      }}
    >
      <img src={loading} alt='loading..' style={{ maxWidth: '100%', maxHeight: '100%' }} />
    </Box>
  )
}

export default Loading;
