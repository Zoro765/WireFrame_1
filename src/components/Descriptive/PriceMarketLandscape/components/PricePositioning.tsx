import { useEffect } from 'react';
import Plotly from 'plotly.js-dist';

// Sample data for Price Positioning
const positioningData = [
  { area: 'AREA I', price: 1.02, volume: 348940, sellOutValue: 3026312 },
  { area: 'AREA II', price: 0.98, volume: 67201, sellOutValue: 564108 },
  { area: 'AREA III', price: 1.17, volume: 50000, sellOutValue: 403000 },
  { area: 'AREA IV', price: 1.50, volume: 80000, sellOutValue: 70000 },
  { area: 'AREA V', price: 2.00, volume: 120000, sellOutValue: 100000 },
  { area: 'AREA VI', price: 2.30, volume: 100000, sellOutValue: 904000 },
  { area: 'AREA VII', price: 2.75, volume: 120700, sellOutValue: 400000 },
  { area: 'AREA VIII', price: 2.34, volume: 120050, sellOutValue: 506000 },
  { area: 'AREA IX', price: 1.67, volume: 120800, sellOutValue: 70000 },
  { area: 'AREA X', price: 2.00, volume: 121000, sellOutValue: 9000567 },
];

// Define an array of colors for the bubbles
const bubbleColors = [
  '#FF6B6B', // coral red
  '#4ECDC4', // turquoise
  '#45B7D1', // sky blue
  '#96CEB4', // sage green
  '#FFEEAD', // light yellow
  '#D4A5A5', // dusty rose
  '#9B59B6', // purple
  '#3498DB', // blue
  '#E67E22', // orange
  '#2ECC71', // emerald green
];

export function PricePositioning() {
  useEffect(() => {
    // Prepare data for Plotly
    const data = [
      {
        x: positioningData.map((d) => d.area), // X-axis: Area
        y: positioningData.map((d) => d.price), // Y-axis: Avg Price Per Unit
        text: positioningData.map((d) => `Volume: ${d.volume.toLocaleString()}<br>SellOutValue: ${d.sellOutValue.toLocaleString()}`), // Custom hover text
        mode: 'markers', // Show markers
        marker: {
          size: positioningData.map((d) => d.volume / 1000), // Size of the markers (scaled down for better visualization)
          sizemode: 'area', // Scale size by area
          sizeref: (2.0 * Math.max(...positioningData.map((d) => d.volume / 1000))) / (40 ** 2), // Adjust bubble sizes
          color: bubbleColors, // Assign different colors to each bubble
          opacity: 0.8, // Slightly increased opacity for better color visibility
          line: {
            color: 'white',
            width: 1
          }, // Add a white border to make bubbles more distinct
        },
        hovertemplate:
          '<b>%{x}</b><br>Avg Price: R$%{y:.2f}<br>%{text}<extra></extra>', // Custom hover template
      },
    ];

    // Layout configuration
    const layout = {
      title: 'Price Positioning by Area',
      xaxis: {
        title: 'Area',
        type: 'category', // Treat x-axis as categorical
        tickangle: 0, // Rotate labels for better readability
        tickfont: { size: 10 },
      },
      yaxis: {
        title: 'Avg Price Per Unit (R$)',
        tickfont: { size: 10 },
      },
      autosize: true, // Make the chart responsive
      margin: { l: 50, r: 50, b: 100, t: 50, pad: 4 }, // Adjust margins for rotated labels
      template: 'plotly_white', // Use a clean theme
      showlegend: false, // Hide legend
    };

    // Render the chart
    Plotly.newPlot('price-positioning-chart', data, layout, { responsive: true });
  }, []);

  return (
    <div className="bg-white rounded-sm flex-grow p-4">
      <div id="price-positioning-chart" style={{ width: '100%', height: '200px' }} />
    </div>
  );
}

export default PricePositioning;