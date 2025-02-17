import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

interface BaseScenarioProps {
  width?: number | string;
  height?: number | string;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  viewMode?: 'total' | 'perUnit';
}

export const BaseScenario: React.FC<BaseScenarioProps> = ({
  width = 1000,
  height = 500,
  paddingTop = 0,
  paddingRight = 30,
  paddingBottom = 20,
  paddingLeft = 0,
  marginTop = '0',
  marginRight = '0',
  marginBottom = '0',
  marginLeft = '0',
  viewMode = 'total'
}) => {
  // Transform your original data into the new rawData structure
  const rawData = [
    { name: 'Total Gross Sales Ex Tax Benefits', total: 823, perUnit: 823 },
    { name: 'Tax Benefits', total: -106, perUnit: -106 },
    { name: 'Total Gross Sales', total: 930, perUnit: 930 },
    { name: 'G2N', total: -27, perUnit: -27 },
    { name: 'Net Revenue', total: 903, perUnit: 903 },
    { name: 'COGS', total: -435, perUnit: -435 },
    { name: 'Gross Profit', total: 468, perUnit: 468 },
  ];

  // Color logic from your original implementation
  const blueLabels = [
    'Total Gross Sales Ex Tax Benefits',
    'Total Gross Sales',
    'Net Revenue',
    'Gross Profit'
  ];

  // Process data with cumulative calculations
  let cumulative = 0;
  const values = rawData.map((item) => {
    const value = item[viewMode];
    const previous = cumulative;
    cumulative += value;
    return { value, previous, cumulative };
  });

  const chartData = {
    labels: rawData.map((d) => d.name),
    datasets: [
      {
        label: 'Base Scenario',
        data: values.map((d) => d.value),
        backgroundColor: rawData.map((d) =>
          blueLabels.includes(d.name)
            ? 'rgba(153, 102, 255, 0.2)' // Purple from original
            : d[viewMode] > 0
            ? 'rgba(0, 255, 0, 0.5)' // Green from original
            : 'rgba(255, 0, 0, 0.5)' // Red from original
        ),
        borderColor: rawData.map((d) =>
          blueLabels.includes(d.name)
            ? 'rgba(153, 102, 255, 1)'
            : d[viewMode] > 0
            ? 'rgba(0, 255, 0, 1)'
            : 'rgba(255, 0, 0, 1)'
        ),
        borderWidth: 1,
        barPercentage: 0.9,
        categoryPercentage: 0.95,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => 
            `${tooltipItem.raw > 0 ? '' : '-'}$${Math.abs(tooltipItem.raw).toLocaleString('en-US')}k`
        }
      },
      datalabels: {
        anchor: 'end' as const,
        align: 'top' as const,
        formatter: (value: number) => 
          `${value > 0 ? '' : '-'}$${Math.abs(value).toLocaleString('en-US')}k`,
        font: { weight: 'bold' as const },
        color: '#000',
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          padding: 10,
          callback: function(value: any, index: number) {
            // Handle special label wrapping from original
            if (index === 0) return ['Total Gross Sales', 'Ex Tax Benefits'];
            return this.getLabelForValue(value).split(' ').join('\n');
          }
        },
      },
      y: { display: false },
    },
  };

  return (
    <div style={{ 
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
      margin: `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`
    }}>
      {/* <h2 style={{ 
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        textAlign: 'center'
      }}>
        Base Scenario ({viewMode})
      </h2> */}
      <Bar data={chartData} options={options} />
    </div>
  );
};






// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export const BaseScenario = ({ 
//   width = 1000, 
//   height = 500, 
//   paddingTop = 0,
//   paddingRight = 30,
//   paddingBottom = 20,
//   paddingLeft = 0,
//   marginTop = '0',
//   marginRight = '0',
//   marginBottom = '0',
//   marginLeft = '0'
// }) => {
//   const data = {
//     labels: [ 
//       'Total Gross Sales Ex Tax Benefits', 
//       'Tax Benefits',
//       'Total Gross Sales', 
//       'G2N',  
//       'Net Revenue', 
//       'COGS', 
//       'Gross Profit' 
//     ],
//     datasets: [
//       {
//         data: [ 823, -106, 930, -27, 903, -435, 468], 
//         backgroundColor: [
//           'rgba(153, 102, 255, 0.2)',  
//           'rgba(0, 255, 0, 0.5)', 
//           'rgba(153, 102, 255, 0.2)',  
//           'rgba(255, 0, 0, 0.5)',     
//           'rgba(153, 102, 255, 0.2)',  
//           'rgba(255, 0, 0, 0.5)',     
//           'rgba(153, 102, 255, 0.2)',      
//         ],
//         borderColor: [
//           'rgba(153, 102, 255, 1)',
//           'rgba(0, 255, 0, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 0, 0, 1)', 
//           'rgba(153, 102, 255, 1)', 
//           'rgba(255, 0, 0, 1)', 
//           'rgba(153, 102, 255, 1)', 
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             if (context.dataIndex === 1) {
//               return `${Math.abs(context.parsed.y)}k`;
//             }
//             return `${context.parsed.y}k`;
//           }
//         }
//       }
//     },
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         ticks: {
//           autoSkip: false,
//           callback: function(value, index) {
//             if (index === 0) {
//               return ['Total Gross Sales', 'Ex Tax Benefits'];
//             }
//             return this.getLabelForValue(value);
//           }
//         },
//       },
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: 'Amount (K)'
//         },
//         ticks: {
//           callback: function(value) {
//             return `${value}k`;
//           }
//         }
//       },
//     },
//   };

//   return (
//     <div style={{ 
//       width: `${width}px`, 
//       height: `${height}px`, 
//       paddingTop: `${paddingTop}px`,
//       paddingRight: `${paddingRight}px`,
//       paddingBottom: `${paddingBottom}px`,
//       paddingLeft: `${paddingLeft}px`,
//       marginTop: marginTop,
//       marginRight: marginRight,
//       marginBottom: marginBottom,
//       marginLeft: marginLeft
//     }}>
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

