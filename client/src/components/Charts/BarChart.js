import React from 'react';
import {Bar} from 'react-chartjs-2';

const BarChart = ({data, xCoord, yCoord}) => {

  const barChartOptions = {
    title: {
      display: true,
      text: 'Bar Chart'
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  const labels = data.map(item => item[xCoord]);
  const dataValues = data.map(item => item[yCoord]);

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
    <div>Bar chart with {xCoord + " " + yCoord}</div>
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

export default BarChart