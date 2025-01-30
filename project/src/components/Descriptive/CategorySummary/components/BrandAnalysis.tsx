import { Treemap, Tooltip, ResponsiveContainer } from 'recharts';

const dataofBrands = [
  {
    name: 'TANG',
    value: 126459,
    percentageShare: 41.78,
    yoyGrowth: -9.94,
    color: '#4A148C'
  },
  {
    name: 'FRISCO',
    value: 54293,
    percentageShare: 25.25,
    yoyGrowth: 8.88,
    color: '#E57373'
  },
  {
    name: 'TRINK',
    value: 27764,
    percentageShare: 9.17,
    yoyGrowth: 9.02,
    color: '#64B5F6'
  },
  {
    name: 'OUTRA MARCA',
    value: 19659,
    percentageShare: 6.49,
    yoyGrowth: -2.5,
    color: '#81C784'
  },
  {
    name: 'CLIGHT',
    value: 15230,
    percentageShare: 5.03,
    yoyGrowth: -3.1,
    color: '#FFB74D'
  },
  {
    name: 'VILMA',
    value: 14236,
    percentageShare: 4.7,
    yoyGrowth: -1.8,
    color: '#795548'
  },
  {
    name: 'MARATA',
    value: 12890,
    percentageShare: 4.26,
    yoyGrowth: -4.2,
    color: '#66BB6A'
  }
];

export function BrandAnalysis() {
  return (
    <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  width={400}
                  height={200}
                  data={dataofBrands.map((brand) => ({
                    name: brand.name,
                    size: brand.value,
                    fill: brand.color
                  }))}
                  dataKey="size"
                  stroke="#fff"
                >
                  <Tooltip content={({ payload }) => {
                    if (!payload || !payload.length) return null;
                    const { name, size } = payload[0].payload;
                    return (
                      <div className="bg-gray-900 text-white text-xs rounded-md p-2">
                        <strong>{name}</strong><br />
                        Value Sales: {size.toLocaleString()}
                      </div>
                    );
                  }} />
                </Treemap>
              </ResponsiveContainer>
  );
}