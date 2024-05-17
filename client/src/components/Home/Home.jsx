import React from 'react'
import "./Home.css"
import { useState, useEffect } from 'react';

const Home = () => {
    const [firstSpanActive, setFirstSpanActive] = useState(false);
    const [secondSpanActive, setSecondSpanActive] = useState(false);
    const [introTop, setIntroTop] = useState(0);
  
    
    useEffect(() => {
        setTimeout(() => {
          const firstSpanTimeout = setTimeout(() => {
            setFirstSpanActive(true);
          }, 500); 
      
          const secondSpanTimeout = setTimeout(() => {
            setSecondSpanActive(true);
          }, 1000); 
      
    

          const outroTimeout = setTimeout(() => {
            setIntroTop(-100);
          }, 2000)
          
          return () => {
            clearTimeout(firstSpanTimeout);
            clearTimeout(secondSpanTimeout);
            clearTimeout(outroTimeout);
          };
        }, 500); 

    }, [])
  
    return (
        <div>
          <div className="intro" style={{ top: `${introTop}vh` }}>
            <h1 className="logo-header">
            <span className={firstSpanActive ? 'logo active' : 'logo'}>Query</span>
            <span className={secondSpanActive ? 'logo active' : 'logo'}>Quick</span>
            </h1>
          </div>
        </div>
    )
}

export default Home