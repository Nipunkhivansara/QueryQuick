import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import { flexbox, fontWeight } from '@mui/system';
import CardActionArea from '@mui/material/CardActionArea';
import { grey } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


function HomePage() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224,
      alignItems: 'center',
      marginTop: 10,
      marginLeft: 10, 
      marginRight:10,
      boxShadow: 3
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Add Connection" {...a11yProps(0)} />
        <Tab label="Create Notebook" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />

      </Tabs>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span style={{fontWeight: 500, fontSize:25}}>Create Notebook</span>
          <span style={{color: grey}}>Start fresh with a new notebook.</span>
          
          <Card sx={{
              width: '100%',
              marginTop: 2,
              '&:hover': {
                boxShadow: '0 0 11px rgba(33,33,33,.2)', 
                border: '1px solid black',
              }
            }}>
              <CardActionArea sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                <AddIcon fontSize="large" />
                <Typography component="div" variant="h6">
                  Create Notebook
                </Typography>
              </CardActionArea>
            </Card>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      
    </Box>

    <Grid container spacing={2} sx={{ mt: 2, px: 10 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardContent>
              <video width="100%" controls>
                <source src="path/to/your/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardContent>
              <h2>Notebooks</h2>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
    
  )
}

export default HomePage
