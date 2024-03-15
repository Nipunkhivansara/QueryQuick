import React from 'react';
import { useState } from 'react';
import './prompt.css';
import getDataFromSql from '../../services/sqlservice';

const Prompt = () => {

    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const [database, setDatabase] = useState('sql_db');
    const [query, setQuery] = useState('');
    const [data, setData] = useState(null);

    const handleInputChange = (event) => {
        setPrompt(event.target.value);
    }

    const handleSubmit = async () => {
        try {
            const data = await getDataFromSql({ query, database });
            setData(data);
        } catch (error) {
            console.error('Error fetching data from SQL:', error.message);
        }
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
            setQuery(data.msg);
            setPrompt('');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }

    }


    return (
        <div>
            <input className='input-field' value={prompt} onChange={handleInputChange} type='text' placeholder='Enter your prompt' />
            <select onChange={(e) => setDatabase(e.target.value)}>
                <option value='sql_db'>SQL_DB</option>
                <option value='airbnb'>AIRBNB</option>
            </select>
            <button onClick={getQuery}>Submit</button>
            {error && <div>Error: {error}</div>}
            {loading && <div>Loading...</div>}
            {response && (
                <div>
                    <textarea className='textarea' defaultValue={query} onChange={(e) => setQuery(e.target.value)}>
                    </textarea>
                    <button onClick={handleSubmit}>
                        Submit to Database
                    </button>
                    <div>
                        {data && (
                            <div>
                                <h1>Response from Database</h1>
                                <div>
                                    {data.map((row, index) => (
                                        <div key={index}>
                                            {JSON.stringify(row)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Prompt