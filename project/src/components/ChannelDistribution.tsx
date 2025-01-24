import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Traditional', value: 17.10 },
  { name: 'C&C', value: 21.20 },
  { name: 'Hyper', value: 6.43 },
  { name: 'Super G', value: 10.69 },
  { name: 'Super P', value: 3.74 },
  { name: 'Independente', value: 40.84 },
];

const COLORS = ['#4a235a', '#6b3480', '#8e44ad', '#9b59b6', '#a569bd', '#bb8fce'];

export function ChannelDistribution() {
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