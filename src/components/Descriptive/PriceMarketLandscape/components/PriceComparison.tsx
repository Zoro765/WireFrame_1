
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface PriceComparisonProps {
  height: number;
}

// Comparison chart data
const comparisonData = [
  { range: 'R$0-R$1', pyValue: 25.22, cyValue: 50.03 },
  { range: 'R$1-R$2', pyValue: 36.65, cyValue: 37.82 },
  { range: 'R$2-R$3', pyValue: 13.48, cyValue: 42.55 },
  { range: 'R$3-R$4', pyValue: 19.62, cyValue: 51.28 }
];

export function ComparisonTable({height}:PriceComparisonProps) {
  return (
    <div className="bg-white rounded-sm flex-grow">
      <div className="p-4" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="110%">
        <BarChart
          data={comparisonData}
          layout="vertical"
          margin={{ top: 0, right: 20, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="range" />
          <Tooltip />
          <Legend />
          <Bar dataKey="pyValue" name="PY Value Sales %" stackId="a" fill="#8884d8" />
          <Bar dataKey="cyValue" name="CY Value Sales %" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
   </div>
  );
}
