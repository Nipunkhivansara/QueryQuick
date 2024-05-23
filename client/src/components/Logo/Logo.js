import React from "react";
// import { makeStyles, withStyles } from "@material-ui/core";
import "./Logo.css";

function Logo() {
  return (
    <div>
      {/* <CustomColor> */}
      <h1 className="wow">
        QUERY <br /> &ensp; QUICK
      </h1>
      <hr />
      <p className="describe">
        We translate your <span style={{ color: "#24a7ff" }}> Thoughts</span>{" "}
        into <span style={{ color: "#24a7ff" }}> Code</span>
      </p>
      {/* </CustomColor> */}
    </div>
  );
}

// const useStyles = makeStyles((theme) => ({}));
// const CustomColor = withStyles({
//   root: {
//     fontSize: 20,
//     background: "-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
//     WebkitBackgroundClip: "text",
//   }
// });

export default Logo;
