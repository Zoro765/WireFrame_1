import React from 'react';
import Plot from 'react-plotly.js';

// Data for all 7 channels across areas
const data = [
  {
    channel: 'C&C',
    color: '#8884d8',
    values: [
      { area: 'AREA I', avgPrice: 51, volume: 100 },
      { area: 'AREA II', avgPrice: 50, volume: 120 },
      { area: 'AREA III', avgPrice: 60, volume: 90 },
      { area: 'AREA IV', avgPrice: 55, volume: 110 },
      { area: 'AREA IV + AREA V', avgPrice: 58, volume: 95 },
      { area: 'AREA VI', avgPrice: 52, volume: 105 },
      { area: 'AREA VII', avgPrice: 54, volume: 115 },
    ],
  },
  {
    channel: 'Hyper',
    color: '#82ca9d',
    values: [
      { area: 'AREA I', avgPrice: 49, volume: 110 },
      { area: 'AREA II', avgPrice: 48, volume: 130 },
      { area: 'AREA III', avgPrice: 58, volume: 100 },
      { area: 'AREA IV', avgPrice: 53, volume: 120 },
      { area: 'AREA IV + AREA V', avgPrice: 56, volume: 105 },
      { area: 'AREA VI', avgPrice: 50, volume: 115 },
      { area: 'AREA VII', avgPrice: 52, volume: 125 },
    ],
  },
  {
    channel: 'Independente',
    color: '#ffc658',
    values: [
      { area: 'AREA I', avgPrice: 53, volume: 105 },
      { area: 'AREA II', avgPrice: 52, volume: 125 },
      { area: 'AREA III', avgPrice: 62, volume: 95 },
      { area: 'AREA IV', avgPrice: 57, volume: 115 },
      { area: 'AREA IV + AREA V', avgPrice: 60, volume: 100 },
      { area: 'AREA VI', avgPrice: 54, volume: 110 },
      { area: 'AREA VII', avgPrice: 56, volume: 120 },
    ],
  },
  {
    channel: 'Super G',
    color: '#ff6f61',
    values: [
      { area: 'AREA I', avgPrice: 55, volume: 115 },
      { area: 'AREA II', avgPrice: 54, volume: 135 },
      { area: 'AREA III', avgPrice: 64, volume: 105 },
      { area: 'AREA IV', avgPrice: 59, volume: 125 },
      { area: 'AREA IV + AREA V', avgPrice: 62, volume: 110 },
      { area: 'AREA VI', avgPrice: 56, volume: 120 },
      { area: 'AREA VII', avgPrice: 58, volume: 130 },
    ],
  },
  {
    channel: 'Super P',
    color: '#6b5b95',
    values: [
      { area: 'AREA I', avgPrice: 57, volume: 120 },
      { area: 'AREA II', avgPrice: 56, volume: 140 },
      { area: 'AREA III', avgPrice: 66, volume: 110 },
      { area: 'AREA IV', avgPrice: 61, volume: 130 },
      { area: 'AREA IV + AREA V', avgPrice: 64, volume: 115 },
      { area: 'AREA VI', avgPrice: 58, volume: 125 },
      { area: 'AREA VII', avgPrice: 60, volume: 135 },
    ],
  },
  {
    channel: 'Traditional',
    color: '#88b04b',
    values: [
      { area: 'AREA I', avgPrice: 59, volume: 125 },
      { area: 'AREA II', avgPrice: 58, volume: 145 },
      { area: 'AREA III', avgPrice: 68, volume: 115 },
      { area: 'AREA IV', avgPrice: 63, volume: 135 },
      { area: 'AREA IV + AREA V', avgPrice: 66, volume: 120 },
      { area: 'AREA VI', avgPrice: 60, volume: 130 },
      { area: 'AREA VII', avgPrice: 62, volume: 140 },
    ],
  },
  {
    channel: 'Base G',
    color: '#f7cac9',
    values: [
      { area: 'AREA I', avgPrice: 61, volume: 130 },
      { area: 'AREA II', avgPrice: 60, volume: 150 },
      { area: 'AREA III', avgPrice: 70, volume: 120 },
      { area: 'AREA IV', avgPrice: 65, volume: 140 },
      { area: 'AREA IV + AREA V', avgPrice: 68, volume: 125 },
      { area: 'AREA VI', avgPrice: 62, volume: 135 },
      { area: 'AREA VII', avgPrice: 64, volume: 145 },
    ],
  },
];

export function PriceComparisonAcrossChannelsAndArea() {
  return (
    <Plot
      data={data.map((channelData) => ({
        x: channelData.values.map((d) => d.area), // X-axis: Areas
        y: channelData.values.map((d) => d.avgPrice), // Y-axis: Avg Price per Unit
        mode: 'markers',
        marker: {
          size: channelData.values.map((d) => d.volume), // Bubble size: Volume
          sizemode: 'diameter',
          sizeref: 2, // Adjust this to control bubble size scaling
          color: channelData.color, // Unique color for each channel
        },
        type: 'scatter',
        name: channelData.channel, // Channel name for legend
      }))}
      layout={{
        title: 'Price Comparison Across Channels & Area',
        xaxis: { title: 'Areas' },
        yaxis: { 
          title: {
            text: 'Average Price per Unit ($)',
            font: { size: 12, color: '#333' },
            standoff: 40
          },
          showgrid: true,
          gridcolor: '#E1E1E1',
          zeroline: true,
          zerolinecolor: '#969696',
          zerolinewidth: 2,
          tickformat: '$.2f',
          tickmode: 'linear',
          dtick: 5
        },
        hovermode: 'closest',
        showlegend: true, // Show legend for channels
        autosize: true, // Automatically adjust size to fit container
        margin: { l: 80, r: 40, t: 10, b: 40 }, // Adjusted margins to ensure Y-axis label is visible
      }}
      style={{ width: '100%', height: '100%' }} // Fit perfectly into the container
      useResizeHandler={true} // Ensure the chart resizes with the container
      config={{ responsive: true }} // Ensure the chart is responsive
    />
  );
}



