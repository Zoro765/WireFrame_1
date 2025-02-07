import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from 'recharts';

export function PriceElasticityPerPPG() {
  const data = [
    { name: 'FIT81NAO PROMOCAO', value: 2.9 },
    { name: 'TRINK251NAO PROMOCAO', value: 2.8 },
    { name: 'MID251NAO PROMOCAO', value: 2.3 },
    { name: 'MID201NAO PROMOCAO', value: 2.2 },
    { name: 'OUTRA MARCA1101NAO PROMOCAO', value: 2.1 },
    { name: 'OUTRA MARCA301NAO PROMOCAO', value: 1.9 },
    { name: 'OUTRA MARCA251NAO PROMOCAO', value: 1.8 },
    { name: 'OUTRA MARCA251NAO PROMOCAO', value: 1.7 },
    { name: 'CAMP151NAO PROMOCAO', value: 1.6 },
  ];

  // Pastel color palette
  // const pastelColors = [
  //   'rgba(156, 195, 237, 0.8)', // Light Blue
  //   'rgba(255, 182, 193, 0.8)', // Light Pink
  //   'rgba(152, 251, 152, 0.8)', // Light Green
  //   'rgba(255, 223, 186, 0.8)', // Light Orange
  //   'rgba(221, 160, 221, 0.8)', // Light Purple
  //   'rgba(240, 128, 128, 0.8)', // Light Coral
  //   'rgba(173, 216, 230, 0.8)', // Light Sky Blue
  //   'rgba(255, 218, 185, 0.8)', // Light Peach
  //   'rgba(144, 238, 144, 0.8)', // Light Lime Green
  // ];

  const pastelColors = ['#B5D8EB', '#F7CAC9', '#C3E2C2', '#FFEEAD', '#E6B5C9', '#A2D5F2'];
  return (
    <div style={{ width: '100%', height: '340px', overflowX: 'auto' }}>
      {/* Set a minimum width to ensure scrolling */}
      <div style={{ minWidth: `${data.length * 150}px`, height: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
            <XAxis
              dataKey="name"
              angle={0}
              tick={{ fontSize: 12, textAnchor: 'middle' }}
              interval={0}
              height={70} // Adjust height to accommodate the labels
            />
            <YAxis>
              <Label
                value="Avg Price Elasticity"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: 'middle', fontSize: 14 }}
              />
            </YAxis>
            <Tooltip />
            <Bar dataKey="value" fill={pastelColors[0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}



// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// export function PriceElasticityPerPPG() {
//   const data = [
//     { name: 'FIT81NAO PROMOCAO', value: 2.9 },
//     { name: 'TRINK251NAO PROMOCAO', value: 2.8 },
//     { name: 'MID251NAO PROMOCAO', value: 2.3 },
//     { name: 'MID201NAO PROMOCAO', value: 2.2 },
//     { name: 'OUTRA MARCA1101NAO PROMOCAO', value: 2.1 },
//     { name: 'OUTRA MARCA301NAO PROMOCAO', value: 1.9 },
//     { name: 'OUTRA MARCA251NAO PROMOCAO', value: 1.8 },
//     { name: 'OUTRA MARCA251NAO PROMOCAO', value: 1.7 },
//     { name: 'CAMP151NAO PROMOCAO', value: 1.6 },
//   ];

//   return (
//     <div className="w-full bg-white rounded-lg shadow-sm p-6">
//       <div style={{ width: '100%', height: '270px', overflowX: 'auto' }}>
//         <div style={{ minWidth: '1200px', height: '100%' }}>
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
//               <XAxis dataKey="name" angle={0} tick={{ fontSize: 12 }} interval={0} />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="value" fill="rgba(156, 195, 237, 0.8)" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export function PriceElasticityPerPPG() {
//   const data = {
//     labels: [
//       'FIT81NAO PROMOCAO',
//       'TRINK251NAO PROMOCAO',
//       'MID251NAO PROMOCAO',
//       'MID201NAO PROMOCAO',
//       'OUTRA MARCA1101NAO PROMOCAO',
//       'OUTRA MARCA301NAO PROMOCAO',
//       'OUTRA MARCA251NAO PROMOCAO',
//       'OUTRA MARCA251NAO PROMOCAO',
//       'CAMP151NAO PROMOCAO',
//     ],
//     datasets: [
//       {
//         data: [2.9, 2.8, 2.3, 2.2, 2.1, 1.9, 1.8, 1.7, 1.6],
//         backgroundColor: 'rgba(156, 195, 237, 0.8)', // Pastel Blue
//         borderColor: 'rgba(156, 195, 237, 1)',
//         borderWidth: 1,
//         barThickness: 40,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       title: {
//         display: true,
//         text: 'Price Elasticity Per PPG',
//         font: {
//           size: 16,
//           weight: 'bold',
//         },
//         padding: 20,
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: 'Avg Price Elasticity',
//         },
//         position: 'left',
//       },
//       x: {
//         ticks: {
//           maxRotation: 0,
//           minRotation: 0,
//           autoSkip: false,
//           padding: 10,
//         },
//         grid: {
//           display: false,
//         },
//       },
//     },
//     layout: {
//       padding: {
//         bottom: 20,
//       },
//     },
//   };

//   return (
//     <div className="relative h-[400px]">
//       <div className="absolute inset-0">
//         <div className="h-full overflow-x-auto">
//           <div style={{ minWidth: '1200px', height: '100%', position: 'relative' }}>
//             <Bar data={data} options={options} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }