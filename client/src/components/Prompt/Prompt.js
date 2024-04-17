import React, { useState } from 'react';
import './prompt.css';
import getDataFromSql from '../../services/sqlservice';

const Prompt = () => {

    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [database, setDatabase] = useState('cs220p');
    const [query, setQuery] = useState('');
    const [databaseRecords, setDatabaseRecords] = useState({});

    const handleInputChange = (event) => {
        setPrompt(event.target.value);
    }

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    }

    const getQuery = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });
            const data = await response.json();
            setQuery(data.msg);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const fetchRecordsFromDatabase = async () => {
        try {
            console.log(`Query from handleSubmit : ${query}`);
            const data = await getDataFromSql({ query, database });
            setDatabaseRecords(data);
            console.log(databaseRecords);
        } catch (error) {
            console.error('Error fetching data from SQL:', error.message);
        }
    }
    

    return (
        <div>
            <input className='input-field' value={prompt} onChange={handleInputChange} type='text' placeholder='Enter your prompt' />
            <select onChange={(e) => setDatabase(e.target.value)}>
                <option value='cs220p'>cs220p</option>
                <option value='sql_db'>SQL_DB</option>
                <option value='airbnb'>AIRBNB</option>
            </select>
            <button onClick={getQuery}>Get Query</button>
            <input className='input-field' value={query} onChange={handleQueryChange} type='text' placeholder='Query will be displayed here' />
            <button onClick={fetchRecordsFromDatabase}>Submit</button>
            {error && <div>Error: {error}</div>}
            {loading && <div>Loading...</div>}
            {databaseRecords &&
            <div>{JSON.stringify(databaseRecords)}</div>
            }
        </div>
    )
}

export default Prompt
