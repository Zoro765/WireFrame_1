import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// Market Tiers Data
const priceTiersData = [
  { range: 'R$0-R$1', value: 0.80 },
  { range: 'R$1-R$2', value: 1.17 },
  { range: 'R$2-R$3', value: 2.28 },
  { range: 'R$3-R$4', value: 3.49 },
  { range: 'R$4-R$5', value: 4.42 },
  { range: 'R$5-R$6', value: 5.57 },
  { range: '>R$6', value: 8.90 }
];

interface MarketPriceTiersProps {
  height: number;
}

export function MarketPriceTiers({ height }: MarketPriceTiersProps) {
  return (
    <div className="bg-white px-0 py-0 rounded-sm flex-grow">
      <div className="p-4" style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="120%">
          <BarChart
            layout="vertical"
            data={priceTiersData}
            margin={{ top: 2, right: 0, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="value"
              tick={{ fontSize: 10 }} />
            <YAxis
              type="category"
              dataKey="range" tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey={"value"} fill="#7600bc" barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}