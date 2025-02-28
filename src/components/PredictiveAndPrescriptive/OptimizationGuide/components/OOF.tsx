import React from 'react';
import Plot from 'react-plotly.js';

interface DataPoint {
  netRevenue: number;
  grossProfit: number;
  label: string;
}

const OptimizationFrontier: React.FC = () => {
  const dataPoints: DataPoint[] = [
    { netRevenue: 177000, grossProfit: 7000, label: 'Max Profit' },
    { netRevenue: 178000, grossProfit: 6900, label: 'Grow Profit' },
    { netRevenue: 180000, grossProfit: 6800, label: 'Balanced' },
    { netRevenue: 181500, grossProfit: 6700, label: 'Grow Revenue' },
    { netRevenue: 182500, grossProfit: 6600, label: 'Max Revenue' }
  ];

  const layout = {
    title: {
      x: 0.02,
      y: 0.95,
      xanchor: 'left' as const,
      yanchor: 'top' as const,
      font: {
        size: 14,
        color: '#333',
        family: 'Arial'
      }
    },
    xaxis: {
      title: {
        text: 'Net Revenue',
        font: {
          size: 12,
          color: '#333'
        }
      },
      tickformat: 'k',
      ticktext: ['177.0K', '177.5K', '178.0K', '178.5K', '179.0K', '179.5K', 
                 '180.0K', '180.5K', '181.0K', '181.5K', '182.0K', '182.5K'],
      tickvals: [177000, 177500, 178000, 178500, 179000, 179500, 
                180000, 180500, 181000, 181500, 182000, 182500],
      showgrid: true,
      gridcolor: '#E5E5E5',
      zeroline: false
    },
    yaxis: {
      title: {
        text: 'Gross Profit',
        font: {
          size: 12,
          color: '#333'
        }
      },
      tickformat: 'k',
      ticktext: ['6600K', '6700K', '6800K', '6900K', '7000K'],
      tickvals: [6600, 6700, 6800, 6900, 7000],
      showgrid: true,
      gridcolor: '#E5E5E5',
      zeroline: false
    },
    plot_bgcolor: 'white',
    width: 950,
    height: 400,
    showlegend: false,
    margin: {
      l: 60,
      r: 30,
      t: 40,
      b: 60
    }
  };

  const data = [{
    x: dataPoints.map(point => point.netRevenue),
    y: dataPoints.map(point => point.grossProfit),
    mode: 'markers+text' as const,
    name: '',
    text: dataPoints.map(point => point.label),
    textposition: 'top center' as const,
    textfont: {
      family: 'Arial',
      size: 12,
      color: '#663399'
    },
    line: {
      color: '#663399',
      width: 1,
      dash: 'dot'
    },
    marker: {
      color: '#663399',
      size: 8,
      symbol: 'circle'
    },
    hoverinfo: 'none' as const
  }];

  return (
    <div className="w-full h-full">
      <Plot
        data={data}
        layout={layout}
        config={{
          displayModeBar: false,
          responsive: true
        }}
      />
    </div>
  );
};

export default OptimizationFrontier;