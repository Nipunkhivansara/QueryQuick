import React, { useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components
Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, xCoord, yCoord }) => {
  const chartRef = useRef(null);
  const [hiddenLabels, setHiddenLabels] = useState([]);

  const makeCounts = data.reduce((acc, item) => {
    acc[item[xCoord]] = (acc[item[xCoord]] || 0) + 1;
    return acc;
  }, {});

  const pieLabels = Object.keys(makeCounts);
  let pieDataValues = Object.values(makeCounts);
  pieDataValues = pieDataValues.map(item => (item * 100) / data.length);

  const pieChartData = {
    labels: pieLabels,
    datasets: [
      {
        label: 'Pie Chart',
        data: pieDataValues,
        backgroundColor: [
          '#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#ff9f40',
          '#ffb347', '#87cefa', '#ffa07a', '#98fb98', '#da70d6', '#ff1493',
          '#1e90ff', '#ffa500', '#ff6347', '#7b68ee', '#3cb371', '#d2691e',
          '#ff4500', '#8a2be2', '#da70d6', '#7fffd4', '#f08080', '#00fa9a',
          '#e9967a', '#8fbc8f', '#483d8b', '#2e8b57', '#ff6666', '#ffcc00',
          '#66ff66', '#3399ff', '#ffccff', '#ff9900', '#66ccff', '#ff3399'
        ],
        borderColor: '#1e1e1e', // Border color to blend with background
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: false, // Hide legend to customize labels on the right
        onClick: (e, legendItem, legend) => {
          const index = legendItem.index;
          const ci = legend.chart;
          const meta = ci.getDatasetMeta(0);
          meta.data[index].hidden = !meta.data[index].hidden;
          ci.update();
        }
      },
    },
  };

  const handleLegendClick = (index) => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const meta = chart.getDatasetMeta(0);
      meta.data[index].hidden = !meta.data[index].hidden;

      if (meta.data[index].hidden) {
        setHiddenLabels([...hiddenLabels, index]);
      } else {
        setHiddenLabels(hiddenLabels.filter(i => i !== index));
      }

      chart.update();
    }
  };

  return (
    <div style={styles.chartContainer}>
      <div style={styles.chartWrapper}>
        <div style={styles.pieContainer}>
          <Pie ref={chartRef} data={pieChartData} options={pieChartOptions} />
        </div>
        <div style={styles.legendContainer}>
          <ul style={styles.legendList}>
            {pieLabels.map((label, index) => (
              <li
                key={index}
                style={{
                  ...styles.legendItem,
                  textDecoration: hiddenLabels.includes(index) ? 'line-through' : 'none',
                }}
                onClick={() => handleLegendClick(index)}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: pieChartData.datasets[0].backgroundColor[index],
                  }}
                >
                  <span>{label}</span>
                  <span style={styles.legendValue}>{pieDataValues[index].toFixed(2)}%</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
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
  },
  chartWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  pieContainer: {
    flex: '1 1 50%',
    maxWidth: '50%',
    height: '300px', // Set a fixed height for the pie chart
  },
  legendContainer: {
    flex: '1 1 50%',
    maxWidth: '50%',
    paddingLeft: '20px',
    display: 'flex',
    flexWrap: 'wrap', // Allow the legend items to wrap into multiple columns
  },
  legendList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexWrap: 'wrap', // Allow the legend items to wrap into multiple columns
  },
  legendItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    fontSize: '0.750rem',
    width: '45%', // Width to allow two columns
    padding: '5px 10px',
  },
  legendLabel: {
    marginRight: '10px',
  },
  legendValue: {
    fontWeight: 'bold',
    marginLeft: '10px', // Add margin between the label and the percentage
  },
};

export default PieChart;
