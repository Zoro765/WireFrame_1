import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', AREA_VI: 6000000, AREA_II: 4000000, AREA_I: 2000000, AREA_V: 3000000, AREA_IV: 2500000, AREA_III: 1500000 },
  { month: 'Feb', AREA_VI: 5500000, AREA_II: 3800000, AREA_I: 2200000, AREA_V: 2800000, AREA_IV: 2400000, AREA_III: 1400000 },
  { month: 'Mar', AREA_VI: 5000000, AREA_II: 3600000, AREA_I: 2400000, AREA_V: 2600000, AREA_IV: 2300000, AREA_III: 1300000 },
  { month: 'Apr', AREA_VI: 4800000, AREA_II: 3400000, AREA_I: 2600000, AREA_V: 2400000, AREA_IV: 2200000, AREA_III: 1200000 },
  { month: 'May', AREA_VI: 4600000, AREA_II: 3200000, AREA_I: 2800000, AREA_V: 2200000, AREA_IV: 2100000, AREA_III: 1100000 },
  { month: 'Jun', AREA_VI: 4400000, AREA_II: 3000000, AREA_I: 3000000, AREA_V: 2000000, AREA_IV: 2000000, AREA_III: 1000000 },
  { month: 'Jul', AREA_VI: 4200000, AREA_II: 2800000, AREA_I: 3200000, AREA_V: 1800000, AREA_IV: 1900000, AREA_III: 900000 },
  { month: 'Aug', AREA_VI: 4000000, AREA_II: 2600000, AREA_I: 3400000, AREA_V: 1600000, AREA_IV: 1800000, AREA_III: 800000 },
  { month: 'Sep', AREA_VI: 3800000, AREA_II: 2400000, AREA_I: 3600000, AREA_V: 1400000, AREA_IV: 1700000, AREA_III: 700000 },
  { month: 'Oct', AREA_VI: 3600000, AREA_II: 2200000, AREA_I: 3800000, AREA_V: 1200000, AREA_IV: 1600000, AREA_III: 600000 },
  { month: 'Nov', AREA_VI: 3400000, AREA_II: 2000000, AREA_I: 4000000, AREA_V: 1000000, AREA_IV: 1500000, AREA_III: 500000 },
  { month: 'Dec', AREA_VI: 3200000, AREA_II: 1800000, AREA_I: 4200000, AREA_V: 800000, AREA_IV: 1400000, AREA_III: 400000 },
];

export function ValueSalesOverTime() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}
        margin={{ top: 5,right: 5,left: 30,bottom: 5, }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis
          tickFormatter={(value) => `R$${value / 1000000}M`}
          label={{ value: 'Value Sales (R$M)', angle: -90, position: 'outsideLeft' , dx : -54 , dy : 5}}
        />
        <Tooltip formatter={(value) => `R$${value}`} />
        <Legend />
        <Line type="monotone" dataKey="AREA_VI" stroke="#4a235a" name="AREA VI" />
        <Line type="monotone" dataKey="AREA_II" stroke="#8884d8" name="AREA II" />
        <Line type="monotone" dataKey="AREA_I" stroke="#82ca9d" name="AREA I" />
        <Line type="monotone" dataKey="AREA_V" stroke="#ffc658" name="AREA V" />
        <Line type="monotone" dataKey="AREA_IV" stroke="#ff6b6b" name="AREA IV" />
        <Line type="monotone" dataKey="AREA_III" stroke="#6b5b95" name="AREA III" />
      </LineChart>
    </ResponsiveContainer>
  );
}



// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   { month: 'Jan', AREA_VI: 6000000, AREA_II: 4000000, AREA_I: 2000000, AREA_V: 3000000, AREA_IV: 2500000, AREA_III: 1500000 },
//   { month: 'Feb', AREA_VI: 5500000, AREA_II: 3800000, AREA_I: 2200000, AREA_V: 2800000, AREA_IV: 2400000, AREA_III: 1400000 },
//   { month: 'Mar', AREA_VI: 5000000, AREA_II: 3600000, AREA_I: 2400000, AREA_V: 2600000, AREA_IV: 2300000, AREA_III: 1300000 },
//   { month: 'Apr', AREA_VI: 4800000, AREA_II: 3400000, AREA_I: 2600000, AREA_V: 2400000, AREA_IV: 2200000, AREA_III: 1200000 },
//   { month: 'May', AREA_VI: 4600000, AREA_II: 3200000, AREA_I: 2800000, AREA_V: 2200000, AREA_IV: 2100000, AREA_III: 1100000 },
//   { month: 'Jun', AREA_VI: 4400000, AREA_II: 3000000, AREA_I: 3000000, AREA_V: 2000000, AREA_IV: 2000000, AREA_III: 1000000 },
//   { month: 'Jul', AREA_VI: 4200000, AREA_II: 2800000, AREA_I: 3200000, AREA_V: 1800000, AREA_IV: 1900000, AREA_III: 900000 },
//   { month: 'Aug', AREA_VI: 4000000, AREA_II: 2600000, AREA_I: 3400000, AREA_V: 1600000, AREA_IV: 1800000, AREA_III: 800000 },
//   { month: 'Sep', AREA_VI: 3800000, AREA_II: 2400000, AREA_I: 3600000, AREA_V: 1400000, AREA_IV: 1700000, AREA_III: 700000 },
//   { month: 'Oct', AREA_VI: 3600000, AREA_II: 2200000, AREA_I: 3800000, AREA_V: 1200000, AREA_IV: 1600000, AREA_III: 600000 },
//   { month: 'Nov', AREA_VI: 3400000, AREA_II: 2000000, AREA_I: 4000000, AREA_V: 1000000, AREA_IV: 1500000, AREA_III: 500000 },
//   { month: 'Dec', AREA_VI: 3200000, AREA_II: 1800000, AREA_I: 4200000, AREA_V: 800000, AREA_IV: 1400000, AREA_III: 400000 },
// ];

// export function ValueSalesOverTime() {
//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="month" />
//         <YAxis
//           tickFormatter={(value) => `R$${value / 1000000}M`}
//           label={{ value: 'Value Sales (R$M)', angle: -90, position: 'insideLeft' }}
//         />
//         <Tooltip formatter={(value) => `R$${value}`} />
//         <Legend />
//         <Line type="monotone" dataKey="AREA_VI" stroke="#4a235a" name="AREA VI" />
//         <Line type="monotone" dataKey="AREA_II" stroke="#8884d8" name="AREA II" />
//         <Line type="monotone" dataKey="AREA_I" stroke="#82ca9d" name="AREA I" />
//         <Line type="monotone" dataKey="AREA_V" stroke="#ffc658" name="AREA V" />
//         <Line type="monotone" dataKey="AREA_IV" stroke="#ff6b6b" name="AREA IV" />
//         <Line type="monotone" dataKey="AREA_III" stroke="#6b5b95" name="AREA III" />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }