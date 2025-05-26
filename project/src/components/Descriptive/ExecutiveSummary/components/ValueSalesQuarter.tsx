// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     quarter: 'Q1',
//     region1: 40000000,
//     region2: 15000000,
//     region3: 10000000,
//     region4: 5000000,
//     region5: 5000000,
//   },
//   {
//     quarter: 'Q2',
//     region1: 18000000,
//     region2: 12000000,
//     region3: 8000000,
//     region4: 4000000,
//     region5: 4000000,
//   },
//   {
//     quarter: 'Q3',
//     region1: 15000000,
//     region2: 10000000,
//     region3: 7000000,
//     region4: 3000000,
//     region5: 3000000,
//   },
//   {
//     quarter: 'Q4',
//     region1: 22000000,
//     region2: 13000000,
//     region3: 9000000,
//     region4: 6000000,
//     region5: 6000000,
//   },
// ];

// export function ValueSalesQuarter() {
//   return (
//     <ResponsiveContainer width="100%" height={320}>
//       <BarChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="quarter" />
//         <YAxis
//           domain={[0, 80000000]} // Set the Y-axis range from 0 to 80,000,000
//           tickCount={5} // Number of evenly spaced ticks
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
//         <Bar dataKey="region1" stackId="a" fill="#B5D8EB" name="Region 1" /> {/* Pastel Blue */}
//         <Bar dataKey="region2" stackId="a" fill="#F7CAC9" name="Region 2" /> {/* Pastel Pink */}
//         <Bar dataKey="region3" stackId="a" fill="#C3E2C2" name="Region 3" /> {/* Pastel Green */}
//         <Bar dataKey="region4" stackId="a" fill="#FFEEAD" name="Region 4" /> {/* Pastel Yellow */}
//         <Bar dataKey="region5" stackId="a" fill="#E6B5C9" name="Region 5" /> {/* Pastel Purple */}
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }







// src/components/Descriptive/ExecutiveSummary/components/ValueSalesQuarter.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Interface for the data points received from API
interface ApiDataPoint {
  regionName: string;
  year: number;    // Available from API, though not directly used in this chart's transform logic
  quarter: number; // Used for grouping
  quarterlyValueSales: string | number;
}

interface ValueSalesQuarterProps {
  data: ApiDataPoint[]; // Prop name from ExecutiveSummary/index.tsx
}

// Define consistent colors for regions. Expand this list or use a generator if you have many.
const REGION_COLORS_STACKED = [
  '#B5D8EB', // Pastel Blue (Region 1 in your static example)
  '#F7CAC9', // Pastel Pink (Region 2)
  '#C3E2C2', // Pastel Green (Region 3)
  '#FFEEAD', // Pastel Yellow (Region 4)
  '#E6B5C9', // Pastel Purple (Region 5)
  '#E6B8DE', '#D8E6B8', '#EBB8D8', '#B8EBE6', '#E6D8B8', 
];

export function ValueSalesQuarter({ data: rawApiData }: ValueSalesQuarterProps) {
  // console.log('[ValueSalesQuarter] Received rawApiData:', rawApiData);

  if (!rawApiData || rawApiData.length === 0) {
    return <p className="text-center p-4 text-gray-500">No data available for Value Sales - Quarter Analysis.</p>;
  }

  // 1. Filter out "ALL" regions and collect all unique region names (for creating <Bar> components)
  const individualRegionsData = rawApiData.filter(
    item => item.regionName && item.regionName.toUpperCase() !== 'ALL'
  );

  if (individualRegionsData.length === 0) {
    return <p className="text-center p-4 text-gray-500">No specific regional data to display for quarterly sales.</p>;
  }

  const regionNames = [...new Set(individualRegionsData.map(item => item.regionName))]
                      .sort(); // Sort region names alphabetically for consistent bar order

  // 2. Transform data for Recharts Stacked Bar Chart
  //    Group data by quarter, then create an object for each quarter with regions as keys
  const chartData = [1, 2, 3, 4].map(q => { // Assuming 4 quarters
    const quarterObject: { quarterName: string; [key: string]: number | undefined } = {
      quarterName: `Q${q}`,
    };

    regionNames.forEach(region => {
      const entry = individualRegionsData.find(
        item => item.quarter === q && item.regionName === region
      );
      quarterObject[region] = entry ? parseFloat(String(entry.quarterlyValueSales)) : 0; // Default to 0 if no data
    });
    return quarterObject;
  });
  
  // console.log('[ValueSalesQuarter] Transformed chartData:', chartData);
  // console.log('[ValueSalesQuarter] Region names for bars:', regionNames);

  // Determine a sensible Y-axis domain or let Recharts auto-calculate based on total stack height
  let maxYValue = 0;
  chartData.forEach(quarterEntry => {
    let quarterlyTotal = 0;
    regionNames.forEach(region => {
      quarterlyTotal += (quarterEntry[region] || 0);
    });
    if (quarterlyTotal > maxYValue) {
      maxYValue = quarterlyTotal;
    }
  });
  const yAxisDomainMax = maxYValue > 0 ? Math.ceil(maxYValue / 10000000) * 10000000 * 1.1 : 80000000; // Add 10% padding, default 80M

  return (
    <ResponsiveContainer width="100%" height="100%"> {/* Use parent's height */}
      <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 10  }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
        <XAxis dataKey="quarterName" tick={{ fontSize: 12 }} />
        <YAxis
          // domain={[0, yAxisDomainMax]} // Optional dynamic domain
          tickCount={5} 
          tickFormatter={(value) => `${Math.round(value / 1000000)}M`}
          tick={{ fontSize: 12 }}
          label={{
            value: "KPI (Millions)",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: 'middle', fontSize: '14px', fill: '#666' },
            dy: 10, // Adjust position if needed
            dx: -10
          }}
        />
        <Tooltip 
            formatter={(value: number, name: string) => [
                `R$${(value / 1000000).toFixed(2)}M`,
                name // This will be the regionName
            ]}
            labelStyle={{ fontWeight: 'bold' }}
            wrapperStyle={{ border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white', zIndex: 1000 }}
        />
        <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '10px', paddingBottom: '0px', lineHeight: '1em' }} iconSize={10} />
        {regionNames.map((region, index) => (
          <Bar 
            key={region} 
            dataKey={region} // This matches keys in chartData objects e.g. chartData[0]['AREA 1']
            stackId="a" // All bars with same stackId will be stacked
            name={region} // Name for Legend and Tooltip
            fill={REGION_COLORS_STACKED[index % REGION_COLORS_STACKED.length]} 
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}