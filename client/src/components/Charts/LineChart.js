import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({data, xCoord, yCoord}) => {

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
    <div>Line</div>
    <div>{xCoord + " " + yCoord}</div>
    <div className='chartContainer'>
            <div className='chartCss'>
                <Line data={lineChartData} options={lineOptions} />
            </div>
        </div>
    </>
  )
}

export default LineChart;