import React, { useState } from "react";
import { Box, TextField, Grid, Typography, Dialog, DialogContent, DialogTitle, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


const connectionsList = [
    "ADP Workforce Now",
    "ActiveCampaign",
    "AdRoll",
    "Ada",
    "Adjust",
    "Adobe Analytics",
    "Adobe Analytics Data Feed",
    "Alchemer",
    "Amazon Ads",
    "Amazon CloudFront",
    "Amazon Kinesis Firehose",
    "Amazon S3",
    "Amplitude",
    "Anaplan",
    // Add more connections as needed
];

const databases = [
    {
        name: "MySQL",
        logo: "https://auth.airbook.io/storage/v1/object/public/airbook-assets/mysql.svg",
    },
    {
        name: "MongoDb",
        logo: "https://fivetran.com/integrations/mongo/resources/mongo.svg",
    },
    {
        name: "BigQuery",
        logo: "https://auth.airbook.io/storage/v1/object/public/airbook-assets/bigQuery.svg",
    },
    {
        name: "Redshift",
        logo: "https://auth.airbook.io/storage/v1/object/public/airbook-assets/redshift.svg",
    },
    {
        name: "Snowflake",
        logo: "https://fivetran.com/integrations/snowflake/resources/snowflake.png",
    },
    {
        name: "Postgres",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
    },
    {
        name: "MotherDuck",
        logo: "https://auth.airbook.io/storage/v1/object/public/airbook-assets/motherduck.svg",
    },
    {
        name: "AlloyDB",
        logo: "https://lh3.googleusercontent.com/OZqGFZZthADlPJdIBToM8ZSPLxiUMHjuJTu3uaKUmTBJjDdfSEYwkaxBo5VqkVpA_LGY34Jv3JjUQfXX_DP5",
    },
    {
        name: "Amazon S3",
        logo: "https://fivetran.com/integrations/s3/resources/s3.svg"
    },
    {
        name: "Azure SQL Database",
        logo: "https://fivetran.com/integrations/sql_server/resources/azure.png"
    },
    {
        name: "Azure PostgreSQL Database",
        logo: "https://fivetran.com/integrations/postgres/resources/azure.png"
    }
];

const ConnectionComponent = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredDatabases = databases.filter(database =>
        database.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDatabase, setSelectedDatabase] = useState(null);
    const [logo, setLogo] = useState(null);
    const [connectionText, setConnectionText] = useState("Connect");
    const [testButtonText, setTestButtonText] = useState("Test");
    const [testButtonColor, setTestButtonColor] = useState("warning");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [credentials, setCredentials] = useState({
        hostname: '',
        port: '',
        username: '',
        password: ''
    });

    const handleOpenDialog = (database) => {
        setSelectedDatabase(database.name);
        setLogo(database.logo);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => setOpenDialog(false);

    const handleClear = () => setCredentials({
        hostname: '',
        port: '',
        username: '',
        password: ''
    });

    const handleTestConnection = () => {
        // Simulate a successful test
        setTestButtonText("Test ✓");
        setTestButtonColor("success");
        setSnackbarOpen(true);
    };

    const resetTest = () => {
        setTestButtonText("Test");
        setTestButtonColor("warning");
        setConnectionText("Connect");
        setSnackbarOpen(false);
    };

    const handleConnect = () => {
        setSnackbarOpen(true);
        setConnectionText("Connection ✓");
        setTimeout(() => {
            setOpenDialog(false);
        }, 1000);
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "800px",
                height: 315,
                margin: "0 auto",
                padding: "20px",
                bgcolor: "##d1d1d1",
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    display: 'none', // Hide scrollbar for Chrome, Safari, and Opera
                },
                scrollbarWidth: 'none', // Hide scrollbar for Firefox
                msOverflowStyle: 'none', // Hide scrollbar for IE 10+
            }}
        >
            <Typography variant="h6" gutterBottom>
                Add Connection
            </Typography>
            <Typography variant="body2" gutterBottom>
                Bring data from over 200 different sources to one place with our connectors.
            </Typography>
            <TextField
                fullWidth
                label="Search Connections..."
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ marginBottom: "20px", marginTop: "20px" }}
            />
            <Grid container spacing={2}>
                {filteredDatabases.map((database, index) => (
                    <Grid item xs={6} sm={4} key={index} onClick={() => handleOpenDialog(database)}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                padding: "10px",
                                border: "1px solid #383838",
                                borderRadius: "4px",
                                cursor: "pointer",
                                '&:hover': {
                                    backgroundColor: "#898585",
                                },
                            }}
                        >
                            <img
                                src={database.logo}
                                alt={database.name}
                                style={{ width: "24px", height: "24px", marginRight: "10px" }}
                            />
                            <Typography variant="body2">{database.name}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={openDialog} onClose={handleCloseDialog} >
                <DialogTitle display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'row'}>
                    Add Connection :
                    <img style={{ marginLeft: '5px' }} width={'20%'} height={'20%'} src={logo} alt={selectedDatabase?.name} />
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Hostname"
                        variant="outlined"
                        value={credentials.hostname}
                        onChange={(e) => setCredentials({ ...credentials, hostname: e.target.value })}
                        sx={{ marginBottom: "20px", marginTop: "5px" }}
                    />
                    <TextField
                        fullWidth
                        label="Port"
                        variant="outlined"
                        value={credentials.port}
                        onChange={(e) => setCredentials({ ...credentials, port: e.target.value })}
                        sx={{ marginBottom: "20px" }}
                    />
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        sx={{ marginBottom: "20px" }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        sx={{ marginBottom: "20px" }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="primary" onClick={handleClear}>Clear</Button>
                        <Button variant="contained" color={testButtonColor} onClick={handleTestConnection}>
                            {testButtonText}
                        </Button>
                        <Button variant="contained" color="success" onClick={handleConnect}>{connectionText}</Button>
                        <Button variant="contained" color="error" startIcon={<CloseIcon />} onClick={handleCloseDialog}>Close</Button>
                    </Box>

                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={() => setSnackbarOpen(false)}
                    >
                        <Alert onClose={() => resetTest()} severity="success" sx={{ width: '100%' }}>
                            Connection Successful
                        </Alert>
                    </Snackbar>

                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default ConnectionComponent;
