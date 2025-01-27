import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    quarter: 'Q1',
    region1: 40000000,
    region2: 15000000,
    region3: 10000000,
    region4: 5000000,
    region5: 5000000,
  },
  {
    quarter: 'Q2',
    region1: 18000000,
    region2: 12000000,
    region3: 8000000,
    region4: 4000000,
    region5: 4000000,
  },
  {
    quarter: 'Q3',
    region1: 15000000,
    region2: 10000000,
    region3: 7000000,
    region4: 3000000,
    region5: 3000000,
  },
  {
    quarter: 'Q4',
    region1: 22000000,
    region2: 13000000,
    region3: 9000000,
    region4: 6000000,
    region5: 6000000,
  },
];

export function ValueSalesQuarter() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="quarter" />
        <YAxis
          domain={[0, 80000000]} // Set the Y-axis range from 0 to 80,000,000
          tickCount={5} // Number of evenly spaced ticks
          tickFormatter={(value) => `${value / 1000000}M`} // Format ticks as "M" (millions)
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="region1" stackId="a" fill="#4A148C" name="Region 1" /> {/* Dark Purple */}
        <Bar dataKey="region2" stackId="a" fill="#6A1B9A" name="Region 2" /> {/* Light Purple */}
        <Bar dataKey="region3" stackId="a" fill="#AB47BC" name="Region 3" /> {/* Lighter Purple */}
        <Bar dataKey="region4" stackId="a" fill="#CE93D8" name="Region 4" /> {/* Lightest Purple */}
        <Bar dataKey="region5" stackId="a" fill="#E1BEE7" name="Region 5" /> {/* Very Light Purple */}
      </BarChart>
    </ResponsiveContainer>
  );
}


// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   { quarter: 'Q1', value: 80000000 },
//   { quarter: 'Q2', value: 60000000 },
//   { quarter: 'Q3', value: 50000000 },
//   { quarter: 'Q4', value: 70000000 },
// ];

// export function ValueSalesQuarter() {
//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <BarChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="quarter" />
//         <YAxis
//         domain={[0, 80000000]} // Set the Y-axis range from 0 to 80,000,000
//         tickCount={5} // Number of evenly spaced ticks
//         tickFormatter={(value) => `${value / 1000000}M`} // Format ticks as "M" (millions)
//       />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="region1" stackId="a" fill="#8884d8" name="Region 1" />
//       <Bar dataKey="region2" stackId="a" fill="#82ca9d" name="Region 2" />
//       <Bar dataKey="region3" stackId="a" fill="#ffc658" name="Region 3" />
//       <Bar dataKey="region4" stackId="a" fill="#ff8042" name="Region 4" />
//       <Bar dataKey="region5" stackId="a" fill="#0088fe" name="Region 5" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }