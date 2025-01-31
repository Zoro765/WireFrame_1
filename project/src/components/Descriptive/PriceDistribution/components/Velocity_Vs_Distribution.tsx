import React from 'react';
import { ScatterChart, Scatter, Tooltip, CartesianGrid, XAxis, YAxis, ResponsiveContainer, ZAxis } from 'recharts';

interface VelocityData {
  name: string;
  velocity: number;
  distribution: number;
  size: number;
}

const data: VelocityData[] = [
  { name: "CLIGHT", velocity: 40, distribution: 58, size: 1000 },
  { name: "FRESH", velocity: 60, distribution: 40, size: 800 },
  { name: "FRISCO", velocity: 180, distribution: 25, size: 600 },
  { name: "TANG", velocity: 200, distribution: 55, size: 1200 },
  { name: "QUALIMAX", velocity: 20, distribution: 20, size: 400 },
  { name: "FRUCTUS", velocity: 40, distribution: 15, size: 300 },
  { name: "MID", velocity: 120, distribution: 22, size: 500 },
  { name: "OUTRA MARCA", velocity: 160, distribution: 12, size: 400 }
];

// Dark Pastel Purple Shades
const colors = ['#6A0DAD', '#7D3C98', '#8E44AD', '#A569BD', '#76448A', '#5B2C6F', '#4A235A', '#613659'];

interface BubbleProps {
  cx: number;
  cy: number;
  size: number;
  fill: string;
  name: string;
}

// Custom Bubble Component
const CustomBubble: React.FC<BubbleProps> = ({ cx, cy, size, fill, name }) => {
  return (
    <g>
      {/* Outer Shadow for Depth */}
      <circle cx={cx} cy={cy} r={size * 0.05} fill="rgba(0, 0, 0, 0.2)" />

      {/* Main Bubble with Dark Pastel Purple */}
      <circle cx={cx} cy={cy} r={size * 0.05} fill={fill} opacity={0.9} stroke="white" strokeWidth={2} />

      {/* Label Below the Bubble */}
      <text x={cx} y={cy + size * 0.07} textAnchor="middle" dy=".3em" fill="black" fontSize="12" fontWeight="bold">
        {name}
      </text>
    </g>
  );
};

export function Velocity_Vs_Distribution() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          type="number" 
          dataKey="velocity" 
          name="Velocity"
          domain={[0, 220]}
          label={{ value: "Velocity", position: "bottom", dy: 10 }}
        />
        <YAxis 
          type="number" 
          dataKey="distribution" 
          name="Distribution"
          domain={[0, 60]}
          label={{ value: "Distribution %", angle: -90, position: "left", dx: 10,dy: -45 }}
        />
        <ZAxis 
          type="number" 
          dataKey="size" 
          name="Bubble Size" 
          range={[50, 400]} 
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
