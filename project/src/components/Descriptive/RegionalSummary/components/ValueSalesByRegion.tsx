import React from 'react';
import { Treemap, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'AREA VI', 'Value Sales': 69190, 'Value Sales Share': 22.86, 'YoY Value Sales Growth': -9.29 },
  { name: 'AREA I', 'Value Sales': 40175, 'Value Sales Share': 13.28, 'YoY Value Sales Growth': 8.89 },
  { name: 'AREA VII', 'Value Sales': 28579, 'Value Sales Share': 9.44, 'YoY Value Sales Growth': -14.32 },
  { name: 'AREA IV', 'Value Sales': 25381, 'Value Sales Share': 8.39, 'YoY Value Sales Growth': -13.67 },
  { name: 'AREA II', 'Value Sales': 63462, 'Value Sales Share': 20.97, 'YoY Value Sales Growth': -8.87 },
  { name: 'AREA V', 'Value Sales': 35286, 'Value Sales Share': 11.66, 'YoY Value Sales Growth': -10.25 },
  { name: 'AREA IV+V', 'Value Sales': 24726, 'Value Sales Share': 8.17, 'YoY Value Sales Growth': -7.92 },
  { name: 'AREA III', 'Value Sales': 15831, 'Value Sales Share': 5.23, 'YoY Value Sales Growth': -3.68 },
];

// Pastel color combination (as per your request)
const pastelColors = [
  '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#D9BAFF', '#FFBAF0', '#FFC3A0'
];

export function ValueSalesByRegion() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <Treemap
        data={data}
        dataKey="Value Sales"
        aspectRatio={4 / 3}
        stroke="#fff"
        fill="#8884d8"
        content={<CustomizedContent colors={pastelColors} />}
      >
        <Tooltip content={<CustomTooltip />} />
      </Treemap>
    </ResponsiveContainer>
  );
}

const CustomizedContent = ({ root, depth, x, y, width, height, index, colors }) => {
  const fillColor = colors[index % colors.length];

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: fillColor,
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        fill="#000" // Black text for visibility
        fontSize={14}
        fontWeight="bold"
      >
        {root.name} {/* Only display the area name */}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
        <p>{`Name: ${data.name}`}</p>
        <p>{`Value Sales: R$${data['Value Sales']}K`}</p>
        <p>{`Value Sales Share: ${data['Value Sales Share']}%`}</p>
        <p>{`YoY Value Sales Growth: ${data['YoY Value Sales Growth']}%`}</p>
      </div>
    );
  }
  return null;
};



// import { Treemap, Tooltip, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'AREA VI', value: 69190, share: 22.86, growth: -9.29 },
//   { name: 'AREA I', value: 40175, share: 13.28, growth: 8.89 },
//   { name: 'AREA VII', value: 28579, share: 9.44, growth: -14.32 },
//   { name: 'AREA IV', value: 25381, share: 8.39, growth: -13.67 },
//   { name: 'AREA II', value: 63462, share: 20.97, growth: -8.87 },
//   { name: 'AREA V', value: 35286, share: 11.66, growth: -10.25 },
//   { name: 'AREA IV+V', value: 24726, share: 8.17, growth: -7.92 },
//   { name: 'AREA III', value: 15831, share: 5.23, growth: -3.68 },
// ];

// export function ValueSalesByRegion() {
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <Treemap
//         data={data}
//         dataKey="value"
//         aspectRatio={4 / 3}
//         stroke="#fff"
//         fill="#8884d8"
//       >
//         <Tooltip formatter={(value) => `R$${value}K`} />
//       </Treemap>
//     </ResponsiveContainer>
//   );
// }


