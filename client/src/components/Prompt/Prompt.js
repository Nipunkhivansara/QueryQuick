import React from 'react';
import { useState } from 'react';
import './prompt.css';

const Prompt = () => {

    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const handleInputChange = (event) => {
        setPrompt(event.target.value);
    }

    const getQuery = async () => {

        // alert(prompt);
        setLoading(true);
        setError(null);
        setResponse(null);
        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });
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
        <input className='input-field' onChange={handleInputChange} type='text' placeholder='Enter your prompt'/>
        <button onClick={getQuery}>Submit</button>
        {error && <div>Error: {error}</div>}
        {loading && <div>Loading...</div>}
        {response && (
            <div>
               {JSON.stringify(response)}
            </div>
        )}
    </div>
  )
}

export default Prompt