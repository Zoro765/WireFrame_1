import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';

interface SalesChangeData {
  name: string;
  valueChange: number;
  priceChange: number;
  size: number; // Represents bubble size (e.g., sales volume, market share)
}

const data: SalesChangeData[] = [
  { name: "FRUCTUS", valueChange: 5000, priceChange: 50, size: 400 },
  { name: "QUALIMAX", valueChange: 2500, priceChange: 0, size: 300 },
  { name: "MAJA", valueChange: 1000, priceChange: -50, size: 200 },
  { name: "FRESH", valueChange: 3000, priceChange: 20, size: 350 },
  { name: "CLIGHT", valueChange: 4000, priceChange: 30, size: 450 }
];

// Dark Pastel Purple Shades
const colors = ['#6A0DAD', '#7D3C98', '#8E44AD', '#A569BD', '#76448A'];

// Custom Bubble Component
const CustomBubble = (props: any) => {
  const { cx, cy, size, fill, name } = props;
  return (
    <g>
      {/* Outer Shadow for Depth */}
      <circle cx={cx} cy={cy} r={size * 0.06} fill="rgba(0, 0, 0, 0.2)" />

      {/* Main Bubble */}
      <circle cx={cx} cy={cy} r={size * 0.06} fill={fill} opacity={0.9} stroke="white" strokeWidth={2} />

      {/* Label Below Bubble */}
      <text x={cx} y={cy + size * 0.07} textAnchor="middle" dy=".3em" fill="black" fontSize="12" fontWeight="bold">
        {name}
      </text>
    </g>
  );
};

export function Price_Change_Vs_Value_Change() {
  return (
    <ResponsiveContainer width="100%" height={410}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          type="number" 
          dataKey="valueChange" 
          name="Value Sales Change"
          label={{ value: "% Change in Value Sales", position: "bottom", dy: -10 }}
        />
      <YAxis 
  type="number" 
  dataKey="priceChange" 
  name="Price Change"
  label={{ 
    value: "Change in Price Per Unit", 
    angle: -90, 
    position: "left", 
    dx: -5,  // Increase to move left further
    dy: -60   // Adjust to move higher
  }}
/>
        <ZAxis 
          type="number" 
          dataKey="size" 
          name="Bubble Size" 
          range={[100, 400]} 
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter 
          name="Products" 
          data={data} 
          shape={(props) => {
            const index = data.findIndex((d) => d.name === props.name);
            return <CustomBubble {...props} fill={colors[index % colors.length]} />;
          }}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
