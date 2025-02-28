import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Updated dataset with varied volumes for better bubble size differentiation
export const pricePositioningData = [
  { x: 1, y: 400000, volume: 1200, name: 'LACTA PASTILHA HALLS' },
  { x: 2, y: 380000, volume: 450, name: 'CHOCOLATE DAIRY MILK' },
  { x: 3, y: 350000, volume: 2000, name: 'BIS REGULAR' },  
  { x: 4, y: 340000, volume: 400, name: 'GOLD BISC' },
  { x: 5, y: 320000, volume: 1800, name: 'NESTLE CLASS' },  
  { x: 6, y: 310000, volume: 480, name: 'MARACCUJA FRESH' },
  { x: 7, y: 330000, volume: 1500, name: 'LACTA CLASSIC' },  
  { x: 8, y: 360000, volume: 510, name: 'DARK SUPREME' },
  { x: 9, y: 370000, volume: 1700, name: 'MILKA OREO' },  
  { x: 10, y: 345000, volume: 470, name: 'CHOCO SUPREME' },
  { x: 11, y: 355000, volume: 1300, name: 'DIAMANTE NEGRO' },  
  { x: 12, y: 325000, volume: 440, name: 'SHOTS EXTRA' },
  { x: 13, y: 335000, volume: 1600, name: 'LAKA WHITE' }, 
  { x: 14, y: 365000, volume: 520, name: 'SONHO VALSA' },
  { x: 15, y: 375000, volume: 1400, name: 'CHOKITO DARK' },  
  { x: 16, y: 315000, volume: 430, name: 'AMANDITA CLASSIC' },
  { x: 17, y: 385000, volume: 1900, name: 'OURO BRANCO' },  
  { x: 18, y: 395000, volume: 580, name: 'LACTA SUPREME' },
  { x: 19, y: 305000, volume: 410, name: 'CLASSIC DARK' },
  { x: 20, y: 345000, volume: 1100, name: 'MILKA SUPREME' },  
  { x: 21, y: 355000, volume: 490, name: 'DARK INTENSE' },
  { x: 22, y: 365000, volume: 1250, name: 'CHOCO PREMIUM' },  
  { x: 23, y: 375000, volume: 540, name: 'LACTA INTENSE' },
  { x: 24, y: 385000, volume: 560, name: 'CLASSIC PREMIUM' },
  { x: 25, y: 395000, volume: 1450, name: 'SUPREME DARK' }
];

interface PricePositioningProps {
  height: number;
}

export function PricePositioning({ height }: PricePositioningProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="font-medium text-sm">{payload[0]?.payload.name}</p>
          <p className="text-sm">Price: R${(payload[0]?.payload.y / 1000).toFixed(0)}K</p>
          <p className="text-sm">Volume: {payload[0]?.payload.volume}</p>
        </div>
      );
    }
    return null;
  };

  const renderScatterShape = (props: any) => {
    const { cx, cy, payload } = props;
    const radius = Math.sqrt(payload.volume) / 8;

    return (
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="#82ca9d"
        fillOpacity={0.7}
        stroke="#7600bc"
        strokeWidth={0}
      />
    );
  };

  return (
    <div className="bg-white rounded-sm flex-grow flex flex-col" style={{ height: `${height}px` }}>
      <div className="flex-grow flex flex-col overflow-hidden">
        <div className="h-full overflow-x-auto">
          <div style={{ minWidth: '1500px', height: '100%' }}>
            <ResponsiveContainer width="100%" height="140%">
              <ScatterChart
                margin={{ top: 60, right: 40, bottom: 80, left: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis
                  dataKey="name"
                  angle={-90}
                  textAnchor="end"
                  interval={0}
                  tick={{ fontSize: 15 }}
                  tickMargin={0}
                />
                <YAxis
                  dataKey="y"
                  tickFormatter={(value) => `R$${(value / 1000).toFixed(0)}K`}
                  domain={['auto', 'auto']}
                  tick={{ fontSize: 15 }}
                  label={{ 
                    value: 'Gross Sales Per Kg',
                    angle: -90,
                    position: 'insideLeft',
                    offset: -20,
                    style: { textAnchor: 'middle', fontSize: '15px' }
                  }}
                />
                <Tooltip content={CustomTooltip} />
                <Scatter
                  name="Products"
                  data={pricePositioningData}
                  shape={renderScatterShape}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}