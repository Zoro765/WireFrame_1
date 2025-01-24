import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'AREA I', value: 13.28 },
  { name: 'AREA II', value: 20.97 },
  { name: 'AREA III', value: 8.39 },
  { name: 'AREA IV', value: 8.39 },
  { name: 'AREA V', value: 8.17 },
  { name: 'AREA VI', value: 22.86 },
  { name: 'AREA VII', value: 9.44 },
];

const COLORS = ['#4a235a', '#6b3480', '#8e44ad', '#9b59b6', '#a569bd', '#bb8fce', '#d2b4de'];

export function RegionalSummary() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}