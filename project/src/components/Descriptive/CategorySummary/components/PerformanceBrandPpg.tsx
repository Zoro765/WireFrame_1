import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const brandData = [
    { month: 'Jan', tang: 11000000, frisco: 3000000, fresh: 2000000, clight: 1500000, vilma: 1200000, marata: 1000000 },
    { month: 'Feb', tang: 10500000, frisco: 2900000, fresh: 1900000, clight: 1400000, vilma: 1100000, marata: 900000 },
    { month: 'Mar', tang: 10000000, frisco: 2800000, fresh: 1800000, clight: 1300000, vilma: 1000000, marata: 800000 },
    { month: 'Apr', tang: 9500000, frisco: 2700000, fresh: 1700000, clight: 1200000, vilma: 900000, marata: 700000 },
    { month: 'May', tang: 9000000, frisco: 2600000, fresh: 1600000, clight: 1100000, vilma: 800000, marata: 600000 },
    { month: 'Jun', tang: 8500000, frisco: 2500000, fresh: 1500000, clight: 1000000, vilma: 700000, marata: 500000 },
    { month: 'Jul', tang: 8000000, frisco: 2400000, fresh: 1400000, clight: 900000, vilma: 600000, marata: 400000 },
    { month: 'Aug', tang: 8500000, frisco: 2500000, fresh: 1500000, clight: 1000000, vilma: 700000, marata: 500000 },
    { month: 'Sep', tang: 9000000, frisco: 2600000, fresh: 1600000, clight: 1100000, vilma: 800000, marata: 600000 },
    { month: 'Oct', tang: 9500000, frisco: 2700000, fresh: 1700000, clight: 1200000, vilma: 900000, marata: 700000 },
    { month: 'Nov', tang: 10000000, frisco: 2800000, fresh: 1800000, clight: 1300000, vilma: 1000000, marata: 800000 },
    { month: 'Dec', tang: 10500000, frisco: 2900000, fresh: 1900000, clight: 1400000, vilma: 1100000, marata: 900000 }
  ];

  export function PerformanceBrandPpg() {
  return (
    <ResponsiveContainer width="100%" height="100%">
              <LineChart data={brandData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}/>
                <YAxis 
                tick={{ fontSize: 12 }}
                domain={[0, 12000000]} // Set Y-axis range up to 1,500,000,000
                tickCount={12} // Number of evenly spaced ticks
                tickFormatter={(value) => `${value / 1000000}M`} // Format ticks as "M" (millions)
                label={{
                    value: "KPI (Millions)",
                    angle: -90,
                    position: "outsideLeft", // Keeps the label outside the axis ticks
                    dx: -30, // Move label further to the left
                    dy: 1,   // Adjust vertical alignment if needed
                  }}
                />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="tang" name="TANG" stroke="#6B46C1" strokeWidth={2} />
                <Line type="monotone" dataKey="frisco" name="FRISCO" stroke="#9F7AEA" />
                <Line type="monotone" dataKey="fresh" name="FRESH" stroke="#B794F4" />
                <Line type="monotone" dataKey="clight" name="CLIGHT" stroke="#D6BCFA" />
                <Line type="monotone" dataKey="vilma" name="VILMA" stroke="#E9D8FD" />
                <Line type="monotone" dataKey="marata" name="MARATA" stroke="#FAF5FF" />
              </LineChart>
            </ResponsiveContainer>
  );
}
