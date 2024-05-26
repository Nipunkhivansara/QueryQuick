import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ChartComponent from '../ChartComponent/ChartComponent';
import { padding } from '@mui/system';

const Graphs = ({ graphData }) => {
    const [x, setX] = React.useState('');
    const [y, setY] = React.useState('');
    const [chartType, setChartType] = React.useState('');

    const handleXChange = (event) => {
        setX(event.target.value);
    };

    const handleYChange = (event) => {
        setY(event.target.value);
    }

    const handleChartTypeChange = (event) => {
        setChartType(event.target.value);
    }

    const containerStyle = {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    };

    const formControlStyle = {
        width: '150px',
        marginRight: '20px',
        marginBottom: '10px',
        padding: '8px 5px'
    };

    return (
        <div style={containerStyle}>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
                <FormControl sx={formControlStyle} variant="outlined">
                    <InputLabel id="x-label" sx={{ color: '#fff', fontSize: '0.800rem', lineHeight: '1.2rem' }}>X</InputLabel>
                    <Select
                        labelId="x-label"
                        value={x}
                        onChange={handleXChange}
                        label="X"
                        sx={{
                            color: 'white', // Text color
                            '.MuiOutlinedInput-notchedOutline': {
                                       borderColor: 'white', // Outline color
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1F1E1F', // Outline color when focused
                                color: 'white', // Text color when focused
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white', // Outline color when hovered
                                color: 'white', // Text color when hovered
                            },
                            '.MuiSvgIcon-root ': {
                                fill: 'white', // Icon color
                            },
                            backgroundColor: 'transparent', // No background color
                            height: '35px', // Adjusted height
                            fontSize: '0.800rem',
                        }}
                    >
                        {graphData.length > 0 && Object.keys(graphData[0]).map((option, index) => (
                            <MenuItem key={index} value={option} style={{ fontSize: '0.800rem'}}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={formControlStyle} variant="outlined">
                    <InputLabel id="y-label" sx={{ color: '#fff', fontSize: '0.800rem', lineHeight: '1.4375em' }}>Y</InputLabel>
                    <Select
                        labelId="y-label"
                        value={y}
                        onChange={handleYChange}
                        label="Y"
                        sx={{
                            color: 'white', // Text color
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white', // Outline color
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1F1E1F', // Outline color when focused
                                color: 'white', // Text color when focused
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white', // Outline color when hovered
                                color: 'white', // Text color when hovered
                            },
                            '.MuiSvgIcon-root ': {
                                fill: 'white', // Icon color
                            },
                            backgroundColor: 'transparent', // No background color
                            height: '35px', // Adjusted height
                            fontSize: '0.800rem'
                        }}
                    >
                        {graphData.length > 0 && Object.keys(graphData[0]).map((option, index) => (
                            <MenuItem key={index} value={option} style={{ fontSize: '0.800rem'}}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={formControlStyle} variant="outlined">
                    <InputLabel id="chart-type-label" sx={{ color: '#fff', fontSize: '0.800rem', lineHeight: '1.4375em' }}>Chart Type</InputLabel>
                    <Select
                        labelId="chart-type-label"
                        value={chartType}
                        onChange={handleChartTypeChange}
                        label="Chart Type"
                        sx={{
                            color: 'white', // Text color
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white', // Outline color
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1F1E1F', // Outline color when focused
                                color: 'white', // Text color when focused
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white', // Outline color when hovered
                                color: 'white', // Text color when hovered
                            },
                            '.MuiSvgIcon-root ': {
                                fill: 'white', // Icon color
                            },
                            backgroundColor: 'transparent', // No background color
                            height: '35px', // Adjusted height
                            fontSize: '0.800rem'
                        }}
                    >
                        <MenuItem value={'Bar'} style={{ fontSize: '0.800rem'}}>Bar</MenuItem>
                        <MenuItem value={'Scatter'} style={{ fontSize: '0.800rem'}}>Scatter</MenuItem>
                        <MenuItem value={'Line'} style={{ fontSize: '0.800rem'}}>Line</MenuItem>
                        <MenuItem value={'Pie'} style={{ fontSize: '0.800rem'}}>Pie</MenuItem>
                        <MenuItem value={'Doughnut'} style={{ fontSize: '0.800rem'}}>Doughnut</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{ flex: 1, width: '96%', overflow: 'hidden', backgroundColor: '#1e1e1e', borderRadius: '8px', padding: '20px' }}>
                <ChartComponent chartType={chartType} xCoord={x} yCoord={y} data={graphData} />
            </div>
        </div>
    )
}

export default Graphs;
