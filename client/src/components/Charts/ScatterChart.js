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
            },
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: xCoord,
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: yCoord,
                },
            },
        },
    };

    return (
        <>
            <div className='chartContainer'>
                <div className='chartCss'>
                    <Scatter data={scatterChartData} options={scatterOptions} />
                </div>
            </div>
        </>
    );
};

export default ScatterChart;
