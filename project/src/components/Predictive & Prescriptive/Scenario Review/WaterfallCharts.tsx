import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Cell
} from 'recharts';

export interface WaterfallData {
  name: string;
  value: number;
  color?: string;
}

interface WaterfallChartProps {
  data: WaterfallData[];
  title: string;
  tradeMargin: string;
  markup: string;
}

export const WaterfallChart: React.FC<WaterfallChartProps> = ({
  data,
  title,
  tradeMargin,
  markup,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="text-sm">
          <span className="mr-4">Trade Margin %: {tradeMargin}</span>
          <span>Markup %: {markup}</span>
        </div>
      </div>
      <BarChart width={500} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
        <YAxis />
        <Tooltip />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || '#8884d8'} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};
