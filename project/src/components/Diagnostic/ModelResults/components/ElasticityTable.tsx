import React from 'react';

const data = [
  {
    type: 'Highly Elastic',
    range: 'Greater than or equal to 1.5',
    count: 145,
    percentage: 48.66
  },
  {
    type: 'Elastic',
    range: '[1,1.5)',
    count: 67,
    percentage: 22.48
  },
  {
    type: 'Inelastic',
    range: '[0,1)',
    count: 86,
    percentage: 28.86
  }
];

const getBadgeColor = (type) => {
  switch (type) {
    case 'Highly Elastic':
      return 'bg-green-100 text-green-800';
    case 'Elastic':
      return 'bg-blue-100 text-blue-800';
    case 'Inelastic':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function ElasticityTable() {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm ">
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg h-[340px]">
            <thead>
              <tr className="bg-purple-50">
                <th className="px-4 py-3 text-left font-semibold text-purple-900 border-b">
                  Elasticity Bins
                </th>
                <th className="px-4 py-3 text-left font-semibold text-purple-900 border-b">
                  Elasticity Range
                </th>
                <th className="px-4 py-3 text-left font-semibold text-purple-900 border-b">
                  Number of Area/Channel/PPG
                </th>
                <th className="px-4 py-3 text-left font-semibold text-purple-900 border-b">
                  % of Total
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr 
                  key={row.type}
                  className="hover:bg-purple-50/50 border-b last:border-b-0"
                >
                  <td className="px-4 py-3">
                    <span className={`${getBadgeColor(row.type)} px-3 py-1 rounded-full text-sm font-medium`}>
                      {row.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-gray-700">
                    {row.range}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    {row.count}
                  </td>
                  <td className="px-4 py-3 text-purple-700">
                    {row.percentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}





// import React from 'react';

// const data = [
//   {
//     type: 'Highly Elastic',
//     range: 'Greater than or equal to 1.5',
//     count: 145,
//     percentage: 48.66
//   },
//   {
//     type: 'Elastic',
//     range: '[1,1.5)',
//     count: 67,
//     percentage: 22.48
//   },
//   {
//     type: 'Inelastic',
//     range: '[0,1)',
//     count: 86,
//     percentage: 28.86
//   }
// ];

// export function ElasticityTable({ width = '100%', height = 400 }) {
//   return (
//     <div style={{ width, height }}>
//       <table style={{ width: '100%', borderCollapse: 'collapse', height: '100%', border: '1px solid black' }}>
//         <thead>
//           <tr style={{ backgroundColor: '#f3e8ff' }}>
//             <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: '#6b21a8', border: '1px solid black' }}>Elasticity Bins</th>
//             <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: '#6b21a8', border: '1px solid black' }}>Elasticity Range</th>
//             <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: '#6b21a8', border: '1px solid black' }}>Number of Area/Channel/PPG</th>
//             <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: '#6b21a8', border: '1px solid black' }}>% of Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row) => (
//             <tr key={row.type} style={{ border: '1px solid black' }}>
//               <td style={{ padding: '12px', fontSize: '14px', color: '#374151', border: '1px solid black' }}>{row.type}</td>
//               <td style={{ padding: '12px', fontSize: '14px', color: '#374151', border: '1px solid black' }}>{row.range}</td>
//               <td style={{ padding: '12px', fontSize: '14px', color: '#374151', border: '1px solid black' }}>{row.count}</td>
//               <td style={{ padding: '12px', fontSize: '14px', color: '#374151', border: '1px solid black' }}>{row.percentage}%</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }





// import React from 'react';

// const data = [
//   {
//     type: 'Highly Elastic',
//     range: 'Greater than or equal to 1.5',
//     count: 145,
//     percentage: 48.66
//   },
//   {
//     type: 'Elastic',
//     range: '[1,1.5)',
//     count: 67,
//     percentage: 22.48
//   },
//   {
//     type: 'Inelastic',
//     range: '[0,1)',
//     count: 86,
//     percentage: 28.86
//   }
// ];

// export function ElasticityTable({ width = '100%', height = 400 }) {
//   return (
//     <div style={{ width, height }}>
//       <table style={{ width: '100%', borderCollapse: 'collapse' , height : '100%' , border: '1px solid grey'}}>
//         <thead>
//           <tr style={{ backgroundColor: '#f3e8ff' }}>
//             <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: '#6b21a8' }}>Elasticity Bins</th>
//             <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: '#6b21a8' }}>Elasticity Range</th>
//             <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: '#6b21a8' }}>Number of Area/Channel/PPG</th>
//             <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: '#6b21a8' }}>% of Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, index) => (
//             <tr 
//               key={row.type}
//               // style={{ backgroundColor: index % 2 === 0 ? '#faf5ff' : '#ffffff' }}
//             >
//               <td style={{ padding: '12px', fontSize: '14px', color: '#374151' }}>{row.type}</td>
//               <td style={{ padding: '12px', fontSize: '14px', color: '#374151' }}>{row.range}</td>
//               <td style={{ padding: '12px', fontSize: '14px', color: '#374151' }}>{row.count}</td>
//               <td style={{ padding: '12px', fontSize: '14px', color: '#374151' }}>{row.percentage}%</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }