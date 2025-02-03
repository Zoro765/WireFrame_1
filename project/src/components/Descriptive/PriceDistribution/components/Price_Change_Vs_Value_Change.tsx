import React from 'react';
import Plot from 'react-plotly.js';

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

export function Price_Change_Vs_Value_Change() {
  const plotData = data.map((item, index) => ({
    x: [item.valueChange],
    y: [item.priceChange],
    mode: 'markers',
    marker: {
      size: item.size / 10, // Adjust size scaling as needed
      color: colors[index % colors.length],
      opacity: 0.9,
      line: {
        color: 'white',
        width: 2
      }
    },
    name: item.name,
    text: item.name,
    hoverinfo: 'text+x+y'
  }));

  return (
    <Plot
      data={plotData}
      layout={{
        title: 'Price Change vs Value Change',
        xaxis: {
          title: '% Change in Value Sales',
          tickformat: ',.0%'
        },
        yaxis: {
          title: 'Change in Price Per Unit',
          tickformat: ',.0%'
        },
        hovermode: 'closest',
        showlegend: false,
        width: 800,
        height: 410,
        margin: { l: 60, r: 20, b: 60, t: 40 }
      }}
    />
  );
}