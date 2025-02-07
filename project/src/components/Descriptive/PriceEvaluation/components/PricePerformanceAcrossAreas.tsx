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
    hero: 'Hero',
    'AREA I': 35,
    'AREA II': 32,
    'AREA III': 37,
    'AREA IV': 34,
    'AREA IV+ARE': 36,
    'AREA V': 33,
    'AREA VI': 35,
    'AREA VII': 38
  },
  {
    name: 'FRESH151NAO PRO',
    hero: 'Hero',
    'AREA I': 36,
    'AREA II': 33,
    'AREA III': 38,
    'AREA IV': 35,
    'AREA IV+ARE': 37,
    'AREA V': 34,
    'AREA VI': 36,
    'AREA VII': 39
  }
];

const areas = [
  'AREA I',
  'AREA II',
  'AREA III',
  'AREA IV',
  'AREA IV+ARE',
  'AREA V',
  'AREA VI',
  'AREA VII'
];


const colors = [
  '#E6B8DE', // Soft Pink
  '#B8D8EB', // Pastel Blue
  '#D8E6B8', // Pastel Lime
  '#EBB8D8', // Light Lavender
  '#B8EBE6', // Mint
  '#E6D8B8', // Cream
  '#D8B8EB', // Soft Purple
  '#87CEEB', // Sky Blue
];

// const colors = [
//   '#FFB6C1', // Light Pink
//   '#87CEEB', // Sky Blue
//   '#98FB98', // Pale Green
//   '#FFD700', // Light Gold
//   '#DDA0DD', // Plum
//   '#FFA07A', // Light Salmon
//   '#ADD8E6', // Light Blue
//   '#F0E68C'  // Khaki
// ];

export function PricePerformanceAcrossAreas() {
  return (
    <div className="w-full h-[300px] bg-white p-4">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{
            top: 5, // Increased top margin to accommodate the legend
            right: 5,
            left: 20, // Adjusted to accommodate y-axis label
            bottom: 18, // Adjusted to accommodate x-axis label
          }}
        >
          <CartesianGrid strokeDasharray="10 10" vertical />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fontWeight: 'bold' }}
            height={60}
            interval={0}
          >
          </XAxis>
          <YAxis
            ticks={[0, 50, 100, 150, 200]}
            domain={[0, 200]}
            tickFormatter={(value) => `R$${value}`} 
          >
            <Label
              value="Avg Price per Unit ($)"
              angle={-90}
              position="insideLeft"
              offset={-8} // Adjust offset to position the label
              style={{ fontWeight: 'medium', fontSize: 14, textAnchor: 'middle' }}
            />
          </YAxis>
          <Tooltip 
            formatter={(value) => [`R$${value}`, 'Price']}
          />
          <Legend 
            wrapperStyle={{
              top: 10, // Position the legend at the top
              left: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          />
          {areas.map((area, index) => (
            <Bar
              key={area}
              dataKey={area}
              fill={colors[index]}
              name={area}
              barSize={20}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}





// import React from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from 'recharts';

// const data = [
//   {
//     name: 'CLIGHT81NAO PROMOCAO',
//     hero: 'Hero',
//     'AREA I': 35,
//     'AREA II': 32,
//     'AREA III': 37,
//     'AREA IV': 34,
//     'AREA IV+ARE': 36,
//     'AREA V': 33,
//     'AREA VI': 35,
//     'AREA VII': 38
//   },
//   {
//     name: 'FRESH151NAO PRO',
//     hero: 'Hero',
//     'AREA I': 36,
//     'AREA II': 33,
//     'AREA III': 38,
//     'AREA IV': 35,
//     'AREA IV+ARE': 37,
//     'AREA V': 34,
//     'AREA VI': 36,
//     'AREA VII': 39
//   }
// ];

// const areas = [
//   'AREA I',
//   'AREA II',
//   'AREA III',
//   'AREA IV',
//   'AREA IV+ARE',
//   'AREA V',
//   'AREA VI',
//   'AREA VII'
// ];

// const colors = [
//   '#8B7355',  // Brown for AREA I
//   '#20B2AA',  // Turquoise for AREA II
//   '#FF6B6B',  // Red for AREA III
//   '#FFA500',  // Orange for AREA IV
//   '#FFD700',  // Gold for AREA IV+ARE
//   '#654321',  // Dark Brown for AREA V
//   '#98FB98',  // Pale Green for AREA VI
//   '#DEB887'   // Rose for AREA VII
// ];

// export function PricePerformanceAcrossAreas() {
//   return (
//     <div className="w-full h-[400px] bg-white p-4">
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart
//           data={data}
//           margin={{
//             top: 20,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis 
//             dataKey="name" 
//             tick={{ fontSize: 12 }}
//             height={60}
//             interval={0}
//           />
//           <YAxis
//             label={{ 
//               value: 'R$', 
//               position: 'insideLeft',
//               angle: -90,
//               offset: 0
//             }}
//             ticks={[0, 50, 100, 150, 200]}
//             domain={[0, 200]}
//           />
//           <Tooltip 
//             formatter={(value) => [`R$${value}`, 'Price']}
//           />
//           <Legend />
//           {areas.map((area, index) => (
//             <Bar
//               key={area}
//               dataKey={area}
//               fill={colors[index]}
//               stackId="a"
//               name={area}
//               barSize={20}
//             />
//           ))}
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }