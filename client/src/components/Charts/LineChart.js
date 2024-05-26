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
        text: 'Line Chart',
        color: '#fff',
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#fff',
        },
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
          color: '#fff',
        },
        ticks: {
          color: '#fff',
        },
        grid: {
          color: '#444',
        },
      },
      y: {
        beginAtZero: true,
        display: true,
        title: {
          display: true,
          text: yCoord,
          color: '#fff',
        },
        ticks: {
          color: '#fff',
        },
        grid: {
          color: '#444',
        },
      },
    },
  };

  return (
    <div style={styles.chartContainer}>
      <div style={styles.chartCss}>
        <Line data={lineChartData} options={lineOptions} />
      </div>
    </div>
  );
};

const styles = {
  chartContainer: {
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#1e1e1e',
    maxWidth: '100%',
    margin: '0 auto',
  },
  chartCss: {
    maxWidth: '100%',
  },
};

export default LineChart;
