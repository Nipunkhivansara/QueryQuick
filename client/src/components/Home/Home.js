import React from 'react'
import { useState } from 'react';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
  
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
  
    return (
        <div>
            <button onClick={connectSQL} disabled={loading}>
                {loading ? 'Loading...' : 'SQL'}
            </button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={connectNOSQL} disabled={loading}>
                {loading ? 'Loading...' : 'NoSQL'}
            </button>
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