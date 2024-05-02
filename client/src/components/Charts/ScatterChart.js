import React from 'react';
import {Scatter} from 'react-chartjs-2';

const ScatterChart = ({data, xCoord, yCoord}) => {
  
    const scatterChartData = {
        labels: ['Scatter Chart'],
        datasets: [
            {
                label: 'Scatter Chart',
                data: data.map(item => ({x: item[xCoord], y: item[yCoord]})),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderWidth: 1,
            },
        ],
    };

    const scatterOptions = {
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
    <div>Scatter chart with {xCoord + " " + yCoord}</div>
         <div className='chartContainer'>
            <div className='chartCss'>
                <Scatter data={scatterChartData} options={scatterOptions} />
            </div>
        </div>
    </>
  )
}

export default ScatterChart