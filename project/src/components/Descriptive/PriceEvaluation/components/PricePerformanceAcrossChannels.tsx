import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';

const data = [
  {
    name: 'CLIGHT81NAO PROMOCAO',
    category: 'Hero',
    'C&C': 35,
    'Hyper': 32,
    'Independente': 37,
    'Super G': 34,
    'Super P': 36,
    'Traditional': 33,
  },
  {
    name: 'FRESH151NAO PROMOCAO',
    category: 'Hero',
    'C&C': 34,
    'Hyper': 31,
    'Independente': 36,
    'Super G': 33,
    'Super P': 35,
    'Traditional': 32,
  },
  {
    name: 'TANG181NAO PROMOCAO',
    category: 'Hero',
    'C&C': 36,
    'Hyper': 33,
    'Independente': 38,
    'Super G': 35,
    'Super P': 37,
    'Traditional': 34,
  },
  {
    name: 'ADORALLE1001NAO PROMOCAO',
    category: 'Hero',
    'C&C': 33,
    'Hyper': 30,
    'Independente': 35,
    'Super G': 32,
    'Super P': 34,
    'Traditional': 31,
  },
  {
    name: 'ADORALLE1601NAO PROMOCAO',
    category: 'Hero',
    'C&C': 35,
    'Hyper': 32,
    'Independente': 37,
    'Super G': 34,
    'Super P': 36,
    'Traditional': 33,
  }
];

const channels = [
  'C&C',
  'Hyper',
  'Independente',
  'Super G',
  'Super P',
  'Traditional'
];

const colors = {
  'C&C': '#E6B8DE',
  'Hyper': '#B8D8EB',
  'Independente': '#EBB8D8',
  'Super G': '#B8EBE6',
  'Super P': '#D8B8EB',
  'Traditional': '#87CEEB',
};

export function PricePerformanceAcrossChannels() {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart
        data={data}
        barSize={50}
        margin={{ top: 20, right: 10, left: 20, bottom: 0 }} // Adjusted margin for y-axis label
      >
        <XAxis
          dataKey="name"
          tick={{ fill: '#000', fontSize: 12, fontWeight: 'medium' }}
          interval={0} // Ensure all labels are shown
          height={60} // Increase height to accommodate the label
        >
        </XAxis>
        <YAxis 
          type="number" 
          domain={[0, 200]} 
          tickFormatter={(value) => `R$${value}`} 
        >
          <Label
            value="Avg Price per Unit ($)"
            angle={-90} // Rotate the label to make it vertical
            position="insideLeft"
            offset={-8} // Adjust offset to position the label
            style={{ fontWeight: 'bold', fontSize: 14, textAnchor: 'middle' }}
          />
        </YAxis>
        <CartesianGrid strokeDasharray="10 10" vertical />
        <Tooltip />
        <Legend
          wrapperStyle={{
            top: 20,
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          payload={channels.map((channel) => ({
            value: channel,
            color: colors[channel],
          }))}
        />
        {channels.map((channel) => (
          <Bar key={channel} dataKey={channel} fill={colors[channel]} barSize={30} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}




