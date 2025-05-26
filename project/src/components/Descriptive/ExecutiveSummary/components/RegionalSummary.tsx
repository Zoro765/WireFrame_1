// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// const data = [
//   { name: 'AREA VII', value: 9.44 },
//   { name: 'AREA I', value: 13.28 },
//   { name: 'AREA VI', value: 22.86 },
//   { name: 'AREA II', value: 20.97 },
//   { name: 'AREA III', value: 8.39 },
//   { name: 'AREA IV', value: 8.39 },
//   { name: 'AREA V', value: 8.17 },
// ];

// const COLORS = [
//   '#E6B8DE', // Soft Pink
//   '#B8D8EB', // Pastel Blue
//   '#D8E6B8', // Pastel Lime
//   '#EBB8D8', // Light Lavender
//   '#B8EBE6', // Mint
//   '#E6D8B8', // Cream
//   '#D8B8EB', // Soft Purple
// ];


// // const COLORS = [
// //   '#4a235a',
// //   '#6b3480',
// //   '#8e44ad',
// //   '#9b59b6',
// //   '#a569bd',
// //   '#bb8fce',
// //   '#d2b4de',
// // ];

// export function RegionalSummary() {
//   return (
//     <ResponsiveContainer width="100%" height={250}>
//       <PieChart>
//         <Pie
//           data={data}
//           cx="48%"
//           cy="50%"
//           innerRadius={65}
//           outerRadius={85}
//           fill="#8884d8"
//           dataKey="value"
//           label={({ name, value }) => `${name}: ${value}%`}
//           paddingAngle={2}
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip formatter={(value) => `${value}%`} />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// }






// src/components/Descriptive/ExecutiveSummary/components/RegionalSummary.tsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'; // Removed Legend import as it wasn't in your preferred UI

interface ValueSalesQuarterlyDataPoint {
  regionName: string;
  year: number;
  quarter: number;
  quarterlyValueSales: string | number;
}

interface RegionalSummaryProps {
  apiData: ValueSalesQuarterlyDataPoint[]; 
}

// Using the COLORS array from your preferred UI version
const COLORS = [
  '#E6B8DE', // Soft Pink
  '#B8D8EB', // Pastel Blue
  '#D8E6B8', // Pastel Lime
  '#EBB8D8', // Light Lavender
  '#B8EBE6', // Mint
  '#E6D8B8', // Cream
  '#D8B8EB', // Soft Purple
  // Add more if you anticipate more than 7 regions often, 
  // otherwise it will cycle through these.
];

export function RegionalSummary({ apiData }: RegionalSummaryProps) {
  // console.log('[RegionalSummary] Received apiData:', apiData); // Keep for debugging if needed

  if (!apiData || apiData.length === 0) {
    return <p className="text-center p-4 text-gray-500">No data available for Regional Summary.</p>;
  }

  const salesByRegion: { [key: string]: number } = {};
  apiData.forEach(item => {
    if (item.regionName && item.regionName.toUpperCase() !== 'ALL') {
      const sales = parseFloat(String(item.quarterlyValueSales));
      if (!isNaN(sales)) {
        salesByRegion[item.regionName] = (salesByRegion[item.regionName] || 0) + sales;
      }
    }
  });

  let totalSales = 0;
  Object.values(salesByRegion).forEach(sales => {
    totalSales += sales;
  });

  const pieChartData = Object.entries(salesByRegion).map(([name, sales]) => ({
    name,
    value: totalSales > 0 ? parseFloat(((sales / totalSales) * 100).toFixed(2)) : 0, // This is the percentage
    // absoluteValue: sales // We can still keep this if the tooltip needs it
  })).sort((a,b) => b.value - a.value); // Optional: sort if you like

  if (pieChartData.length === 0) {
     return <p className="text-center p-4 text-gray-500">No regional data to display.</p>;
  }

  return (
    // Using height={250} from your preferred UI
    <ResponsiveContainer width="100%" height={250}> 
      <PieChart>
        <Pie
          data={pieChartData} // Using dynamic data
          cx="48%"             // From your preferred UI
          cy="50%"             // From your preferred UI
          innerRadius={65}     // From your preferred UI
          outerRadius={85}     // From your preferred UI
          fill="#8884d8"        // Default fill, overridden by Cells
          dataKey="value"       // Plotting the percentage 'value'
          label={({ name, value }) => `${name}: ${value.toFixed(1)}%`} // Label from preferred UI, using toFixed(1) for percentage
          paddingAngle={2}      // From your preferred UI
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        {/* Tooltip from your preferred UI, formats the 'value' (which is percentage) */}
        <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} /> 
      </PieChart>
    </ResponsiveContainer>
  );
}