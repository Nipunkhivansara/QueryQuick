import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Fab from "@mui/material/Fab";
// import { makeStyles } from '@mui/styles';
import Box from "@mui/system/Box";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    // <button onClick={() => loginWithRedirect()}>Log In</button>;

    <div>
      <Box
        sx={{
          position: "absolute",
          left: "6cm",
          top: "13cm",
        }}
        display="flex"
      >
        {/* <Link to="/login" > */}
        <Fab
          onClick={() => loginWithRedirect()}
          sx={{
            background: "#24a7ff",
            border: 0,
            borderRadius: "25px",
            color: "black",
            padding: "15px 60px",
            margin: "20px",
          }}
          size="large"
        >
          Login
        </Fab>
        {/* </Link> */}
        <Fab
          onClick={() => loginWithRedirect()}
          sx={{
            background: "#24a7ff",
            border: 0,
            borderRadius: "25px",
            color: "black",
            padding: "15px 60px",
            margin: "20px",
          }}
        >
          Signup
        </Fab>
      </Box>
    </div>
  );
};

export default Login;
