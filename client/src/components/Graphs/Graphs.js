import React, { useRef, useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Button, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import html2canvas from 'html2canvas';
import ChartComponent from '../ChartComponent/ChartComponent';

const Graphs = ({ graphData }) => {
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [chartType, setChartType] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const chartRef = useRef(null);

  const handleXChange = (event) => {
    setX(event.target.value);
  };

  const handleYChange = (event) => {
    setY(event.target.value);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const handleDownload = () => {
    html2canvas(chartRef.current).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${chartType}-chart.png`;
      link.click();
    });
  };

  const handleCopy = () => {
    html2canvas(chartRef.current).then(canvas => {
      canvas.toBlob(blob => {
        const item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([item]);
        setIsCopied(true);
      });
    });
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000); // 2 seconds delay

      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const X_Coordinates = Object.keys(graphData[0]);
  const Y_Coordinates = Object.keys(graphData[0]);

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
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1F1E1F',
              color: 'white',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
              color: 'white',
            },
            '.MuiSvgIcon-root ': {
              fill: 'white',
            },
            backgroundColor: 'transparent',
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
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1F1E1F',
              color: 'white',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
              color: 'white',
            },
            '.MuiSvgIcon-root ': {
              fill: 'white',
            },
            backgroundColor: 'transparent',
          }}
        >
          {Y_Coordinates.map((option, index) => (
            <MenuItem key={index} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ width: 150, ml: 5 }} variant="outlined">
        <InputLabel id="demo-simple-select-label" sx={{ color: '#fff' }}>Chart Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={chartType}
          label="Chart Type"
          onChange={handleChartTypeChange}
          sx={{
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1F1E1F',
              color: 'white',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
              color: 'white',
            },
            '.MuiSvgIcon-root ': {
              fill: 'white',
            },
            backgroundColor: 'transparent',
          }}
        >
          <MenuItem value={'Bar'}>Bar</MenuItem>
          <MenuItem value={'Scatter'}>Scatter</MenuItem>
          <MenuItem value={'Line'}>Line</MenuItem>
          <MenuItem value={'Pie'}>Pie</MenuItem>
          <MenuItem value={'Doughnut'}>Doughnut</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
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
      </Box>
      <div>
        <ChartComponent chartType={chartType} xCoord={x} yCoord={y} data={graphData} ref={chartRef} />
      </div>
    </div>
  );
};

export default Graphs;
