import React, { useState, useEffect } from 'react';
import { Box, Button, MenuItem, Select, TextField, IconButton, Tabs, Tab, Typography } from '@mui/material';
import { Delete as DeleteIcon, PlayArrow as PlayArrowIcon } from '@mui/icons-material';

const QueryEngineCell = ({ index, onDelete, onQueryEngineChange }) => {
    const [databaseType, setDatabaseType] = useState('');
    const [database, setDatabase] = useState('');
    const [prompt, setPrompt] = useState('');
    const [query, setQuery] = useState('');
    const [tab, setTab] = useState('table');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const handleDatabaseTypeChange = (event) => {
        setDatabaseType(event.target.value);
        onQueryEngineChange(index, 'databaseType', event.target.value)
    };

    const handleDatabaseChange = (event) => {
        setDatabase(event.target.value);
        onQueryEngineChange(index, 'database', event.target.value)
    };

    const handlePromptChange = (event) => {
        setPrompt(event.target.value);
        onQueryEngineChange(index, 'prompt', event.target.value)
    };

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleGetQuery = () => {
        // Simulate fetching query
        setLoading(true);
        setTimeout(() => {
            setQuery("SELECT * FROM example_table");
            onQueryEngineChange(index, 'query', "SELECT * FROM example_table")
            setLoading(false);
        }, 1000);
    };

    const handleRunQuery = () => {
        // Simulate running query and fetching data
        setLoading(true);
        setTimeout(() => {
            setData([
                { id: 1, title: 'A Quiet Place Part II', year: 2022, rating: 7.3 },
                { id: 2, title: 'Black Widow', year: 2022, rating: 6.8 },
                { id: 3, title: 'Dune', year: 2022, rating: 8.1 },
                { id: 4, title: 'No Time to Die', year: 2022, rating: 7.4 },
                { id: 5, title: 'The French Dispatch', year: 2022, rating: 7.5 },
            ]);
            setLoading(false);
        }, 1000);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '16px', width: '100%', bgcolor: '#222B3D', borderRadius: '8px', boxShadow: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <IconButton onClick={onDelete} sx={{ color: '#fff', marginRight: '16px', marginLeft: '16px' }}>
                    <DeleteIcon />
                </IconButton>
                <Select
                    value={databaseType}
                    onChange={handleDatabaseTypeChange}
                    displayEmpty
                    sx={{
                        color: '#fff',
                        minWidth: '200px',
                        '& .MuiSelect-select': {
                            padding: '8px 14px',
                            borderRadius: '4px',
                            backgroundColor: '#444',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#555',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#777',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#888',
                        },
                    }}
                >
                    <MenuItem value="" disabled>Select Database Type</MenuItem>
                    <MenuItem value="MySQL">MySQL</MenuItem>
                    <MenuItem value="PostgreSQL">PostgreSQL</MenuItem>
                    {/* Add more database types as needed */}
                </Select>
            </Box>
            <Box sx={{ marginBottom: '16px', marginLeft: '16px' }}>
                <Select
                    value={database}
                    onChange={handleDatabaseChange}
                    displayEmpty
                    sx={{
                        color: '#fff',
                        minWidth: '200px',
                        '& .MuiSelect-select': {
                            padding: '8px 14px',
                            borderRadius: '4px',
                            backgroundColor: '#444',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#555',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#777',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#888',
                        },
                    }}
                >
                    <MenuItem value="" disabled>Select Database</MenuItem>
                    <MenuItem value="db1">Database 1</MenuItem>
                    <MenuItem value="db2">Database 2</MenuItem>
                    {/* Add more databases as needed */}
                </Select>
            </Box>
            <TextField
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Enter prompt..."
                fullWidth
                InputProps={{ disableUnderline: true }}
                sx={{
                    '& .MuiInputBase-input': {
                        color: '#fff',
                        padding: '8px 14px',
                        borderRadius: '4px',
                        backgroundColor: '#444',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#555',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#777',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#888',
                    },
                    marginBottom: '16px',
                    marginLeft: '16px',
                }}
            />
            <Button
                variant="contained"
                onClick={handleGetQuery}
                sx={{ 
                    bgcolor: '#222B3D', 
                    color: '#fff', 
                    '&:hover': { bgcolor: '#28a745' },
                    padding: '6px 12px',
                    fontSize: '0.875rem',
                    width: 'fit-content',
                    marginLeft: '16px',
                    marginBottom: '16px',
                }}
            >
                Get Query
            </Button>
            <TextField
                value={query}
                placeholder="Loading query..."
                fullWidth
                InputProps={{ disableUnderline: true, readOnly: true }}
                sx={{
                    '& .MuiInputBase-input': {
                        color: '#fff',
                        padding: '8px 14px',
                        borderRadius: '4px',
                        backgroundColor: '#444',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#555',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#777',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#888',
                    },
                    marginBottom: '16px',
                    marginTop: '16px',
                    marginLeft: '16px',
                }}
            />
            <Button
                variant="contained"
                onClick={handleRunQuery}
                endIcon={<PlayArrowIcon />}
                sx={{ 
                    bgcolor: '#222B3D', 
                    color: '#fff', 
                    '&:hover': { bgcolor: '#28a745' },
                    padding: '6px 12px',
                    fontSize: '0.875rem',
                    width: 'fit-content',
                    marginLeft: '16px',
                }}
            >
                Run
            </Button>
            {data && (
                <>
                    <Tabs value={tab} onChange={handleTabChange} sx={{ marginTop: '16px', color: '#fff', marginLeft: '16px' }}>
                        <Tab label="Table" value="table" />
                        <Tab label="Charts" value="charts" />
                    </Tabs>
                    {tab === 'table' && (
                        <Box sx={{ height: 300, width: '100%', backgroundColor: '#333', borderRadius: '4px', marginTop: '16px', color: '#fff', padding: '16px', boxShadow: 3, marginLeft: '16px' }}>
                            {/* Placeholder for dynamically rendered table */}
                            <Typography variant="h6">Table will be rendered here...</Typography>
                        </Box>
                    )}
                    {tab === 'charts' && (
                        <Box sx={{ height: 300, width: '100%', backgroundColor: '#333', borderRadius: '4px', marginTop: '16px', color: '#fff', padding: '16px', boxShadow: 3, marginLeft: '16px' }}>
                            {/* Placeholder for dynamically rendered chart */}
                            <Typography variant="h6">Chart will be rendered here...</Typography>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default QueryEngineCell;
