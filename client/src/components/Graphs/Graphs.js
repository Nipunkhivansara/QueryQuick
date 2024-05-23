import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ChartComponent from '../ChartComponent/ChartComponent';


const Graphs = ({ graphData }) => {
    const [x, setX] = React.useState('');
    const [y, setY] = React.useState('');
    /* const [z, setZ] = React.useState(''); */
    const [chartType, setChartType] = React.useState('');

    const handleXChange = (event) => {
        setX(event.target.value);
    };

    const handleYChange = (event) => {
        setY(event.target.value);
    }

   /*  const handleZChange = (event) => {
        setZ(event.target.value);
    } */

    const handleChartTypeChange = (event) => {
        setChartType(event.target.value);
    }



    const X_Coordinates = Object.keys(graphData[0]);
    const Y_Coordinates = Object.keys(graphData[0]);
    /* const Z_Coordinates = Object.keys(graphData[0]);
 */
    return (
        <div style={{ height: 600, width: '100%' }}>
            <FormControl sx={{ width: 150 }} variant="outlined">
                <InputLabel id="demo-simple-select-label" sx={{ color: '#fff' }}>X</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={x}
                    label="X"
                    onChange={handleXChange}
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
                    }}
                >
                    {X_Coordinates.map((option, index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{ width: 150, ml: 5 }} variant="outlined">
                <InputLabel id="demo-simple-select-label" sx={{ color: '#fff' }}>Y</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={y}
                    label="Y"
                    onChange={handleYChange}
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
                    }}
                >
                    {Y_Coordinates.map((option, index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {/* <FormControl sx={{ width: 150, ml: 5 }} variant="outlined">
                <InputLabel id="demo-simple-select-label" sx={{ color: '#fff' }}>Z</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={z}
                    label="Z"
                    onChange={handleZChange}
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
                    }}
                >
                    {Z_Coordinates.map((option, index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                    ))}
                </Select>
            </FormControl> */}
            <FormControl sx={{ width: 150, ml: 5 }} variant="outlined">
                <InputLabel id="demo-simple-select-label" sx={{ color: '#fff' }}>Chart Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={chartType}
                    label="Chart Type"
                    onChange={handleChartTypeChange}
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
                    }}
                >
                    <MenuItem value={'Bar'}>Bar</MenuItem>
                    <MenuItem value={'Scatter'}>Scatter</MenuItem>
                    <MenuItem value={'Line'}>Line</MenuItem>
                    <MenuItem value={'Pie'}>Pie</MenuItem>
                    <MenuItem value={'Doughnut'}>Doughnut</MenuItem>
                    {/* <MenuItem value={'Bubble'}>Bubble</MenuItem> */}
                </Select>
            </FormControl>
            <div>
                <ChartComponent chartType={chartType} xCoord={x} yCoord={y} data={graphData} />
            </div>
        </div>
    )
}

export default Graphs