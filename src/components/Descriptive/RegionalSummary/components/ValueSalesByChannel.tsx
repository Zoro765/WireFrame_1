import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Independente', value: 12000000 },
  { name: 'C&C', value: 8000000 },
  { name: 'Traditional', value: 6000000 },
  { name: 'Super G', value: 4000000 },
  { name: 'Hyper', value: 2000000 },
  { name: 'Super P', value: 1000000 },
];

// Define an array of pastel colors for each bar
const pastelColors = ['#B5D8EB', '#F7CAC9', '#C3E2C2', '#FFEEAD', '#E6B5C9', '#A2D5F2'];

export function ValueSalesByChannel() {
  return (
    <ResponsiveContainer width="100%" height={410}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 20, right: 10, left: 50, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" tickFormatter={(value) => `R$${value / 1000000}M`} />
        <YAxis type="category" dataKey="name" />
        <Tooltip formatter={(value) => `R$${value}`} />
        <Legend />
        <Bar dataKey="value" name="KPI">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={pastelColors[index % pastelColors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}



// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'Independente', value: 120000000 },
//   { name: 'C&C', value: 80000000 },
//   { name: 'Traditional', value: 60000000 },
//   { name: 'Super G', value: 40000000 },
//   { name: 'Hyper', value: 20000000 },
//   { name: 'Super P', value: 10000000 },
// ];

// // Define an array of pastel colors
// const pastelColors = ['#A2D5F2', '#F2A2A2', '#A2F2A2', '#F2E6A2', '#D5A2F2', '#A2F2E6'];

// export function ValueSalesByChannel() {
//   return (
//     <ResponsiveContainer width="100%" height={410}>
//       <BarChart
//         layout="vertical"
//         data={data}
//         margin={{ top: 20, right: 10, left: 50, bottom: 5 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis type="number" tickFormatter={(value) => `R$${value / 1000000}M`} />
//         <YAxis type="category" dataKey="name" />
//         <Tooltip formatter={(value) => `R$${value}`} />
//         <Legend />
//         <Bar dataKey="value" fill="#8884d8" name="KPI">
//           {data.map((entry, index) => (
//             <rect
//               key={`bar-${entry.name}`}
//               x={0} // X position (starting point of the bar)
//               y={index * 20} // Y position (spacing for each bar)
//               width={entry.value} // Width of the bar (based on value)
//               height={15} // Height of the bar
//               fill={pastelColors[index % pastelColors.length]} // Apply pastel color
//             />
//           ))}
//         </Bar>
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }



// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'Independente', value: 120000000 },
//   { name: 'C&C', value: 80000000 },
//   { name: 'Traditional', value: 60000000 },
//   { name: 'Super G', value: 40000000 },
//   { name: 'Hyper', value: 20000000 },
//   { name: 'Super P', value: 10000000 },
// ];

// // Define an array of pastel colors
// const pastelColors = ['#A2D5F2', '#F2A2A2', '#A2F2A2', '#F2E6A2', '#D5A2F2', '#A2F2E6'];

// export function ValueSalesByChannel() {
//   return (
//     <ResponsiveContainer width="100%" height={410}>
//       <BarChart
//         layout="vertical"
//         data={data}
//         margin={{ top: 20, right: 10, left: 50, bottom: 5 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis type="number" tickFormatter={(value) => `R$${value / 1000000}M`} />
//         <YAxis type="category" dataKey="name" />
//         <Tooltip formatter={(value) => `R$${value}`} />
//         <Legend />
//         {data.map((entry, index) => (
//           <Bar
//             key={entry.name}
//             dataKey="value"
//             fill={pastelColors[index % pastelColors.length]}
//             name="KPI"
//           />
//         ))}
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }



// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'Independente', value: 120000000 },
//   { name: 'C&C', value: 80000000 },
//   { name: 'Traditional', value: 60000000 },
//   { name: 'Super G', value: 40000000 },
//   { name: 'Hyper', value: 20000000 },
//   { name: 'Super P', value: 10000000 },
// ];

// export function ValueSalesByChannel() {
//   return (
//     <ResponsiveContainer width="100%" height={410}>
//       <BarChart
//         layout="vertical"
//         data={data}
//         margin={{ top: 20, right: 10, left: 50, bottom: 5 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis type="number" tickFormatter={(value) => `R$${value / 1000000}M`} />
//         <YAxis type="category" dataKey="name" />
//         <Tooltip formatter={(value) => `R$${value}`} />
//         <Legend />
//         <Bar dataKey="value" fill="#8884d8" name="KPI" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }



