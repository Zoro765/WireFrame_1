import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const timeSeries = [
  { month: 'Jan', powderedBeverages: 30000000, independente: 12000000, superG: 5000000, superP: 3000000, hyper: 4000000, cc: 6000000 },
  { month: 'Feb', powderedBeverages: 28000000, independente: 11500000, superG: 4800000, superP: 2900000, hyper: 3800000, cc: 5000000 },
  { month: 'Mar', powderedBeverages: 27000000, independente: 11000000, superG: 4600000, superP: 2800000, hyper: 3600000, cc: 5000000 },
  { month: 'Apr', powderedBeverages: 25000000, independente: 10000000, superG: 4200000, superP: 2500000, hyper: 3200000, cc: 5100000 },
  { month: 'May', powderedBeverages: 23000000, independente: 9500000, superG: 4000000, superP: 2300000, hyper: 3000000, cc: 4200000 },
  { month: 'Jun', powderedBeverages: 22000000, independente: 9000000, superG: 3800000, superP: 2200000, hyper: 2800000, cc: 4200000 },
  { month: 'Jul', powderedBeverages: 21000000, independente: 8500000, superG: 3600000, superP: 2100000, hyper: 2600000, cc: 4200000 },
  { month: 'Aug', powderedBeverages: 22000000, independente: 9000000, superG: 3800000, superP: 2200000, hyper: 2800000, cc: 4200000 },
  { month: 'Sep', powderedBeverages: 23000000, independente: 9500000, superG: 4000000, superP: 2300000, hyper: 3000000, cc: 4200000 },
  { month: 'Oct', powderedBeverages: 24000000, independente: 10000000, superG: 4200000, superP: 2400000, hyper: 3200000, cc: 4200000 },
  { month: 'Nov', powderedBeverages: 25000000, independente: 10500000, superG: 4400000, superP: 2500000, hyper: 3400000, cc: 4200000 },
  { month: 'Dec', powderedBeverages: 26000000, independente: 11000000, superG: 4600000, superP: 2600000, hyper: 3600000, cc: 4200000 }
];

export function ChannelAnalysis() {
  return (
    <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeries} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}/>
                <YAxis 
                domain={[0, 32000000]} // Set Y-axis range up to 1,500,000,000
                tickCount={12} // Number of evenly spaced ticks
                tickFormatter={(value) => `${value / 1000000}M`} // Format ticks as "M" (millions)
                tick={{ fontSize: 12 }}
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
                <Line type="monotone" dataKey="powderedBeverages" name="POWDERED BEVERAGES" stroke="#6B46C1" strokeWidth={2} />
                <Line type="monotone" dataKey="independente" name="Independente" stroke="#9F7AEA" />
                <Line type="monotone" dataKey="superG" name="Super G" stroke="#B794F4" />
                <Line type="monotone" dataKey="superP" name="Super P" stroke="#D6BCFA" />
                <Line type="monotone" dataKey="hyper" name="Hyper" stroke="#E9D8FD" />
                <Line type="monotone" dataKey="cc" name="C&C" stroke="#FAF5FF" />
              </LineChart>
            </ResponsiveContainer>
  );
}