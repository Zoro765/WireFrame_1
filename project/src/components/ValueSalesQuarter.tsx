import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { quarter: 'Q1', value: 80000000 },
  { quarter: 'Q2', value: 60000000 },
  { quarter: 'Q3', value: 50000000 },
  { quarter: 'Q4', value: 70000000 },
];

export function ValueSalesQuarter() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="quarter" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#4a235a" />
      </BarChart>
    </ResponsiveContainer>
  );
}