import React, { useState } from 'react';
import './prompt.css';
import getDataFromSql from '../../services/sqlservice';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism.css';
import 'prismjs/themes/prism-dark.css';
import 'prismjs/themes/prism-dark.min.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Result from '../Result/Result';

const Prompt = () => {

    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [database, setDatabase] = useState('car');
    const [query, setQuery] = useState('');
    const [databaseRecords, setDatabaseRecords] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const handleInputChange = (event) => {
        setPrompt(event.target.value);
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

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

    const fetchRecordsFromDatabase = async () => {
        try {
            console.log(`Query from handleSubmit : ${query}`);
            const data = await getDataFromSql({ query, database });
            setDatabaseRecords(data); // Wrap data in an array
            if (gridApi) {
                gridApi.setRowData(data); // Wrap data in an array
            }
            console.log(databaseRecords);
        } catch (error) {
            console.error('Error fetching data from SQL:', error.message);
        }
    }

    const columnDefs = databaseRecords.length > 0 ? Object.keys(databaseRecords[0]).map(key => ({
        headerName: key,
        field: key,
        sortable: true,
        filter: true,
        resizable: true,
    })) : [];

    /* const rowData = databaseRecords.map(record => {
        const rowDataEntry = {};
        Object.keys(record).forEach(key => {
            rowDataEntry[key] = record[key];
        });
        return rowDataEntry;
    }); */

    return (
        <div className='main'>
            <h2>Query Engine</h2>
            <input className='input-field' value={prompt} onChange={handleInputChange} type='text' placeholder='Enter your prompt' />
            <select onChange={(e) => setDatabase(e.target.value)}>
                <option value='car'>car</option>
                <option value='cs220p'>cs220p</option>
                <option value='sql_db'>SQL_DB</option>
                <option value='airbnb'>AIRBNB</option>
            </select>
            <button className='queryButton' onClick={getQuery}>Get Query</button>
            <div>
                {query ? (
                    <div style={{ margin: '20px' }}>
                        <Editor
                            value={query}
                            onValueChange={code => setQuery(code)}
                            highlight={code => highlight(code, languages.sql)}
                            padding={10}
                            style={{
                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                fontSize: 12,
                                width: '50%', // set the width to 50%
                                height: 'auto', // set the height to auto
                            }}
                        />
                        <button style={{ margin: '20px' }} onClick={fetchRecordsFromDatabase}>Submit</button>
                    </div>
                ) : (
                    <div></div>
                )}
                {error && <div>Error: {error}</div>}
                {loading && <div>Loading...</div>}
            </div>
            <div>
                {/*  {databaseRecords &&
                    <div>{JSON.stringify(databaseRecords)}</div>
                } */}
                {databaseRecords.length > 0 ? (
                    <div>
                        <Result
                        onGridReady={onGridReady}
                        columnDefs={columnDefs}
                        databaseRecords={databaseRecords}
                        />
                    </div>
                ) :
                    <div></div>
                }
            </div>
        </div>
    )
}

export default Prompt;
