import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', MONDELEZ: 40, CORACOES: 12, MARATA: 8, OUTROS: 40 },
  { month: 'Feb', MONDELEZ: 40, CORACOES: 12, MARATA: 8, OUTROS: 40 },
  { month: 'Mar', MONDELEZ: 41, CORACOES: 13, MARATA: 8, OUTROS: 38 },
  { month: 'Apr', MONDELEZ: 41, CORACOES: 13, MARATA: 8, OUTROS: 38 },
  { month: 'May', MONDELEZ: 42, CORACOES: 14, MARATA: 8, OUTROS: 36 },
  { month: 'Jun', MONDELEZ: 41, CORACOES: 13, MARATA: 8, OUTROS: 38 },
  { month: 'Jul', MONDELEZ: 41, CORACOES: 13, MARATA: 8, OUTROS: 38 },
  { month: 'Aug', MONDELEZ: 40, CORACOES: 12, MARATA: 8, OUTROS: 40 },
  { month: 'Sep', MONDELEZ: 40, CORACOES: 12, MARATA: 8, OUTROS: 40 },
  { month: 'Oct', MONDELEZ: 41, CORACOES: 12, MARATA: 8, OUTROS: 39 },
  { month: 'Nov', MONDELEZ: 41, CORACOES: 12, MARATA: 8, OUTROS: 39 },
  { month: 'Dec', MONDELEZ: 41, CORACOES: 12, MARATA: 8, OUTROS: 39 },
];

export function VolumeMarketShare() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis
          domain={[0, 50]}
          tickFormatter={(value) => `${value}%`}
          label={{
            value: "Market Share (%)",
            angle: -90,
            position: "outsideLeft", // Keeps the label outside the axis ticks
            dx: -30, // Move label further to the left
            dy: 5,   // Adjust vertical alignment if needed
          }}
        />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="MONDELEZ" stroke="#4a235a" strokeWidth={2} />
        <Line type="monotone" dataKey="CORACOES" stroke="#8884d8" />
        <Line type="monotone" dataKey="MARATA" stroke="#82ca9d" />
        <Line type="monotone" dataKey="OUTROS" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
}