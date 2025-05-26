// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   { month: 'Jan', MONDELEZ: 15000000, CORACOES: 5000000, MARATA: 3000000 },
//   { month: 'Feb', MONDELEZ: 14500000, CORACOES: 5100000, MARATA: 3100000 },
//   { month: 'Mar', MONDELEZ: 14000000, CORACOES: 5200000, MARATA: 3200000 },
//   { month: 'Apr', MONDELEZ: 13500000, CORACOES: 5300000, MARATA: 3300000 },
//   { month: 'May', MONDELEZ: 13000000, CORACOES: 5400000, MARATA: 3400000 },
//   { month: 'Jun', MONDELEZ: 12500000, CORACOES: 5500000, MARATA: 3500000 },
//   { month: 'Jul', MONDELEZ: 11000000, CORACOES: 5600000, MARATA: 3600000 },
//   { month: 'Aug', MONDELEZ: 10500000, CORACOES: 5700000, MARATA: 3700000 },
//   { month: 'Sep', MONDELEZ: 11000000, CORACOES: 5800000, MARATA: 3800000 },
//   { month: 'Oct', MONDELEZ: 12000000, CORACOES: 5900000, MARATA: 3900000 },
//   { month: 'Nov', MONDELEZ: 13000000, CORACOES: 6000000, MARATA: 4000000 },
//   { month: 'Dec', MONDELEZ: 13500000, CORACOES: 6100000, MARATA: 4100000 },
// ];

// export function PerformanceOverTime() {
//   return (
//     <ResponsiveContainer width="100%" height={270}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="month" />
//         <YAxis
//           domain={[0, 15000000]} // Set Y-axis range up to 1,500,000,000
//           tickCount={6} // Number of evenly spaced ticks
//           tickFormatter={(value) => `${value / 1000000}M`} // Format ticks as "M" (millions)
//           label={{
//             value: "KPI (Millions)",
//             angle: -90,
//             position: "outsideLeft", // Keeps the label outside the axis ticks
//             dx: -30, // Move label further to the left
//             dy: 5,   // Adjust vertical alignment if needed
//           }}
//         />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="MONDELEZ" stroke="#4a235a" strokeWidth={2} />
//         <Line type="monotone" dataKey="CORACOES" stroke="#8884d8" />
//         <Line type="monotone" dataKey="MARATA" stroke="#82ca9d" />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }








// // src/components/Descriptive/ExecutiveSummary/components/PerformanceOverTime.tsx
// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// // Interface for the data items received from API for this chart
// interface ApiDataPoint {
//   year: number;
//   month: number;
//   monthName: string;
//   manufacturerGroup: string;
//   monthlyValueSales: string | number; // API might send as string
// }

// interface PerformanceOverTimeProps {
//   data: ApiDataPoint[]; // This prop will come from ExecutiveSummary/index.tsx
// }

// // Define consistent colors for your main manufacturers (can be shared or defined per chart)
// const manufacturerColors: { [key: string]: string } = {
//   MONDELEZ: '#4a235a', 
//   LU: '#8e44ad',       
//   BIMBO: '#c39bd3',    
//   CORACOES: '#8884d8', 
//   MARATA: '#82ca9d',   
//   OUTROS: '#cccccc',   
// };

// const getRandomColorFallback = () => {
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// };

// export function PerformanceOverTime({ data: rawApiData }: PerformanceOverTimeProps) {
//   if (!rawApiData || rawApiData.length === 0) {
//     return <p className="text-center p-4 text-gray-500">No data available for Value Sales Performance.</p>;
//   }

//   // 1. Sort data by year then month for correct line rendering
//   const sortedApiData = [...rawApiData].sort((a, b) => {
//     if (a.year !== b.year) {
//       return a.year - b.year;
//     }
//     return a.month - b.month;
//   });

//   // 2. Get unique month names for X-axis labels in order
//   const labels = sortedApiData.reduce((acc, current) => {
//     if (!acc.includes(current.monthName)) {
//       acc.push(current.monthName);
//     }
//     return acc;
//   }, [] as string[]);

//   // 3. Get unique manufacturer groups
//   const manufacturerGroups = [...new Set(sortedApiData.map(item => item.manufacturerGroup))];

//   // 4. Transform data for Recharts
//   const chartData = labels.map(monthName => {
//     const monthObject: { monthName: string; [key: string]: number | undefined } = { monthName };
//     manufacturerGroups.forEach(group => {
//       const entry = sortedApiData.find(
//         item => item.monthName === monthName && item.manufacturerGroup === group
//       );
//       monthObject[group] = entry ? parseFloat(String(entry.monthlyValueSales)) : undefined;
//     });
//     return monthObject;
//   });

//   // Dynamic Y-axis domain (optional, Recharts can auto-calculate)
//   // let maxYValue = 0;
//   // chartData.forEach(monthEntry => {
//   //   manufacturerGroups.forEach(group => {
//   //     if (typeof monthEntry[group] === 'number' && (monthEntry[group] as number) > maxYValue) {
//   //       maxYValue = monthEntry[group] as number;
//   //     }
//   //   });
//   // });
//   // const yAxisDomainMax = maxYValue > 0 ? Math.ceil(maxYValue / 1000000) * 1000000 * 1.1 : 1000000; // Example: round up to next million, add 10%

//   return (
//     <ResponsiveContainer width="100%" height="100%"> {/* Use parent's height */}
//       <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//         <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
//         <XAxis dataKey="monthName" tick={{ fontSize: 12 }} />
//         <YAxis
//           // domain={[0, yAxisDomainMax]} // Optional dynamic domain
//           tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} // Format ticks as "M" (millions)
//           tick={{ fontSize: 12 }}
//           label={{
//             value: "KPI (Millions)",
//             angle: -90,
//             position: "insideLeft",
//             style: { textAnchor: 'middle', fontSize: '14px', fill: '#666' },
//             dy: -5 // Adjust if needed
//           }}
//         />
//         <Tooltip 
//           formatter={(value: number | string, name: string) => [
//             `R$${typeof value === 'number' ? (value / 1000000).toFixed(2) + 'M' : value}`, // Format tooltip value
//             name
//           ]}
//           labelStyle={{ fontWeight: 'bold' }}
//           wrapperStyle={{ border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}
//         />
//         <Legend wrapperStyle={{ paddingTop: '20px' }}/>
//         {manufacturerGroups.map(group => (
//           <Line 
//             key={group}
//             type="monotone" 
//             dataKey={group} 
//             stroke={manufacturerColors[group] || getRandomColorFallback()} 
//             strokeWidth={group === 'MONDELEZ' ? 2.5 : 1.5}
//             dot={{ r: 3 }}
//             activeDot={{ r: 5 }}
//           />
//         ))}
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }







// // src/components/Descriptive/ExecutiveSummary/components/PerformanceOverTime.tsx
// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// interface ApiDataPoint {
//   year: number;
//   month: number;
//   monthName: string;
//   manufacturerGroup: string; // This will be "MONDELEZ", "LU", "BIMBO", "OUTROS", etc. from API
//   monthlyValueSales: string | number;
// }

// interface PerformanceOverTimeProps {
//   data: ApiDataPoint[];
// }

// // Use the DISPLAY NAMES as keys for consistent coloring
// const manufacturerDisplayColors: { [key: string]: string } = {
//   'MONDELEZ': '#4a235a', 
//   'LU': '#8e44ad',       
//   'BIMBO': '#c39bd3',    
//   'CORACOES': '#8884d8', // Add if Coracoes is a group name you defined in backend
//   'MARATA': '#82ca9d',   // Add if Marata is a group name you defined in backend
//   'OUTROS': '#cccccc',   
// };

// const getRandomColorFallback = () => {
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// };

// export function PerformanceOverTime({ data: rawApiData }: PerformanceOverTimeProps) {
//   if (!rawApiData || rawApiData.length === 0) {
//     return <p className="text-center p-4 text-gray-500">No data available for Value Sales Performance.</p>;
//   }

//   const sortedApiData = [...rawApiData].sort((a, b) => {
//     if (a.year !== b.year) return a.year - b.year;
//     return a.month - b.month;
//   });

//   const labels = sortedApiData.reduce((acc, current) => {
//     if (!acc.includes(current.monthName)) acc.push(current.monthName);
//     return acc;
//   }, [] as string[]);

//   // manufacturerGroups will contain "MONDELEZ", "LU", "BIMBO", "OUTROS", etc.
//   const manufacturerGroups = [...new Set(sortedApiData.map(item => item.manufacturerGroup))];

//   const chartData = labels.map(monthName => {
//     const monthObject: { monthName: string; [key: string]: number | undefined } = { monthName };
//     manufacturerGroups.forEach(group => {
//       const entry = sortedApiData.find(
//         item => item.monthName === monthName && item.manufacturerGroup === group
//       );
//       monthObject[group] = entry ? parseFloat(String(entry.monthlyValueSales)) : undefined;
//     });
//     return monthObject;
//   });

//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//         <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
//         <XAxis dataKey="monthName" tick={{ fontSize: 12 }} />
//         <YAxis
//           tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
//           tick={{ fontSize: 12 }}
//           label={{
//             value: "KPI (Millions)", angle: -90, position: "insideLeft",
//             style: { textAnchor: 'middle', fontSize: '14px', fill: '#666' }, dy: -5
//           }}
//         />
//         <Tooltip 
//           formatter={(value: number | string, name: string) => [
//             `R$${typeof value === 'number' ? (value / 1000000).toFixed(2) + 'M' : value}`,
//             name
//           ]}
//           labelStyle={{ fontWeight: 'bold' }}
//           wrapperStyle={{ border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}
//         />
//         <Legend wrapperStyle={{ paddingTop: '20px' }}/>
//         {manufacturerGroups.map(group => ( // 'group' here will be "MONDELEZ", "LU", etc.
//           <Line 
//             key={group}
//             type="monotone" 
//             dataKey={group} // This matches the keys in chartData objects e.g. chartData[0].MONDELEZ
//             stroke={manufacturerDisplayColors[group] || getRandomColorFallback()} // Use display name for color lookup
//             strokeWidth={group === 'MONDELEZ' ? 2.5 : 1.5}
//             dot={{ r: 3 }}
//             activeDot={{ r: 5 }}
//           />
//         ))}
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }







// src/components/Descriptive/ExecutiveSummary/components/PerformanceOverTime.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ApiDataPoint {
  year: number;
  month: number;
  monthName: string;
  manufacturerGroup: string; // This will be "MAN_715cc2", "MAN_920d0c", "OUTROS", etc.
  monthlyValueSales: string | number;
}

interface PerformanceOverTimeProps {
  data: ApiDataPoint[];
}

// Color map uses DEBRANDED IDs (and "OUTROS") as keys
// !!! UPDATE THESE WITH YOUR ACTUAL MAN_... CODES AND DESIRED COLORS !!!
const debrandedManufacturerColors: { [key: string]: string } = {
  'MAN_715cc2': '#4a235a', 
  'MAN_920d0c': '#8e44ad',       
  'MAN_a75436': '#c39bd3',    
  // 'MAN_CORACOES_ID_FROM_API_FILTERS': '#8884d8', 
  // 'MAN_MARATA_ID_FROM_API_FILTERS': '#82ca9d',   
  'OUTROS': '#cccccc',   
};

const getRandomColorFallback = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export function PerformanceOverTime({ data: rawApiData }: PerformanceOverTimeProps) {
  if (!rawApiData || rawApiData.length === 0) {
    return <p className="text-center p-4 text-gray-500">No data available for Value Sales Performance.</p>;
  }

  const sortedApiData = [...rawApiData].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.month - b.month;
  });

  const labels = sortedApiData.reduce((acc, current) => {
    if (!acc.includes(current.monthName)) acc.push(current.monthName);
    return acc;
  }, [] as string[]);

  const manufacturerGroups = [...new Set(sortedApiData.map(item => item.manufacturerGroup))];

  const chartData = labels.map(monthName => {
    const monthObject: { monthName: string; [key: string]: number | undefined } = { monthName };
    manufacturerGroups.forEach(group => {
      const entry = sortedApiData.find(
        item => item.monthName === monthName && item.manufacturerGroup === group
      );
      monthObject[group] = entry ? parseFloat(String(entry.monthlyValueSales)) : undefined;
    });
    return monthObject;
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 10 }}> {/* Increased bottom margin for legend */}
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
        <XAxis dataKey="monthName" tick={{ fontSize: 12 }} />
        <YAxis
          tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
          tick={{ fontSize: 12 }}
          label={{
            value: "KPI (Millions)", angle: -90, position: "insideLeft",
            style: { textAnchor: 'middle', fontSize: '14px', fill: '#666' }, dy: 0, dx: -10
          }}
        />
        <Tooltip 
          formatter={(value: number | string, name: string) => [ // 'name' will be MAN_... or OUTROS
            `${typeof value === 'number' ? (value / 1000000).toFixed(2) + 'M' : value}`,
            name // Legend and Tooltip will now show the debranded ID
          ]}
          labelStyle={{ fontWeight: 'bold' }}
          wrapperStyle={{ border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white', zIndex: 1000 }}
        />
        <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '10px' }}/>
        {manufacturerGroups.map(group => ( // 'group' is "MAN_715cc2", "OUTROS", etc.
          <Line 
            key={group}
            type="monotone" 
            dataKey={group} 
            name={group} // Explicitly set name for Legend and Tooltip
            stroke={debrandedManufacturerColors[group] || getRandomColorFallback()} 
            strokeWidth={group === 'MAN_715cc2' ? 2.5 : 1.5} // Example to highlight by debranded ID
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}