import { color } from '@mui/system';
import React from 'react';
import { Scatter } from 'react-chartjs-2';

const ScatterChart = ({ data, xCoord, yCoord }) => {
  const scatterChartData = {
    datasets: [
      {
        label: 'Scatter Chart',
        data: data.map(item => ({ x: item[xCoord], y: item[yCoord] })),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderWidth: 1,
      },
    ],
  };

  const scatterOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Scatter Chart',
        color: '#fff'
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
            color: '#fff'
        }
    },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: xCoord,
          color: '#fff'
        },
        ticks: {
          color: '#fff'
        },
        tooltip: {
            enabled: true,
          },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: yCoord,
          color: '#fff'
        },
        ticks: {
          color: '#fff'
        },
      },
    },
  };

  return (
    <div style={styles.chartContainer}>
      <div style={styles.chartCss}>
        <Scatter data={scatterChartData} options={scatterOptions} />
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
  }
};

export default ScatterChart;
