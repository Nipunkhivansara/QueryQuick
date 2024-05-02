import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({data, xCoord, yCoord}) => {


  const makeCounts = data.reduce((acc, item) => {
    acc[item[xCoord]] = (acc[item[xCoord]] || 0) + 1;
    return acc
  },{});
  
  const doughnutLabels = Object.keys(makeCounts);
  let doughnutDataValues = Object.values(makeCounts);
  doughnutDataValues = doughnutDataValues.map(item => item * 100 / data.length);

  const doughnutChartData = {
    labels: doughnutLabels,
    datasets: [
      {
        label: 'Doughnut Chart',
        data: doughnutDataValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
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
    <div>Doughnut</div>
    <div>{xCoord + " " + yCoord}</div>
    <div className='chartContainer'>
            <div className='chartCss'>
                <Doughnut data={doughnutChartData} options={doughnutOptions} />
            </div>
        </div>
    </>
  )
}

export default DoughnutChart