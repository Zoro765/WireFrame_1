// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// const data = [
//   { name: 'Traditional', value: 17.10 },
//   { name: 'C&C', value: 21.20 },
//   { name: 'Hyper', value: 6.43 },
//   { name: 'Super G', value: 10.69 },
//   { name: 'Super P', value: 3.74 },
//   { name: 'Independente', value: 40.84 },
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
// // ];

// export function ChannelDistribution() {
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



// src/components/Descriptive/ExecutiveSummary/components/ChannelDistribution.tsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Interface for the data points received from API for this chart
interface ChannelApiDataPoint {
  channelName: string;        // As aliased in kpiService.ts
  salesValue: string | number; // As aliased in kpiService.ts
}

interface ChannelDistributionProps {
  apiData: ChannelApiDataPoint[]; // Prop name to receive data
}

// Using the COLORS array from your static version
const CHANNEL_COLORS = [ // Renamed to avoid conflict if COLORS is used elsewhere
  '#E6B8DE', // Soft Pink
  '#B8D8EB', // Pastel Blue
  '#D8E6B8', // Pastel Lime
  '#EBB8D8', // Light Lavender
  '#B8EBE6', // Mint
  '#E6D8B8', // Cream
  '#D8B8EB', // Soft Purple
  // Add more colors if you anticipate more than 7 channels
];

export function ChannelDistribution({ apiData }: ChannelDistributionProps) {
  // console.log('[ChannelDistribution] Received apiData:', apiData);

  if (!apiData || apiData.length === 0) {
    return <p className="text-center p-4 text-gray-500">No data available for Channel Distribution.</p>;
  }

  // 1. Calculate total sales for percentage calculation
  let totalSales = 0;
  apiData.forEach(item => {
    const sales = parseFloat(String(item.salesValue));
    if (!isNaN(sales)) {
      totalSales += sales;
    }
  });

  // 2. Prepare data for the PieChart (name and percentage value)
  const pieChartData = apiData
    .map(item => {
      const sales = parseFloat(String(item.salesValue));
      return {
        name: item.channelName, // Use channelName from API data
        value: totalSales > 0 && !isNaN(sales) ? parseFloat(((sales / totalSales) * 100).toFixed(2)) : 0,
        absoluteValue: !isNaN(sales) ? sales : 0, // Store absolute value for tooltip
      };
    })
    .filter(item => item.value > 0) // Optional: filter out channels with 0% share to avoid clutter
    .sort((a, b) => b.value - a.value); // Optional: sort by value descending

  if (pieChartData.length === 0) {
     return <p className="text-center p-4 text-gray-500">No channel data processed for display.</p>;
  }
  
  return (
    <ResponsiveContainer width="100%" height={250}> {/* Height from your static version */}
      <PieChart>
        <Pie
          data={pieChartData}        // Using dynamic data
          cx="48%"                  // From your static version
          cy="50%"                  // From your static version
          innerRadius={65}          // From your static version (for donut)
          outerRadius={85}          // From your static version
          fill="#8884d8"             // Default fill, overridden by Cells
          dataKey="value"            // Plotting the percentage 'value'
          label={({ name, value }) => `${name}: ${value.toFixed(1)}%`} // Label from static version
          paddingAngle={2}           // From your static version
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={CHANNEL_COLORS[index % CHANNEL_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number, name: string, props) => {
              // Assuming props.payload.absoluteValue contains the raw sales figure
              const absoluteVal = props.payload.absoluteValue;
              const formattedAbsolute = `R$${(absoluteVal / 1000000).toFixed(2)}M`; // Example formatting
              return [`${value.toFixed(2)}% (${formattedAbsolute})`, name];
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}