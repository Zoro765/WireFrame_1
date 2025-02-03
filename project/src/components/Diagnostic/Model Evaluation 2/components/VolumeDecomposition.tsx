
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export interface VolumeDecompositionData {
  month: string;
  holidaysAndEvents: number;
  priceCompetitorEffect: number;
  priceCrossChannelEffect: number;
  pricePortfolioCanibalization: number;
  base: number;
  priceOwnImpact: number;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function getVolumeDecompositionData() {
  return [
  { month: 'Jan', holidaysAndEvents: 500000, priceCompetitorEffect: 300000, priceCrossChannelEffect: 200000, pricePortfolioCanibalization: 400000, base: 20000000, priceOwnImpact: 600000 },
  { month: 'Feb', holidaysAndEvents: 500000, priceCompetitorEffect: 300000, priceCrossChannelEffect: 200000, pricePortfolioCanibalization: 400000, base: 21000000, priceOwnImpact: 600000 },
  { month: 'Mar', holidaysAndEvents: 500000, priceCompetitorEffect: 300000, priceCrossChannelEffect: 200000, pricePortfolioCanibalization: 400000, base: 20000000, priceOwnImpact: 600000 },
  { month: 'Apr', holidaysAndEvents: 500000, priceCompetitorEffect: 300000, priceCrossChannelEffect: 200000, pricePortfolioCanibalization: 400000, base: 18000000, priceOwnImpact: 600000 },
  { month: 'May', holidaysAndEvents: 500000, priceCompetitorEffect: 300000, priceCrossChannelEffect: 200000, pricePortfolioCanibalization: 400000, base: 17000000, priceOwnImpact: 600000 },
  { month: 'Jun', holidaysAndEvents: 500000, priceCompetitorEffect: 300000, priceCrossChannelEffect: 200000, pricePortfolioCanibalization: 400000, base: 16000000, priceOwnImpact: 600000 },
  { month: 'Jul', holidaysAndEvents: 500000, priceCompetitorEffect: 300000, priceCrossChannelEffect: 200000, pricePortfolioCanibalization: 400000, base: 15500000, priceOwnImpact: 600000 },
  { month: 'Aug', holidaysAndEvents: 500000, priceCompetitorEffect: 300000, priceCrossChannelEffect: 200000, pricePortfolioCanibalization: 400000, base: 15500000, priceOwnImpact: 600000 },
  { month: 'Sep', holidaysAndEvents: 500000, priceCompetitorEffect: 300000, priceCrossChannelEffect: 200000, pricePortfolioCanibalization: 400000, base: 17000000, priceOwnImpact: 600000 },
  { month: 'Oct', holidaysAndEvents: 500000, priceCompetitorEffect: 300000, priceCrossChannelEffect: 200000, pricePortfolioCanibalization: 400000, base: 18500000, priceOwnImpact: 600000 },
  { month: 'Nov', holidaysAndEvents: 500000, priceCompetitorEffect: 300000, priceCrossChannelEffect: 200000, pricePortfolioCanibalization: 400000, base: 19500000, priceOwnImpact: 600000 },
  { month: 'Dec', holidaysAndEvents: 500000, priceCompetitorEffect: 300000, priceCrossChannelEffect: 200000, pricePortfolioCanibalization: 400000, base: 20000000, priceOwnImpact: 600000 },
  ];
}

const VolumeDecompositionChart = () => {
  const data = getVolumeDecompositionData();

  return (
    <div className="bg-white p-4 rounded shadow-sm mt-6">
      <h2 className="text-base font-semibold mb-4 text-gray-900">Volume Decomposition</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickFormatter={(value) => `${(value / 1000000).toFixed(2)}M`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
              }}
              formatter={(value: any) => value.toLocaleString()}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="rect"
              wrapperStyle={{
                paddingBottom: '20px',
              }}
            />
            <Bar 
              dataKey="holidaysAndEvents" 
              name="Holidays & Events" 
              stackId="a" 
              fill="#7c3aed"
            />
            <Bar 
              dataKey="priceCompetitorEffect" 
              name="Price - Competitor Effect" 
              stackId="a" 
              fill="#22c55e"
            />
            <Bar 
              dataKey="priceCrossChannelEffect" 
              name="Price - Cross Channel Effect" 
              stackId="a" 
              fill="#eab308"
            />
            <Bar 
              dataKey="pricePortfolioCanibalization" 
              name="Price - Portfolio Canibalization" 
              stackId="a" 
              fill="#ef4444"
            />
            <Bar 
              dataKey="base" 
              name="BASE" 
              stackId="a" 
              fill="#3b82f6"
            />
            <Bar 
              dataKey="priceOwnImpact" 
              name="Price - Own Impact" 
              stackId="a" 
              fill="#14b8a6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VolumeDecompositionChart;