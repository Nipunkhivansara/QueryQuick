import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({data, xCoord, yCoord}) => {

  const makeCounts = data.reduce((acc, item) => {
    acc[item[xCoord]] = (acc[item[xCoord]] || 0) + 1;
    return acc
  },{});
  
  const pieLabels = Object.keys(makeCounts);
  let pieDataValues = Object.values(makeCounts);
  pieDataValues = pieDataValues.map(item => item * 100 / data.length);
  
  const pieChartData = {
    labels: pieLabels,
    datasets: [
      {
        label: 'Pie Chart',
        data: pieDataValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    tooltips: {
        position: 'inside',
    },
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

  
  return (
    <>
    <div>PieChart</div>
    <div className='chartContainer'>
            <div className='chartCss'>
                <Pie data={pieChartData} options={pieChartOptions} />
            </div>
        </div>
    </>
  )
}

export default PieChart