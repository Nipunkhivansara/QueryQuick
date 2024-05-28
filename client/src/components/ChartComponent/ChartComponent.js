import React from 'react';
import BarChart from '../Charts/BarChart';
import LineChart from '../Charts/LineChart';
import PieChart from '../Charts/PieChart';
import DoughnutChart from '../Charts/DoughnutChart';
import ScatterChart from '../Charts/ScatterChart';
import { Typography } from '@mui/material';

const ChartComponent = React.forwardRef(({ chartType, xCoord, yCoord, data }, ref) => {
  if (!data || !xCoord || !yCoord || !chartType) {
    return (
      <div className='noGraph'>
        <Typography variant='h5' sx={{ color: '#fff', fontSize: '1rem' }}>Select X, Y and Graph</Typography>
      </div>
    );
  }

  const renderChart = () => {
    switch (chartType) {
      case 'Bar':
        return <BarChart data={data} xCoord={xCoord} yCoord={yCoord} />;
      case 'Scatter':
        return <ScatterChart data={data} xCoord={xCoord} yCoord={yCoord} />;
      case 'Line':
        return <LineChart data={data} xCoord={xCoord} yCoord={yCoord} />;
      case 'Pie':
        return <PieChart data={data} xCoord={xCoord} yCoord={yCoord} />;
      case 'Doughnut':
        return <DoughnutChart data={data} xCoord={xCoord} yCoord={yCoord} />;
      default:
        return null;
    }
  };

  return (
    <div ref={ref}>
      {renderChart()}
    </div>
  );
});

export default ChartComponent;
