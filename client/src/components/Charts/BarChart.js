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
        text: 'Bar Chart'
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
      y: {
        beginAtZero: true,
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
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }
    ]
  };

  return (
    <>
    <div className='chartContainer'>
      <div className='chartCss'>
        <Bar
          data={barChartData}
          options={barChartOptions}
        />
      </div>
    </div>
    </>
  )
}

export default BarChart;
