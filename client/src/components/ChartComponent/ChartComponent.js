import React from 'react';
import BarChart from '../Charts/BarChart';
import LineChart from '../Charts/LineChart';
import PieChart from '../Charts/PieChart';
import DoughnutChart from '../Charts/DoughnutChart';
import BubbleChart from '../Charts/BubbleChart';
import ScatterChart from '../Charts/ScatterChart';


const ChartComponent = ({ chartType, xCoord, yCoord, zCoord, data }) => {
    switch (chartType) {
        case 'Bar':
            return <BarChart data={data} xCoord = {xCoord} yCoord = {yCoord} />;
        case 'Scatter':
            return <ScatterChart data={data} xCoord = {xCoord} yCoord = {yCoord} />;
        case 'Line':
            return <LineChart data={data} xCoord = {xCoord} yCoord = {yCoord} />;
        case 'Pie':
            return <PieChart data={data} xCoord = {xCoord} yCoord = {yCoord} />;
        case 'Doughnut':
            return <DoughnutChart data={data} xCoord = {xCoord} yCoord = {yCoord} />;
        case 'Bubble':
            return <BubbleChart data={data} xCoord = {xCoord} yCoord = {yCoord} zCoord={zCoord} />;
        default:
            return null;
    }
}

export default ChartComponent