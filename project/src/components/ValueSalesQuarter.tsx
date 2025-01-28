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
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="quarter" />
        <YAxis
          domain={[0, 80000000]} // Set the Y-axis range from 0 to 80,000,000
          tickCount={5} // Number of evenly spaced ticks
          tickFormatter={(value) => `${value / 1000000}M`} // Format ticks as "M" (millions)
          label={{
            value: "KPI (Millions)",
            angle: -90,
            position: "outsideLeft", // Keeps the label outside the axis ticks
            dx: -30, // Move label further to the left
            dy: 5,   // Adjust vertical alignment if needed
          }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="region1" stackId="a" fill="#B5D8EB" name="Region 1" /> {/* Pastel Blue */}
        <Bar dataKey="region2" stackId="a" fill="#F7CAC9" name="Region 2" /> {/* Pastel Pink */}
        <Bar dataKey="region3" stackId="a" fill="#C3E2C2" name="Region 3" /> {/* Pastel Green */}
        <Bar dataKey="region4" stackId="a" fill="#FFEEAD" name="Region 4" /> {/* Pastel Yellow */}
        <Bar dataKey="region5" stackId="a" fill="#E6B5C9" name="Region 5" /> {/* Pastel Purple */}
      </BarChart>
    </ResponsiveContainer>
  );
}