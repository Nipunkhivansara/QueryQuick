import React from 'react'
import "./Home.css"
import { useState, useEffect } from 'react';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const [firstSpanActive, setFirstSpanActive] = useState(false);
    const [secondSpanActive, setSecondSpanActive] = useState(false);
    const [introTop, setIntroTop] = useState(0);
  
    const connectSQL = async () => {
      setLoading(true);
      setError(null);
      setResponse(null);
  
      try {
        const database = 'sql_db';
        const response = await fetch(`http://localhost:5000/sql?database=${encodeURIComponent(database)}`);
        const data = await response.json();
        setResponse(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const connectNOSQL = async () => {
        setLoading(true);
        setError(null);
        setResponse(null);
    
        try {
          const database = 'airbnb';
          const response = await fetch(`http://localhost:5000/mongo?database=${encodeURIComponent(database)}`);
          const data = await response.json();
          setResponse(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
    }

    useEffect(() => {
        setTimeout(() => {
          const firstSpanTimeout = setTimeout(() => {
            setFirstSpanActive(true);
          }, 500); 
      
          const secondSpanTimeout = setTimeout(() => {
            setSecondSpanActive(true);
          }, 1000); 
      
    
          const outroTimeoutSpan = setTimeout(() => {
            setFirstSpanActive(false);
            setSecondSpanActive(false);
            
          }, 2500); 

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
            {/* <button onClick={connectSQL} disabled={loading}>
                {loading ? 'Loading...' : 'SQL'}
            </button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={connectNOSQL} disabled={loading}>
                {loading ? 'Loading...' : 'NoSQL'}
            </button> */}
            {error && <div>Error: {error}</div>}
            {response && (
                <div>
                    <h2>Response:</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}

export default Home