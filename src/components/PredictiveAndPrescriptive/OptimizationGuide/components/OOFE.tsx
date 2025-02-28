import React from 'react';
import Plot from 'react-plotly.js';

interface DataPoint {
  netRevenue: number;
  grossProfit: number;
  label: string;
}

const OptimizationFrontierExample: React.FC = () => {
 
  const dataPoints: DataPoint[] = [
    { netRevenue: 5000, grossProfit: 1800, label: 'Max Profit' },
    { netRevenue: 5150, grossProfit: 1750, label: 'Grow Profit' },
    { netRevenue: 5300, grossProfit: 1700, label: 'Balanced' },
    { netRevenue: 5400, grossProfit: 1600, label: 'Grow Revenue' },
    { netRevenue: 5500, grossProfit: 1500, label: 'Max Revenue' },
  ];

  const layout = {
    title: {
      x: 0.5,
      y: 0.95,
      xanchor: 'center' as const,
      yanchor: 'top' as const,
      font: {
        size: 14,
        family: 'Times New Roman',
      },
    },
    xaxis: {
      title: {
        text: 'Net Revenue',
        font: {
          size: 12,
          color: '#333',
        },
      showgrid: true,
      gridcolor: 'lightgray',
      range: [4900, 5600],
        dtick: 100,
      },
    },
    yaxis: {
        title: {
            text: 'Gross Profit',
            font: {
              size: 12,
              color: '#333'
            }
          },
      showgrid: true,
      gridcolor: 'lightgray',
      range: [1450, 1850],
      dtick: 50,
      offset: -20
    },
    plot_bgcolor: 'white',
    width: 800,
    height: 400,
    showlegend: false,
    margin: {
      l: 50,
      r: 50,
      t: 50,
      b: 80,
    },
    shapes: [{
      type: 'rect',
      xref: 'paper' as const,
      yref: 'paper' as const,
      x0: 0,
      y0: 0,
      x1: 1,
      y1: 1,
      line: {
        color: 'blue',
        width: 1,
        dash: 'dot',
      },
      fillcolor: 'rgba(0,0,0,0)',
    }],
  };

  const data = [{
    x: dataPoints.map(point => point.netRevenue),
    y: dataPoints.map(point => point.grossProfit),
    mode: 'lines+markers+text' as const,
    name: '',
    text: dataPoints.map(point => point.label),
    textposition: 'top center' as const,
    textfont: {
      family: 'Times New Roman',
      size: 12,
      color: 'purple',
    },
    line: {
      color: 'purple',
      width: 1,
      dash: 'dot',
    },
    marker: {
      color: 'purple',
      size: 10,
      symbol: 'circle',
    },
    hoverinfo: 'x+y' as const,
  }];

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Plot
        data={data}
        layout={layout}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default OptimizationFrontierExample;