import { ComposedChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const priceIncentiveData = [
  { avgPrice: 1, kpi: 11000000 },
  { avgPrice: 2, kpi: 3000000 },
  { avgPrice: 3, kpi: 2000000 },
  { avgPrice: 5, kpi: 1500000 },
  { avgPrice: 7, kpi: 1200000 },
  { avgPrice: 10, kpi: 1000000 },
  { avgPrice: 20, kpi: 800000 },
  { avgPrice: 40, kpi: 600000 },
  { avgPrice: 60, kpi: 500000 },
  { avgPrice: 80, kpi: 400000 },
  { avgPrice: 100, kpi: 300000 },
  { avgPrice: 120, kpi: 200000 },
];

export function ValueSalesPriceIncentive() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={priceIncentiveData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="avgPrice"
          type="number"
          domain={[0, 140]}
          tickFormatter={(value) => `R$${value.toFixed(2)}`}
          tick={{ fontSize: 12 }}
        />
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

        <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
        <Legend />
        {/* Line Chart for KPI Trends */}
        <Line type="monotone" dataKey="kpi" name="KPI Trend" stroke="#6B46C1" strokeWidth={2} />
        {/* Scatter Chart for Data Points */}
        <Scatter dataKey="kpi" fill="#9F7AEA" name="KPI Data Points" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
