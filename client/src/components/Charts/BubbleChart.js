import React from 'react';
import { Bubble } from 'react-chartjs-2';
import { Chart,
  LineElement, ArcElement, CategoryScale, Decimation, Filler, 
  Legend, LinearScale, LogarithmicScale, PointElement, Title, Tooltip } from 'chart.js';

// Register necessary components
Chart.register(ArcElement, CategoryScale, Decimation, Filler, Legend, LinearScale, LogarithmicScale, PointElement, Title, Tooltip);

const BubbleChart = ({ data, xCoord, yCoord, zCoord }) => {
  const bubbleChartData = {
    datasets: [{
      label: 'Bubble Chart',
      data: data.map(item => {
        return {
          x: item[xCoord],
          y: item[yCoord],
          r: item[zCoord] - 2000
        }
      }),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }]
  };

  const bubbleOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Bubble Chart'
      },
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: xCoord,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: yCoord,
        },
      },
    },
  };

  return (
    <>
      <div className='chartContainer'>
        <div className='chartCss'>
          <Bubble data={bubbleChartData} options={bubbleOptions} />
        </div>
      </div>
    </>
  );
};

export default BubbleChart;
