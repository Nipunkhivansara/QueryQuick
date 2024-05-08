import React from "react";
import "./Navbar.css";
import logoWhite from "./logo-black.png"; // Import the black logo image

import { Link } from "react-router-dom";
import image from "./web.jpg";
import Logout from "../Authentication/Logout";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logoWhite} className="logo-img-white" />
      <ul>
        <li>Home</li>
        <li>Products</li>
        <li>Features</li>
        <li>About</li>
      </ul>
      <Logout />
      {/* <img src = {toggle_light} className='toggle-icon'/> */}
    </div>
  );
};

export default Navbar;
