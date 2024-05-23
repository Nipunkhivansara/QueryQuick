import React, { useState } from "react";
import { Box, TextField, Grid, Typography } from "@mui/material";

/* const connectionsList = [
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
]; */

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

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "800px",
                height: 315,
                margin: "0 auto",
                padding: "20px",
                bgcolor: "#fff",
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
                sx={{ marginBottom: "20px" }}
            />
            <Grid container spacing={2}>
                {filteredDatabases.map((database, index) => (
                    <Grid item xs={6} sm={4} key={index}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                padding: "10px",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                cursor: "pointer",
                                '&:hover': {
                                    backgroundColor: "#f5f5f5",
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
        </Box>
    );
};

export default ConnectionComponent;
