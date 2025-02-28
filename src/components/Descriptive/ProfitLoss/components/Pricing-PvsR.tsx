import React, { useEffect } from 'react';

import Plotly from 'plotly.js-dist';


const PricingPvsR: React.FC<{ height: number }> = ({ height }) => {
  useEffect(() => {
    // Data
    const data = [
      {
        x: [90, 70, 85, 92, 75, 80, 65, 60], // Revenue
        y: [85, 75, 80, 60, 70, 55, 45, 80], // Profitability
        text: [
          'UN-BIS FAMILY',
          'UN-BIS REGULAR',
          'DP-TABUAS INTENSE',
          'DP-TABULEIRO MULTI PACK',
          'UN-BRAND MIX',
          'DP-BIS XTRA',
          'ADULTO 15',
          'INFANTE 20',
        ],
        mode: 'markers',
        marker: {
          size: [1365, 144848, 12204, 148000, 13645, 143623, 1300, 14200], // Sell In Volume
          sizemode: 'area',
          sizeref: (2.0 * Math.max(...[1365, 144848, 12204, 148000, 13645, 143623, 1300, 14200])) / (40 ** 2), // Adjust bubble sizes
          color: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#6B7280', '#9333EA', '#38A169', '#3B82F6'], // Custom colors
        },
        hovertemplate:
          '<b>%{text}</b><br>Revenue: %{x}<br>Profitability: %{y}<br>Sell In Volume: %{marker.size:,}<extra></extra>',
      },
    ];

    // Layout
    const layout = {
      title: 'Bubble Chart: Revenue vs Profitability',
      xaxis: { title: 'Revenue' },
      yaxis: { title: 'Profitability' },
      autosize: true, // Make the chart responsive
      margin: { l: 50, r: 50, b: 50, t: 50, pad: 4 },
      template: 'plotly_white', // Use a clean theme
      showlegend: false, // Hide legend
    };

    // Render the chart
    Plotly.newPlot('bubble-chart', data, layout, { responsive: true });
  }, []);

  return (
    <div
      className="bg-white rounded-sm flex-grow px-0 py-2 relative"
      style={{ height: `${height}px` }}
    >
      <div id="bubble-chart" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export {PricingPvsR};