// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   { month: 'Jan', MONDELEZ: 40, CORACOES: 12, MARATA: 8, OUTROS: 40 },
//   { month: 'Feb', MONDELEZ: 40, CORACOES: 12, MARATA: 8, OUTROS: 40 },
//   { month: 'Mar', MONDELEZ: 41, CORACOES: 13, MARATA: 8, OUTROS: 38 },
//   { month: 'Apr', MONDELEZ: 41, CORACOES: 13, MARATA: 8, OUTROS: 38 },
//   { month: 'May', MONDELEZ: 42, CORACOES: 14, MARATA: 8, OUTROS: 36 },
//   { month: 'Jun', MONDELEZ: 41, CORACOES: 13, MARATA: 8, OUTROS: 38 },
//   { month: 'Jul', MONDELEZ: 41, CORACOES: 13, MARATA: 8, OUTROS: 38 },
//   { month: 'Aug', MONDELEZ: 40, CORACOES: 12, MARATA: 8, OUTROS: 40 },
//   { month: 'Sep', MONDELEZ: 40, CORACOES: 12, MARATA: 8, OUTROS: 40 },
//   { month: 'Oct', MONDELEZ: 41, CORACOES: 12, MARATA: 8, OUTROS: 39 },
//   { month: 'Nov', MONDELEZ: 41, CORACOES: 12, MARATA: 8, OUTROS: 39 },
//   { month: 'Dec', MONDELEZ: 41, CORACOES: 12, MARATA: 8, OUTROS: 39 },
// ];

// export function VolumeMarketShare() {
//   return (
//     <ResponsiveContainer width="100%" height={320}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="month" />
//         <YAxis
//           domain={[0, 50]}
//           tickFormatter={(value) => `${value}%`}
//           label={{
//             value: "Market Share (%)",
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
//         <Line type="monotone" dataKey="OUTROS" stroke="#ffc658" />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }





// // src/components/Descriptive/ExecutiveSummary/components/VolumeMarketShare.tsx
// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// // Interface for the data items received from API for this chart
// interface ApiDataPoint {
//   year: number;
//   month: number;
//   monthName: string;
//   manufacturerGroup: string;
//   monthlyUnitSales: string | number; // API might send as string
// }

// interface VolumeMarketShareProps {
//   data: ApiDataPoint[]; // This prop will come from ExecutiveSummary/index.tsx
// }

// // Define consistent colors for your main manufacturers
// // You can expand this or make it more dynamic if needed
// const manufacturerColors: { [key: string]: string } = {
//   MONDELEZ: '#4a235a', // Dark Purple
//   LU: '#8e44ad',       // Medium Purple
//   BIMBO: '#c39bd3',    // Light Purple
//   CORACOES: '#8884d8', // Recharts default purple
//   MARATA: '#82ca9d',   // Recharts default green
//   OUTROS: '#cccccc',   // Grey for Others
// };

// const getRandomColorFallback = () => {
//   // Simple fallback if a manufacturer isn't in the map
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// };


// export function VolumeMarketShare({ data: rawApiData }: VolumeMarketShareProps) {
//   if (!rawApiData || rawApiData.length === 0) {
//     return <p className="text-center p-4 text-gray-500">No data available for Volume Market Share.</p>;
//   }

//   // 1. Sort data: Essential for line charts to connect points correctly.
//   //    Sort by year, then by month.
//   const sortedApiData = [...rawApiData].sort((a, b) => {
//     if (a.year !== b.year) {
//       return a.year - b.year;
//     }
//     return a.month - b.month; // Assuming month is 1-12
//   });

//   // 2. Get unique month names for X-axis labels in the correct order.
//   //    We use the sorted data to ensure the month order is correct.
//   const labels = sortedApiData.reduce((acc, current) => {
//     if (!acc.includes(current.monthName)) {
//       acc.push(current.monthName);
//     }
//     return acc;
//   }, [] as string[]);


//   // 3. Get unique manufacturer groups to create a line for each.
//   const manufacturerGroups = [...new Set(sortedApiData.map(item => item.manufacturerGroup))];

//   // 4. Transform data for Recharts:
//   //    Create an array of objects, where each object represents a point on the X-axis (a month).
//   //    Each object will have a key for the month (e.g., 'monthName') and
//   //    keys for each manufacturer group holding their sales value for that month.
//   const chartData = labels.map(monthName => {
//     const monthObject: { monthName: string; [key: string]: number | undefined } = { monthName };
//     manufacturerGroups.forEach(group => {
//       const entry = sortedApiData.find(
//         item => item.monthName === monthName && item.manufacturerGroup === group
//       );
//       // Ensure value is a number, default to 0 or undefined if no data for that group in that month
//       monthObject[group] = entry ? parseFloat(String(entry.monthlyUnitSales)) : undefined; 
//     });
//     return monthObject;
//   });

//   // Determine a sensible Y-axis domain or let Recharts auto-calculate
//   let maxYValue = 0;
//   chartData.forEach(monthEntry => {
//     manufacturerGroups.forEach(group => {
//       if (typeof monthEntry[group] === 'number' && (monthEntry[group] as number) > maxYValue) {
//         maxYValue = monthEntry[group] as number;
//       }
//     });
//   });
//   const yAxisDomainMax = maxYValue > 0 ? Math.ceil(maxYValue / 100000) * 100000 * 1.1 : 100000; // Add 10% padding

//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//         <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//         <XAxis dataKey="monthName" tick={{ fontSize: 12 }} />
//         <YAxis
//           // domain={[0, yAxisDomainMax]} // Optional: set dynamic domain
//           tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} // Format ticks as "K" (thousands)
//           tick={{ fontSize: 12 }}
//           label={{
//             value: "Market Share (%)",
//             angle: -90,
//             position: "insideLeft",
//             style: { textAnchor: 'middle', fontSize: '14px', fill: '#666' },
//             dy: -10 // Adjust to prevent overlap if needed
//           }}
//         />
//         <Tooltip
//           formatter={(value: number | string, name: string) => [
//             `${typeof value === 'number' ? (value / 1000).toFixed(2) + 'K' : value}`, // Format tooltip value
//             name
//           ]}
//           labelStyle={{ fontWeight: 'bold' }}
//           wrapperStyle={{ border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}
//         />
//         <Legend wrapperStyle={{ paddingTop: '20px' }} />
//         {manufacturerGroups.map(group => (
//           <Line 
//             key={group}
//             type="monotone" 
//             dataKey={group} 
//             stroke={manufacturerColors[group] || getRandomColorFallback()} 
//             strokeWidth={group === 'MONDELEZ' ? 2.5 : 1.5} // Example: Highlight a specific manufacturer
//             dot={{ r: 3 }}
//             activeDot={{ r: 5 }}
//           />
//         ))}
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }






// // src/components/Descriptive/ExecutiveSummary/components/VolumeMarketShare.tsx
// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// // Interface for the data items received from API for this chart
// interface ApiDataPoint {
//   year: number;
//   month: number;
//   monthName: string;
//   manufacturerGroup: string; // Will be "MAN_715cc2", "MAN_920d0c", "OUTROS", etc.
//   monthlyUnitSales: string | number; 
// }

// interface VolumeMarketShareProps {
//   data: ApiDataPoint[]; 
// }

// // Color map uses DEBRANDED IDs (and "OUTROS") as keys
// // !!! UPDATE THESE WITH YOUR ACTUAL MAN_... CODES AND DESIRED COLORS !!!
// const debrandedManufacturerColors: { [key: string]: string } = {
//   'MAN_715cc2': '#4a235a', // Example: Color for Mondelez's debranded ID
//   'MAN_920d0c': '#8e44ad', // Example: Color for LU's debranded ID
//   'MAN_a75436': '#c39bd3', // Example: Color for BIMBO's debranded ID
//   // 'MAN_CORACOES_ID_FROM_API_FILTERS': '#8884d8', 
//   // 'MAN_MARATA_ID_FROM_API_FILTERS': '#82ca9d',   
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

// export function VolumeMarketShare({ data: rawApiData }: VolumeMarketShareProps) {
//   if (!rawApiData || rawApiData.length === 0) {
//     return <p className="text-center p-4 text-gray-500">No data available for Volume Market Share.</p>;
//   }

//   const sortedApiData = [...rawApiData].sort((a, b) => {
//     if (a.year !== b.year) return a.year - b.year;
//     return a.month - b.month;
//   });

//   const labels = sortedApiData.reduce((acc, current) => {
//     if (!acc.includes(current.monthName)) acc.push(current.monthName);
//     return acc;
//   }, [] as string[]);

//   // manufacturerGroups will now contain "MAN_715cc2", "MAN_920d0c", "OUTROS", etc.
//   const manufacturerGroups = [...new Set(sortedApiData.map(item => item.manufacturerGroup))];

//   const chartData = labels.map(monthName => {
//     const monthObject: { monthName: string; [key: string]: number | undefined } = { monthName };
//     manufacturerGroups.forEach(group => { // group is now a MAN_... code or "OUTROS"
//       const entry = sortedApiData.find(
//         item => item.monthName === monthName && item.manufacturerGroup === group
//       );
//       monthObject[group] = entry ? parseFloat(String(entry.monthlyUnitSales)) : undefined; 
//     });
//     return monthObject;
//   });
  
//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}> {/* Increased bottom margin for legend */}
//         <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//         <XAxis dataKey="monthName" tick={{ fontSize: 12 }} />
//         <YAxis
//           tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
//           tick={{ fontSize: 12 }}
//           label={{
//             value: "Market Share (%)", 
//             angle: -90,
//             position: "insideLeft",
//             style: { textAnchor: 'middle', fontSize: '14px', fill: '#666' },
//             dy: 0, // Adjust dy if label overlaps with ticks
//             dx: -10
//           }}
//         />
//         <Tooltip
//           formatter={(value: number | string, name: string) => [ // 'name' will be MAN_... or OUTROS
//             `${typeof value === 'number' ? (value / 1000).toFixed(2) + 'K' : value}`, 
//             name // Legend and Tooltip will show the debranded ID
//           ]}
//           labelStyle={{ fontWeight: 'bold' }}
//           wrapperStyle={{ border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white', zIndex: 1000 }}
//         />
//         <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '10px' }}/>
//         {manufacturerGroups.map(group => ( // 'group' is "MAN_715cc2", "OUTROS", etc.
//           <Line 
//             key={group}
//             type="monotone" 
//             dataKey={group} // This matches keys in chartData objects like chartData[0].MAN_715cc2
//             name={group}    // Explicitly set name for Legend and Tooltip to use the debranded ID
//             stroke={debrandedManufacturerColors[group] || getRandomColorFallback()} 
//             strokeWidth={group === 'MAN_715cc2' ? 2.5 : 1.5} // Example: Highlight Mondelez by its debranded ID
//             dot={{ r: 3 }}
//             activeDot={{ r: 6 }}
//           />
//         ))}
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }





// src/components/Descriptive/ExecutiveSummary/components/VolumeMarketShare.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ApiDataPoint {
  year: number;
  month: number;
  monthName: string;
  manufacturerGroup: string;
  monthlyUnitSales: string | number; 
}

interface VolumeMarketShareProps {
  data: ApiDataPoint[]; 
}

const debrandedManufacturerColors: { [key: string]: string } = {
  'MAN_715cc2': '#4a235a', 
  'MAN_920d0c': '#8e44ad', 
  'MAN_a75436': '#c39bd3', 
  'OUTROS': '#cccccc',   
  // Add others as needed
};

const getRandomColorFallback = () => { /* ... same as before ... */
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export function VolumeMarketShare({ data: rawApiData }: VolumeMarketShareProps) {
  if (!rawApiData || rawApiData.length === 0) {
    return <p className="text-center p-4 text-gray-500">No data available for Volume Market Share.</p>;
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

  // <<<< CHANGED: Transform data to calculate percentages >>>>
  const chartData = labels.map(monthName => {
    const monthObject: { monthName: string; [key: string]: number | undefined } = { monthName };
    
    // Get all entries for the current month
    const entriesForMonth = sortedApiData.filter(item => item.monthName === monthName);
    
    // Calculate total unit sales for this month
    let totalMonthlySales = 0;
    entriesForMonth.forEach(entry => {
      totalMonthlySales += parseFloat(String(entry.monthlyUnitSales)) || 0;
    });

    manufacturerGroups.forEach(group => {
      const entry = entriesForMonth.find(item => item.manufacturerGroup === group);
      const groupSales = entry ? parseFloat(String(entry.monthlyUnitSales)) : 0;
      
      // Calculate percentage share
      monthObject[group] = totalMonthlySales > 0 ? parseFloat(((groupSales / totalMonthlySales) * 100).toFixed(2)) : 0;
    });
    return monthObject;
  });
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 10  }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="monthName" tick={{ fontSize: 12 }} />
        <YAxis
          domain={[0, 100]} // Percentages range from 0 to 100
          tickFormatter={(value) => `${value}%`} // Format ticks as percentages
          tick={{ fontSize: 12 }}
          label={{
            value: "Market Share (%)", // <<<< CHANGED Y-axis label
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: 'middle', fontSize: '14px', fill: '#666' },
            dy: 0, 
            dx: -10
          }}
        />
        <Tooltip
          formatter={(value: number | string, name: string) => [
            `${typeof value === 'number' ? value.toFixed(2) + '%' : value}`, // Format tooltip value as %
            name 
          ]}
          labelStyle={{ fontWeight: 'bold' }}
          wrapperStyle={{ border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white', zIndex: 1000 }}
        />
        <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '10px' }}/>
        {manufacturerGroups.map(group => (
          <Line 
            key={group}
            type="monotone" 
            dataKey={group} 
            name={group}    
            stroke={debrandedManufacturerColors[group] || getRandomColorFallback()} 
            strokeWidth={group === 'MAN_715cc2' ? 2.5 : 1.5} 
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}