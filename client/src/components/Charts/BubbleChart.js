import React from 'react';
import { Bubble } from 'react-chartjs-2';


const BubbleChart = ({ data, xCoord, yCoord, zCoord }) => {

  const bubbleChartData = {
    datasets: [{
      label: 'Bubble Chart',
      data: data.map(item => {
        return {
          x: item[xCoord],
          y: item[yCoord],
          r: item[zCoord]-2000
        }
      }),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }]
  };

  const bubbleOptions = {
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
      <div>BubbleChart</div>
      <div>{xCoord + " " + yCoord + " " + zCoord}</div>
      <div className='chartContainer'>
        <div className='chartCss'>
          <Bubble data={bubbleChartData} options={bubbleOptions} />
        </div>
      </div>
    </>
  );
}

export default BubbleChart