import React from 'react'
import Login from '../Authentication/Login'
import './Landing.css';
import Logo from '../Logo/Logo';

function Landing() {
  return (
    <div className="bgheader">
    <div className="mainDiv">
      <div>
        <Logo />
      </div>  
      <div>
          <Login/>
      </div>
    </div>
    </div>
  )
}

export default Landing
