// import {
//   XAxis, YAxis, Tooltip, ResponsiveContainer, Scatter, ScatterChart, CartesianGrid, ZAxis, LabelList
// } from 'recharts';

// // Sample data with specific colors
// const grossProfitGrowthData = [
//   { volumeGrowth: 20, profitGrowth: 40, name: 'DP-BIS XTRA', size: 100, color: '#10B981' },
//   { volumeGrowth: -10, profitGrowth: -15, name: 'DP-TABUAS INTENSE', size: 870, color: '#3B82F6' },
//   { volumeGrowth: 5, profitGrowth: 10, name: 'UN-GIFTING', size: 1200, color: '#F59E0B' },
//   { volumeGrowth: -40, profitGrowth: -25, name: 'MP-BOMBOM MULTIPACK', size: 190, color: '#EF4444' },
//   { volumeGrowth: 15, profitGrowth: 20, name: 'D-TABUAS LACTA', size: 1130, color: '#9333EA' },
//   { volumeGrowth: -5, profitGrowth: 5, name: 'UN-BRAND MIX', size: 1700, color: '#6B7280' },
//   { volumeGrowth: 10, profitGrowth: 15, name: 'ADULTO 15', size: 1000, color: '#38A169' },
//   { volumeGrowth: -20, profitGrowth: -40, name: 'INFANTE 20', size: 385, color: '#3B82F6' }
// ];

// interface GPGVsVGProps {
//   height: number;
// }

// export function GrossProfitGrowth({ height }: GPGVsVGProps) {
//   return (
//     <div className="bg-white rounded-sm flex-grow">
//       <div className="px-0 py-2" style={{ height: `${height}px` }}>
//         <ResponsiveContainer width="100%" height="110%">
//           <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
//             <CartesianGrid strokeDasharray="5 5" />
//             <XAxis
//               dataKey="volumeGrowth"
//               name="YoY Sell In Volume %"
//               type="number"
//               label={{ value: 'YoY Sell In Volume %', position: 'insideBottom', offset: -10 }}
//               tick={{ fontSize: 10, fontWeight: 'bold' }}
//             />
//             <YAxis
//               dataKey="profitGrowth"
//               name="YoY Gross Profit %"
//               type="number"
//               label={{ value: 'Profit %', angle: -90, position: 'insideLeft', offset: -10 }}
//               tick={{ fontSize: 10, fontWeight: 'bold' }}
//             />
//             <ZAxis dataKey="size" range={[50, 1000]} name="Size" />
//             <Tooltip
//               cursor={{ strokeDasharray: '3 3' }}
//               formatter={(_value: number, _name: string, props: any) => [
//                 `${props.payload.profitGrowth.toFixed(1)}%`,
//                 `YoY Gross Profit %`
//               ]}
//               labelFormatter={(label: number) => `YoY Sell In Volume % ${label.toFixed(1)}`}
//             />
//             <Scatter
//               name="Products"
//               data={grossProfitGrowthData}
//               fill="currentcolor" // Use the color from the data
//               shape="circle"
//             >
//               <LabelList dataKey="name" position="top" fontSize="12" />
//             </Scatter>
//           </ScatterChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

import { useEffect } from 'react';
import Plotly from 'plotly.js-dist';

// Sample data with specific colors
const grossProfitGrowthData = [
  { volumeGrowth: 20, profitGrowth: 40, name: 'DP-BIS XTRA', size: 100, color: '#10B981' },
  { volumeGrowth: -10, profitGrowth: -15, name: 'DP-TABUAS INTENSE', size: 870, color: '#3B82F6' },
  { volumeGrowth: 5, profitGrowth: 10, name: 'UN-GIFTING', size: 1200, color: '#F59E0B' },
  { volumeGrowth: -40, profitGrowth: -25, name: 'MP-BOMBOM MULTIPACK', size: 190, color: '#EF4444' },
  { volumeGrowth: 15, profitGrowth: 20, name: 'D-TABUAS LACTA', size: 1130, color: '#9333EA' },
  { volumeGrowth: -5, profitGrowth: 5, name: 'UN-BRAND MIX', size: 1700, color: '#6B7280' },
  { volumeGrowth: 10, profitGrowth: 15, name: 'ADULTO 15', size: 1000, color: '#38A169' },
  { volumeGrowth: -20, profitGrowth: -40, name: 'INFANTE 20', size: 385, color: '#3B82F6' },
];

interface GPGVsVGProps {
  height: number;
}

export function GrossProfitGrowth({ height }: GPGVsVGProps) {
  useEffect(() => {
    // Prepare data for Plotly
    const data = [
      {
        x: grossProfitGrowthData.map((d) => d.volumeGrowth),
        y: grossProfitGrowthData.map((d) => d.profitGrowth),
        text: grossProfitGrowthData.map((d) => d.name),
        mode: 'markers+text',
        marker: {
          size: grossProfitGrowthData.map((d) => d.size),
          sizemode: 'area',
          sizeref: (2.0 * Math.max(...grossProfitGrowthData.map((d) => d.size))) / (40 ** 2),
          color: grossProfitGrowthData.map((d) => d.color),
        },
        textposition: 'top center',
        hovertemplate:
          '<b>%{text}</b><br>YoY Sell In Volume %: %{x}<br>YoY Gross Profit %: %{y}<extra></extra>',
      },
    ];

    // Updated layout configuration
    const layout = {
      title: 'Gross Profit Growth vs Volume Growth',
      xaxis: {
        title: 'YoY Sell In Volume %',
        tickfont: { size: 10, weight: 'bold' },
      },
      yaxis: {
        title: 'YoY Gross Profit %',
        tickfont: { size: 10, weight: 'bold' },
      },
      autosize: true,
      margin: { l: 50, r: 50, b: 50, t: 50, pad: 4 },
      template: 'plotly_white',
      showlegend: false,
      // Add modebar configuration
      modebar: {
        orientation: 'v', // vertical orientation
        position: 'right', // position on the left
      },
    };

    // Configuration options
    const config = {
      displayModeBar: true, // Always show the modebar
      modeBarButtonsToRemove: ['toImage', 'sendDataToCloud'], // Optional: remove some buttons
      displaylogo: false, // Remove plotly logo
    };

    // Render the chart with the updated configuration
    Plotly.newPlot('scatter-chart', data, layout, config);
  }, []);

  return (
    <div className="bg-white rounded-sm flex-grow" style={{ height: `${height}px` }}>
      <div id="scatter-chart" style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default GrossProfitGrowth;