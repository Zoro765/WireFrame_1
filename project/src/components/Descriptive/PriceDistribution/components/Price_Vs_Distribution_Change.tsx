import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data: TimeSeriesData[] = [
  { month: "Jan", avgPrice: 1.00, weightedDistribution: 14.5 },
  { month: "Feb", avgPrice: 0.98, weightedDistribution: 14.3 },
  { month: "Mar", avgPrice: 0.97, weightedDistribution: 14.2 },
  { month: "Apr", avgPrice: 0.96, weightedDistribution: 14.0 },
  { month: "May", avgPrice: 0.95, weightedDistribution: 14.1 },
  { month: "Jun", avgPrice: 0.96, weightedDistribution: 14.2 },
  { month: "Jul", avgPrice: 0.97, weightedDistribution: 14.3 },
  { month: "Aug", avgPrice: 0.98, weightedDistribution: 14.4 },
  { month: "Sep", avgPrice: 0.99, weightedDistribution: 14.5 },
  { month: "Oct", avgPrice: 1.00, weightedDistribution: 14.6 },
  { month: "Nov", avgPrice: 1.01, weightedDistribution: 14.7 },
  { month: "Dec", avgPrice: 1.02, weightedDistribution: 14.8 }
];

interface TimeSeriesData {
  month: string;
  avgPrice: number;
  weightedDistribution: number;
}

export function Price_Vs_Distribution_Change() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="month" 
          label={{
            value: "Month",
            position: "bottom",
            dy: 10, // Move label slightly down
            dx: 0   // Keep label centered horizontally
          }} 
        />
        <YAxis 
          yAxisId="left" 
          domain={['R$0.0', 'R$1.0']} 
          label={{
            value: "Avg Price Per Unit",
            angle: -90,
            position: "left",
            dy: -45, // Adjust to move the label higher
            dx: 8  // Adjust to move it further to the left
          }}
        />
        <YAxis 
          yAxisId="right" 
          orientation="right" 
          domain={[13, 16]} 
          label={{
            value: "Weighted Distribution",
            angle: 90, // Rotate for right-side position
            position: "right",
            dy: 20,    // Adjust to move the label slightly lower
            dx: 15     // Move label a bit more to the right
          }}
        />
        <Tooltip />
        
        {/* Move legend to the upper left corner */}
        <Legend 
          layout="vertical"
          align="left"
          verticalAlign="top"
          wrapperStyle={{
            paddingTop: '10px',
            paddingLeft: '10px'
          }}
        />
        
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="avgPrice"
          stroke="#663399"
          name="Avg Price Per Unit"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="weightedDistribution"
          stroke="#9370DB"
          name="Weighted Distribution"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
