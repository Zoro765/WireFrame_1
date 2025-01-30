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
  '#E6B8DE', // Soft Pink
  '#B8D8EB', // Pastel Blue
  '#D8E6B8', // Pastel Lime
  '#EBB8D8', // Light Lavender
  '#B8EBE6', // Mint
  '#E6D8B8', // Cream
  '#D8B8EB', // Soft Purple
];


// const COLORS = [
//   '#4a235a',
//   '#6b3480',
//   '#8e44ad',
//   '#9b59b6',
//   '#a569bd',
//   '#bb8fce',
//   '#d2b4de',
// ];

export function RegionalSummary() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="48%"
          cy="50%"
          innerRadius={65}
          outerRadius={85}
          fill="#8884d8"
          dataKey="value"
          label={({ name, value }) => `${name}: ${value}%`}
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