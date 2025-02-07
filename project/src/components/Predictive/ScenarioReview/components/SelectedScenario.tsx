import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const SelectedScenario = ({ 
  width = 1000, 
  height = 500, 
  paddingTop = 0,
  paddingRight = 30,
  paddingBottom = 20,
  paddingLeft = 0,
  marginTop = '0',
  marginRight = '0',
  marginBottom = '0',
  marginLeft = '0'
}) => {
  const data = {
    labels: [ 
      'Total Gross Sales Ex Tax Benefits', 
      'Tax Benefits',
      'Total Gross Sales', 
      'G2N',  
      'Net Revenue', 
      'COGS', 
      'Gross Profit' 
    ],
    datasets: [
      {
        data: [ 820, -106, 926, -27, 899, -421, 479], 
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',  
          'rgba(0, 255, 0, 0.5)', 
          'rgba(255, 206, 86, 0.2)',  
          'rgba(255, 0, 0, 0.5)',     
          'rgba(75, 192, 192, 0.2)',  
          'rgba(255, 0, 0, 0.5)',     
          'rgba(255, 159, 64, 0.2)',      
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(0, 255, 0, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 0, 0, 1)', 
          'rgba(75, 192, 192, 1)', 
          'rgba(255, 0, 0, 1)', 
          'rgba(255, 159, 64, 1)', 
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            if (context.dataIndex === 1) {
              return `${Math.abs(context.parsed.y)}k`;
            }
            return `${context.parsed.y}k`;
          }
        }
      }
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          callback: function(value, index) {
            if (index === 0) {
              return ['Total Gross Sales', 'Ex Tax Benefits'];
            }
            return this.getLabelForValue(value);
          }
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (K)'
        },
        ticks: {
          callback: function(value) {
            return `${value}k`;
          }
        }
      },
    },
  };

  return (
    <div style={{ 
      width: `${width}px`, 
      height: `${height}px`, 
      paddingTop: `${paddingTop}px`,
      paddingRight: `${paddingRight}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      marginTop: marginTop,
      marginRight: marginRight,
      marginBottom: marginBottom,
      marginLeft: marginLeft
    }}>
      <Bar data={data} options={options} />
    </div>
  );
};

