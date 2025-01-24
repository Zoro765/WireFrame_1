import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', MONDELEZ: 15000000, CORACOES: 5000000, MARATA: 3000000 },
  { month: 'Feb', MONDELEZ: 14500000, CORACOES: 5100000, MARATA: 3100000 },
  { month: 'Mar', MONDELEZ: 14000000, CORACOES: 5200000, MARATA: 3200000 },
  { month: 'Apr', MONDELEZ: 13500000, CORACOES: 5300000, MARATA: 3300000 },
  { month: 'May', MONDELEZ: 13000000, CORACOES: 5400000, MARATA: 3400000 },
  { month: 'Jun', MONDELEZ: 12500000, CORACOES: 5500000, MARATA: 3500000 },
  { month: 'Jul', MONDELEZ: 11000000, CORACOES: 5600000, MARATA: 3600000 },
  { month: 'Aug', MONDELEZ: 10500000, CORACOES: 5700000, MARATA: 3700000 },
  { month: 'Sep', MONDELEZ: 11000000, CORACOES: 5800000, MARATA: 3800000 },
  { month: 'Oct', MONDELEZ: 12000000, CORACOES: 5900000, MARATA: 3900000 },
  { month: 'Nov', MONDELEZ: 13000000, CORACOES: 6000000, MARATA: 4000000 },
  { month: 'Dec', MONDELEZ: 13500000, CORACOES: 6100000, MARATA: 4100000 },
];

export function PerformanceOverTime() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="MONDELEZ" stroke="#4a235a" strokeWidth={2} />
        <Line type="monotone" dataKey="CORACOES" stroke="#8884d8" />
        <Line type="monotone" dataKey="MARATA" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}