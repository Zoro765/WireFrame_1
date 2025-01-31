import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Traditional', value: 17.10 },
  { name: 'C&C', value: 21.20 },
  { name: 'Hyper', value: 6.43 },
  { name: 'Super G', value: 10.69 },
  { name: 'Super P', value: 3.74 },
  { name: 'Independente', value: 40.84 },
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
// ];

export function ChannelDistribution() {
  return (
    <ResponsiveContainer width="100%" height="100%">
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