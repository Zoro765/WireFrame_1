import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Highly Elastic', value: 2.0, fill: 'rgba(183, 156, 237, 0.8)' },
  { name: 'Elastic', value: 1.25, fill: 'rgba(156, 195, 237, 0.8)' },
  { name: 'Inelastic', value: 0.7, fill: 'rgba(189, 189, 189, 0.8)' }
];

export function AnalysisBreakdown({ width = '100%', height = 400 }) {
  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#666' }} 
            axisLine={{ stroke: '#666' }} 
          />
          <YAxis 
            tick={{ fill: '#666' }} 
            axisLine={{ stroke: '#666' }} 
            label={{ 
              value: 'Avg Price Elasticity', 
              angle: -90, 
              position: 'insideLeft', 
              style: { textAnchor: 'middle', fill: '#666' } 
            }} 
          />
          <Tooltip />
          <Bar 
            dataKey="value" 
            radius={[4, 4, 0, 0]} 
            maxBarSize={80} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}




// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export function AnalysisBreakdown() {
//   const data = {
//     labels: ['Highly Elastic', 'Elastic', 'Inelastic'],
//     datasets: [
//       {
//         data: [2.0, 1.25, 0.7],
//         backgroundColor: [
//           'rgba(183, 156, 237, 0.8)', // Pastel Purple
//           'rgba(156, 195, 237, 0.8)', // Pastel Blue
//           'rgba(189, 189, 189, 0.8)', // Pastel Gray
//         ],
//         borderColor: [
//           'rgba(183, 156, 237, 1)',
//           'rgba(156, 195, 237, 1)',
//           'rgba(189, 189, 189, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: 'Avg Price Elasticity',
//         },
//       },
//     },
//   };

//   return (
//     <div className="h-[400px]">
//       <Bar data={data} options={options} />
//     </div>
//   );
// }