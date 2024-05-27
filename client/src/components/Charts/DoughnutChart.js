import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ data, xCoord, yCoord }) => {
  const makeCounts = data.reduce((acc, item) => {
    acc[item[xCoord]] = (acc[item[xCoord]] || 0) + 1;
    return acc;
  }, {});

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
          '#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#ff9f40',
          '#ffb347', '#87cefa', '#ffa07a', '#98fb98', '#da70d6', '#ff1493',
          '#1e90ff', '#ffa500', '#ff6347', '#7b68ee', '#3cb371', '#d2691e',
          '#ff4500', '#8a2be2', '#da70d6', '#7fffd4', '#f08080', '#00fa9a',
          '#e9967a', '#8fbc8f', '#483d8b', '#2e8b57', '#ff6666', '#ffcc00',
          '#66ff66', '#3399ff', '#ffccff', '#ff9900', '#66ccff', '#ff3399'
        ],
        borderColor: '#1e1e1e',
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Doughnut Chart',
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
  };

  return (
    <div style={styles.chartContainer}>
      <div style={styles.chartCss}>
        <Doughnut data={doughnutChartData} options={doughnutOptions} />
      </div>
    </div>
  );
};

const styles = {
  chartContainer: {
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#1e1e1e',
    maxWidth: '100%',
    margin: '0 auto',
    height: '400px', // Set a fixed height for the container
  },
  chartCss: {
    maxWidth: '100%',
    height: '100%', // Ensure the chart fits within the container height
  }
};

export default DoughnutChart;
