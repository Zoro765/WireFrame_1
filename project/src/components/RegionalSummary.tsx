import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'AREA VII', value: 9.44 },
  { name: 'AREA I', value: 13.28 },
  { name: 'AREA VI', value: 22.86 },
  { name: 'AREA II', value: 20.97 },
  { name: 'AREA III', value: 8.39 },
  { name: 'AREA IV', value: 8.39 },
  { name: 'AREA V', value: 8.17 },
];

const COLORS = [
  '#4a235a',
  '#6b3480',
  '#8e44ad',
  '#9b59b6',
  '#a569bd',
  '#bb8fce',
  '#d2b4de',
];

export function RegionalSummary() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={70}
          fill="#8884d8"
          dataKey="value"
          label={({ name, value }) => `${value}%`}
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
      </PieChart>
    </ResponsiveContainer>
  );
}