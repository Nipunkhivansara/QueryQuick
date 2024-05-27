import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, xCoord, yCoord }) => {
  const barChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Bar Chart',
        color: '#fff'
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#fff'
        }
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#fff'
        },
        grid: {
          color: '#444'
        }
      },
      x: {
        ticks: {
          color: '#fff'
        },
        grid: {
          color: '#444'
        }
      }
    }
  };

  const labels = data.map(item => item[xCoord]);
  const dataValues = data.map(item => item[yCoord]);

  console.log(labels);
  console.log(dataValues);

  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: yCoord,
        data: dataValues,
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Adjusted background color
        borderColor: 'rgba(75, 192, 192, 1)', // Adjusted border color
        borderWidth: 1,
      }
    ]
  };

  return (
    <div style={styles.chartContainer}>
      <div style={styles.chartCss}>
        <Bar
          data={barChartData}
          options={barChartOptions}
        />
      </div>
    </div>
  );
}

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

export default BarChart;
