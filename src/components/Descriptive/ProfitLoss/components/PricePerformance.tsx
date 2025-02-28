import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer,CartesianGrid } from 'recharts';

// Extended sample data to match the image
export const pricePerformanceData = [
  { name: 'AFRODITL LTDA', value: 0 },
  { name: 'A ANGELONI & CIA LT', value: 0 },
  { name: 'ARMAZEM MATEUS SA', value: 0 },
  { name: 'ABCD ALIMENTOS', value: 0 },
  { name: 'ALTHOFF SUPERMERCA', value: 0 },
  { name: 'AMIGAO MANOEL SRA', value: 0 },
  { name: 'ARAUJO S/A', value: 0 },
  { name: 'ARCOM S/A', value: 0 },
  { name: 'ATACADAO S.A.', value: 0 },
  { name: 'ATLANTIC LE-PTA', value: 0 },
  { name: 'AUTO POSTO BS ITA', value: 0 },
  { name: 'AUTO SERVICO SAKAI', value: 0 },
  { name: 'CECONSUD BRASIL CO', value: 0 },
  { name: 'COMERCIAL TATENO', value: 0 },
  { name: 'COML ZAFFARI', value: 0 },
  { name: 'AUTO POSTO BS ITA', value: 0 },
  { name: 'AUTO POSTO BS ITA', value: 0 },
  { name: 'CECONSUD BRASIL CO', value: 0 },
  { name: 'AUTO POSTO BS ITA', value: 0 },
  { name: 'AUTO POSTO BS ITA', value: 0 },
  { name: 'AUTO POSTO BS ITA', value: 0 },
  { name: 'CECONSUD BRASIL CO', value: 0 },
  { name: 'AUTO POSTO BS ITA', value: 0 },
  { name: 'AUTO POSTO BS ITA', value: 0 },
  { name: 'AUTO POSTO BS ITA', value: 0 },
  { name: 'AUTO POSTO BS ITA', value: 0 }

  // Add more items to match image
];

interface PricePerformanceProps {
  height: number;
}

export function PricePerformance({ height }: PricePerformanceProps) {
  return (
    <div className="bg-white rounded-sm flex-grow flex flex-col" style={{ height: `${height}px` }}>
      <div className="flex h-full">
        {/* Y-axis label */}
        <div className="w-12 flex items-center justify-center" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>
          <span className="text-sm text-gray-600">Gross Sales per Kg</span>
        </div>

        {/* Main chart container */}
        <div className="flex-grow h-full overflow-x-auto">
          <div className="p-4 h-full" style={{ minWidth: '1500px' }}>
            <ResponsiveContainer width="100%" height="140%">
              <ScatterChart
                margin={{ top: 10, right: 40, left: 80, bottom: 30 }}
              >
                <CartesianGrid />
                <XAxis
                  dataKey="name"
                  angle={-90}
                  textAnchor="end"
                  height={60}
                  interval={0}
                  tick={{ fontSize: 15 }}
                />
                <YAxis
                  type="number"
                  domain={[0, 400000]}
                  tickFormatter={(value) => `R$${value.toLocaleString()}`}
                  tick={{ fontSize: 15 }}
                />
                <Tooltip
                  formatter={(value: number) => [`R$${value.toLocaleString()}`, 'Gross Sales per Kg']}
                />
                <Scatter
                  data={pricePerformanceData}
                  fill="#8884d8"
                  shape="circle"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricePerformance;