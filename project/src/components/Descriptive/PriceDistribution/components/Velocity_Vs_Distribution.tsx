import React from 'react';
import { ScatterChart,Scatter,Tooltip,CartesianGrid,XAxis,YAxis,ResponsiveContainer } from 'recharts';

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

interface VelocityData {
  name: string;
  velocity: number;
  distribution: number;
  size: number;
}

// Pastel color combination (as per your request)
const colors = [
  '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#D9BAFF', '#FFBAF0', '#FFC3A0'
];

export function Velocity_Vs_Distribution() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis 
                  type="number" 
                  dataKey="velocity" 
                  name="Velocity"
                  domain={[0, 220]}
                  label={{ value: "Velocity", position: "bottom" }}
                />
                <YAxis 
                  type="number" 
                  dataKey="distribution" 
                  name="Distribution"
                  domain={[0, 60]}
                  label={{ value: "Distribution %", angle: -90, position: "left" }}
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter 
                  name="Products" 
                  data={data}
                  fill="#663399"
                  >
                  {data.map((entry, index) => (
                    <circle
                      key={index}
                      cx={0}
                      cy={0}
                      r={Math.sqrt(entry.size) / 10}
                      fill="#663399"
                      fillOpacity={0.6}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
    </ResponsiveContainer>
  );
}
