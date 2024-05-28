import React, { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ChartComponent from '../ChartComponent/ChartComponent';
import html2canvas from 'html2canvas';
import { Button, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { padding } from '@mui/system';

const Graphs = ({ graphData }) => {
    const [x, setX] = React.useState('');
    const [y, setY] = React.useState('');
    const [chartType, setChartType] = React.useState('');
    const [isCopied, setIsCopied] = useState(false);

    const handleXChange = (event) => {
        setX(event.target.value);
    };

    const handleYChange = (event) => {
        setY(event.target.value);
    }

    const handleChartTypeChange = (event) => {
        setChartType(event.target.value);
    }

    const handleDownload = () => {
        // Get the chart container
        const chartContainer = document.getElementById('chart-rendered');

        // Use html2canvas to render the chart as an image
        html2canvas(chartContainer).then(canvas => {
            // Convert the canvas to a data URL
            const imageURL = canvas.toDataURL();

            // Create a temporary link element
            const link = document.createElement('a');
            link.href = imageURL;
            link.download = 'chart.png'; // Set the filename for downloading
            link.click();
        });
    };

    const handleCopy = () => {
        // Get the chart container
        const chartContainer = document.getElementById('chart-rendered');

        // Use html2canvas to render the chart as an image
        html2canvas(chartContainer).then(canvas => {
            // Convert the canvas to a Blob
            canvas.toBlob(blob => {
                // Create a new clipboard item containing the image data
                const item = new ClipboardItem({ 'image/png': blob });

                // Copy the clipboard item
                navigator.clipboard.write([item])
                    .then(() => {
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 3000); // Reset copied state after 3 seconds
                        console.log('Chart copied to clipboard');
                    })
                    .catch(error => console.error('Failed to copy chart:', error));
            }, 'image/png');
        });
    };


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
                            <MenuItem key={index} value={option} style={{ fontSize: '0.800rem' }}>{option}</MenuItem>
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
                            <MenuItem key={index} value={option} style={{ fontSize: '0.800rem' }}>{option}</MenuItem>
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
                        <MenuItem value={'Bar'} style={{ fontSize: '0.800rem' }}>Bar</MenuItem>
                        <MenuItem value={'Scatter'} style={{ fontSize: '0.800rem' }}>Scatter</MenuItem>
                        <MenuItem value={'Line'} style={{ fontSize: '0.800rem' }}>Line</MenuItem>
                        <MenuItem value={'Pie'} style={{ fontSize: '0.800rem' }}>Pie</MenuItem>
                        <MenuItem value={'Doughnut'} style={{ fontSize: '0.800rem' }}>Doughnut</MenuItem>
                    </Select>
                </FormControl>
                {x && y && chartType ? <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, flexGrow: 1, alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDownload}
                        startIcon={<DownloadIcon />}
                        sx={{ mr: 2 }}
                    >
                        Download
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCopy}
                        startIcon={isCopied ? <CheckIcon /> : <ContentCopyIcon />}
                    >
                        {isCopied ? 'Copied' : 'Copy'}
                    </Button>
                </Box> : null}
            </div>
            <div id='chart-rendered' style={{ flex: 1, width: '96%', overflow: 'hidden', backgroundColor: '#1e1e1e', borderRadius: '8px', padding: '20px' }}>
                <ChartComponent chartType={chartType} xCoord={x} yCoord={y} data={graphData} />
            </div>
        </div>
    )
}

export default Graphs;