import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1F1E1F",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#FFFFFF",
  display: "flex",
  alignItems: "center", // Center aligns vertically
  justifyContent: "flex-start", // Aligns content to the left
  transition: "0.15s all ease-in",
  cursor: "pointer",

  "&:hover": {
    backgroundColor: "#0d172b",
  },
}));

const Img = styled("img")({
  display: "block",
  width: "60px", // Set a fixed width for all images
  height: "40px", // Set a fixed height for all images
  marginRight: "8px", // Add some space between the image and the text
});

const StyledBox = styled(Box)({
  boxSizing: "border-box",
});

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
];

const activeDatabases = [
  {
    name: "MySQL",
    logo: "https://auth.airbook.io/storage/v1/object/public/airbook-assets/mysql.svg",
  },
  {
    name: "MongoDb",
    logo: "https://fivetran.com/integrations/mongo/resources/mongo.svg",
  },
];

export default function RowAndColumnSpacing() {
  return (
    <>
      <StyledBox sx={{ width: "100%", p: 4 }}>
        <h2 style={{ color: "#FFFFFF" }}>Active Connections</h2>
        <Grid
          container
          spacing={{ xs: 0, md: 1 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {activeDatabases.map((database, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>
                <Img src={database.logo} />
                <Typography
                  variant="h7"
                  component="div"
                  sx={{ fontSize: '0.800rem' }}
                >
                  {database.name}
                </Typography>
              </Item>
            </Grid>
          ))}
        </Grid>
      </StyledBox>
      <StyledBox sx={{ width: "100%", p: 4 }}>
        <h2 style={{ color: "#FFFFFF" }}>Database Connections</h2>
        <Grid
          container
          spacing={{ xs: 0, md: 1 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {databases.map((database, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>
                <Img src={database.logo} />
                <Typography
                  variant="h7"
                  component="div"
                  sx={{ fontSize: '0.800rem' }}
                >
                  {database.name}
                </Typography>
              </Item>
            </Grid>
          ))}
        </Grid>
      </StyledBox>
    </>
  );
}
