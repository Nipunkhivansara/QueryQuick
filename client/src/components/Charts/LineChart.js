import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LinearScale, Title, Tooltip, Legend, PointElement, LineElement, Filler } from 'chart.js';

// Register necessary components
Chart.register(LinearScale, Title, Tooltip, Legend, PointElement, LineElement, Filler);

const LineChart = ({ data, xCoord, yCoord }) => {
  let tempLineData = [...new Set(data.map(item => item[xCoord]))].sort();

  const lineChartData = {
    labels: tempLineData,
    datasets: [
      {
        label: 'Line Chart',
        data: tempLineData.map(item => data.find(dataItem => dataItem[xCoord] === item)[yCoord]),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        tension: 0.1,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Line Chart'
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
        beginAtZero: true,
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
          <Line data={lineChartData} options={lineOptions} />
        </div>
      </div>
    </>
  );
};

export default LineChart;
