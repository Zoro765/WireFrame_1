import React, { useState } from "react";
import { ChevronUp, ChevronDown, HelpCircle } from "lucide-react";

interface DataRow {
  channel: string;
  type: string;
  brand: string;
  ppg: string;
  price: number;
  newPrice: number;
  priceChange: number;
  priceElasticity: number;
  distributionAdjustment: string;
  expectedDistribution: number;
  coverageFactor: number;
}

const initialData: DataRow[] = [
  { channel: "C&C", type: "Own", brand: "CLIGHT", ppg: "CLIGHT81XNAO PROMOCAO", price: 1.37, newPrice: 1.37, priceChange: 0, priceElasticity: -1.22, distributionAdjustment: "No", expectedDistribution: 7, coverageFactor: 0.1 },
  { channel: "C&C", type: "Own", brand: "FRESH", ppg: "FRESH101XNAO PROMOCAO", price: 0.79, newPrice: 0.79, priceChange: 0, priceElasticity: -1.98, distributionAdjustment: "No", expectedDistribution: 16.33, coverageFactor: 0.86 },
  { channel: "C&C", type: "Own", brand: "TANG", ppg: "TANG25100XPROMOCAO", price: 8.1, newPrice: 8.1, priceChange: 0, priceElasticity: -2.74, distributionAdjustment: "No", expectedDistribution: 1, coverageFactor: 0.1 },
  { channel: "C&C", type: "Competition", brand: "CAMP", ppg: "CAMP151XNAO PROMOCAO", price: 0.51, newPrice: 0.51, priceChange: 0, priceElasticity: -3, distributionAdjustment: "No", expectedDistribution: 10, coverageFactor: 0 },
  { channel: "Hyper", type: "Own", brand: "CLIGHT", ppg: "CLIGHT81XNAO PROMOCAO", price: 0.84, newPrice: 0.84, priceChange: 0, priceElasticity: -0.83, distributionAdjustment: "No", expectedDistribution: 57.33, coverageFactor: 0.1 },
  // New rows added
  { channel: "C&C", type: "Own", brand: "LACTA", ppg: "COOKIELACTALACTA51", price: 3.68, newPrice: 3.72, priceChange: 1, priceElasticity: -1.92, distributionAdjustment: "No", expectedDistribution: 76.33, coverageFactor: 0.54 },
  { channel: "C&C", type: "Own", brand: "OREO", ppg: "RECHEADO DOCEOREOOREO51", price: 3.17, newPrice: 3.2, priceChange: 1, priceElasticity: -1.5, distributionAdjustment: "No", expectedDistribution: 93.67, coverageFactor: 0.99 },
  { channel: "C&C", type: "Own", brand: "OREO", ppg: "RECHEADO DOCEOREOOREO75", price: 8.02, newPrice: 8.1, priceChange: 1, priceElasticity: -2.77, distributionAdjustment: "No", expectedDistribution: 69.33, coverageFactor: 0.99 },
  { channel: "C&C", type: "Own", brand: "OREO", ppg: "RECHEADO DOCEOREOOREO128", price: 1.28, newPrice: 1.29, priceChange: 1, priceElasticity: -1.12, distributionAdjustment: "No", expectedDistribution: 92, coverageFactor: 0.99 },
  { channel: "C&C", type: "Own", brand: "TRAKINAS", ppg: "RECHEADO DOCETRAKINASTRA", price: 1.76, newPrice: 1.78, priceChange: 1, priceElasticity: -1.46, distributionAdjustment: "No", expectedDistribution: 69.33, coverageFactor: 0.44 },
  { channel: "C&C", type: "Competition", brand: "AGUIA", ppg: "SALGADOAGUIASALT351", price: 4.37, newPrice: 4.41, priceChange: 1, priceElasticity: -1.32, distributionAdjustment: "No", expectedDistribution: 80.67, coverageFactor: 0 }
];

export const DataTable: React.FC = () => {
  const [data, setData] = useState<DataRow[]>(initialData);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [globalPriceChange, setGlobalPriceChange] = useState<string>("");
  const [globalCoverageFactor, setGlobalCoverageFactor] = useState<string>("");
  const [globalDistribution, setGlobalDistribution] = useState<string>("");

  const handleSort = (column: keyof DataRow) => {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
    setData([...data].sort((a, b) => {
      if (a[column] < b[column]) return newDirection === "asc" ? -1 : 1;
      if (a[column] > b[column]) return newDirection === "asc" ? 1 : -1;
      return 0;
    }));
  };

  const handleGlobalPriceChange = (value: string) => {
    setGlobalPriceChange(value);
    if (value !== "") {
      const numValue = parseFloat(value);
      setData(prevData => prevData.map(row => ({
        ...row,
        priceChange: numValue
      })));
    }
  };

  const handleGlobalCoverageFactor = (value: string) => {
    setGlobalCoverageFactor(value);
    if (value !== "") {
      const numValue = parseFloat(value);
      setData(prevData => prevData.map(row => ({
        ...row,
        coverageFactor: numValue
      })));
    }
  };

  const handleGlobalDistribution = (value: string) => {
    setGlobalDistribution(value);
    setData(prevData => prevData.map(row => ({
      ...row,
      distributionAdjustment: value
    })));
  };

  return (
    <div className="overflow-x-auto overflow-y-auto max-h-[500px] p-4 bg-white shadow-lg rounded-lg">
      <table className="min-w-full border-collapse border border-black-400 rounded-lg ">
        <thead className="bg-gradient-to-r from-white-500 to-indigo-500 text-purple sticky top-0">
          <tr>
            {[
              "channel",
              "type",
              "brand",
              "ppg",
              "price",
              "newPrice",
              { name: "priceChange", label: "%Price Change", hasHelp: true },
              "priceElasticity",
              { name: "distributionAdjustment", label: "Distribution Adjustment", hasHelp: false },
              "expectedDistribution",
              "coverageFactor"
            ].map((column) => (
              <th
                key={typeof column === 'string' ? column : column.name}
                className="px-4 py-2 cursor-pointer border border-gray-300 text-left"
              >
                <div className="flex items-center gap-1">
                  {typeof column === 'string' ? (
                    column.charAt(0).toUpperCase() + column.slice(1)
                  ) : (
                    <>
                      {column.label}
                      {column.hasHelp && <HelpCircle className="inline w-4 h-4" />}
                    </>
                  )}
                  {sortColumn === (typeof column === 'string' ? column : column.name) && 
                    (sortDirection === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                </div>
                {(typeof column !== 'string' && column.name === 'priceChange') && (
                  <input
                    type="number"
                    value={globalPriceChange}
                    onChange={(e) => handleGlobalPriceChange(e.target.value)}
                    className="w-full mt-1 px-2 py-1 border border-gray-400 rounded"
                    placeholder="Set all"
                  />
                )}
                {(typeof column !== 'string' && column.name === 'distributionAdjustment') && (
                  <select
                    value={globalDistribution}
                    onChange={(e) => handleGlobalDistribution(e.target.value)}
                    className="w-full mt-1 px-2 py-1 border border-gray-400 rounded"
                  >
                    <option value="">Select Distribution</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                )}
                {column === 'coverageFactor' && (
                  <input
                    type="number"
                    value={globalCoverageFactor}
                    onChange={(e) => handleGlobalCoverageFactor(e.target.value)}
                    className="w-full mt-1 px-2 py-1 border border-gray-400 rounded"
                    placeholder="Set all"
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100 hover:bg-gray-200" : "bg-white hover:bg-gray-200"}>
              <td className="px-4 py-2 border border-gray-300">{row.channel}</td>
              <td className="px-4 py-2 border border-gray-300">{row.type}</td>
              <td className="px-4 py-2 border border-gray-300">{row.brand}</td>
              <td className="px-4 py-2 border border-gray-300">{row.ppg}</td>
              <td className="px-4 py-2 border border-gray-300">{row.price}</td>
              <td className="px-4 py-2 border border-gray-300">{row.newPrice.toFixed(2)}</td>
              <td className="px-4 py-2 border border-gray-300">
                <input
                  type="number"
                  value={row.priceChange}
                  onChange={(e) => setData(prevData => prevData.map((r, i) => 
                    i === index ? { ...r, priceChange: parseFloat(e.target.value) || 0 } : r
                  ))}
                  className="w-full px-2 py-1 border border-gray-400 rounded"
                />
              </td>
              <td className="px-4 py-2 border border-gray-300">{row.priceElasticity}</td>
              <td className="px-4 py-2 border border-gray-300">
                <select
                  value={row.distributionAdjustment}
                  onChange={(e) => setData(prevData => prevData.map((r, i) =>
                    i === index ? { ...r, distributionAdjustment: e.target.value } : r
                  ))}
                  className="w-full px-2 py-1 border border-gray-400 rounded"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </td>
              <td className="px-4 py-2 border border-gray-300">{row.expectedDistribution}</td>
              <td className="px-4 py-2 border border-gray-300">
                <input
                  type="number"
                  value={row.coverageFactor}
                  onChange={(e) => setData(prevData => prevData.map((r, i) =>
                    i === index ? { ...r, coverageFactor: parseFloat(e.target.value) || 0 } : r
                  ))}
                  className="w-full px-2 py-1 border border-gray-400 rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};






// import React, { useState } from "react";
// import { ChevronUp, ChevronDown, HelpCircle } from "lucide-react";

// interface DataRow {
//   channel: string;
//   type: string;
//   brand: string;
//   ppg: string;
//   price: number;
//   newPrice: number;
//   priceChange: number;
//   priceElasticity: number;
//   distributionAdjustment: string;
//   expectedDistribution: number;
//   coverageFactor: number;
// }

// const initialData: DataRow[] = [
//   { channel: "C&C", type: "Own", brand: "CLIGHT", ppg: "CLIGHT81XNAO PROMOCAO", price: 1.37, newPrice: 1.37, priceChange: 0, priceElasticity: -1.22, distributionAdjustment: "No", expectedDistribution: 7, coverageFactor: 0.1 },
//   { channel: "C&C", type: "Own", brand: "FRESH", ppg: "FRESH101XNAO PROMOCAO", price: 0.79, newPrice: 0.79, priceChange: 0, priceElasticity: -1.98, distributionAdjustment: "No", expectedDistribution: 16.33, coverageFactor: 0.86 },
//   { channel: "C&C", type: "Own", brand: "TANG", ppg: "TANG25100XPROMOCAO", price: 8.1, newPrice: 8.1, priceChange: 0, priceElasticity: -2.74, distributionAdjustment: "No", expectedDistribution: 1, coverageFactor: 0.1 },
//   { channel: "C&C", type: "Competition", brand: "CAMP", ppg: "CAMP151XNAO PROMOCAO", price: 0.51, newPrice: 0.51, priceChange: 0, priceElasticity: -3, distributionAdjustment: "No", expectedDistribution: 10, coverageFactor: 0 },
//   { channel: "Hyper", type: "Own", brand: "CLIGHT", ppg: "CLIGHT81XNAO PROMOCAO", price: 0.84, newPrice: 0.84, priceChange: 0, priceElasticity: -0.83, distributionAdjustment: "No", expectedDistribution: 57.33, coverageFactor: 0.1 },
//   // New rows added
//   { channel: "C&C", type: "Own", brand: "LACTA", ppg: "COOKIELACTALACTA51", price: 3.68, newPrice: 3.72, priceChange: 1, priceElasticity: -1.92, distributionAdjustment: "No", expectedDistribution: 76.33, coverageFactor: 0.54 },
//   { channel: "C&C", type: "Own", brand: "OREO", ppg: "RECHEADO DOCEOREOOREO51", price: 3.17, newPrice: 3.2, priceChange: 1, priceElasticity: -1.5, distributionAdjustment: "No", expectedDistribution: 93.67, coverageFactor: 0.99 },
//   { channel: "C&C", type: "Own", brand: "OREO", ppg: "RECHEADO DOCEOREOOREO75", price: 8.02, newPrice: 8.1, priceChange: 1, priceElasticity: -2.77, distributionAdjustment: "No", expectedDistribution: 69.33, coverageFactor: 0.99 },
//   { channel: "C&C", type: "Own", brand: "OREO", ppg: "RECHEADO DOCEOREOOREO128", price: 1.28, newPrice: 1.29, priceChange: 1, priceElasticity: -1.12, distributionAdjustment: "No", expectedDistribution: 92, coverageFactor: 0.99 },
//   { channel: "C&C", type: "Own", brand: "TRAKINAS", ppg: "RECHEADO DOCETRAKINASTRA", price: 1.76, newPrice: 1.78, priceChange: 1, priceElasticity: -1.46, distributionAdjustment: "No", expectedDistribution: 69.33, coverageFactor: 0.44 },
//   { channel: "C&C", type: "Competition", brand: "AGUIA", ppg: "SALGADOAGUIASALT351", price: 4.37, newPrice: 4.41, priceChange: 1, priceElasticity: -1.32, distributionAdjustment: "No", expectedDistribution: 80.67, coverageFactor: 0 }
// ];

// export const DataTable: React.FC = () => {
//   const [data, setData] = useState<DataRow[]>(initialData);
//   const [sortColumn, setSortColumn] = useState<string | null>(null);
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
//   const [globalPriceChange, setGlobalPriceChange] = useState<string>("");
//   const [globalCoverageFactor, setGlobalCoverageFactor] = useState<string>("");

//   const handleSort = (column: keyof DataRow) => {
//     const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
//     setSortColumn(column);
//     setSortDirection(newDirection);
//     setData([...data].sort((a, b) => {
//       if (a[column] < b[column]) return newDirection === "asc" ? -1 : 1;
//       if (a[column] > b[column]) return newDirection === "asc" ? 1 : -1;
//       return 0;
//     }));
//   };

//   const handleGlobalPriceChange = (value: string) => {
//     setGlobalPriceChange(value);
//     if (value !== "") {
//       const numValue = parseFloat(value);
//       setData(prevData => prevData.map(row => ({
//         ...row,
//         priceChange: numValue
//       })));
//     }
//   };

//   const handleGlobalCoverageFactor = (value: string) => {
//     setGlobalCoverageFactor(value);
//     if (value !== "") {
//       const numValue = parseFloat(value);
//       setData(prevData => prevData.map(row => ({
//         ...row,
//         coverageFactor: numValue
//       })));
//     }
//   };

//   return (
//     <div className="overflow-x-auto overflow-y-auto max-h-[500px] p-4 bg-white shadow-lg rounded-lg">
//       <table className="min-w-full border-collapse border border-gray-300">
//         <thead className="bg-gradient-to-r from-white-500 to-indigo-500 text-purple sticky top-0">
//           <tr>
//             {[
//               "channel",
//               "type",
//               "brand",
//               "ppg",
//               "price",
//               "newPrice",
//               { name: "priceChange", label: "%Price Change", hasHelp: true },
//               "priceElasticity",
//               { name: "distributionAdjustment", label: "Distribution Adjustment", hasHelp: false },
//               "expectedDistribution",
//               "coverageFactor"
//             ].map((column) => (
//               <th
//                 key={typeof column === 'string' ? column : column.name}
//                 className="px-4 py-2 cursor-pointer border border-gray-300 text-left"
//               >
//                 <div className="flex items-center gap-1">
//                   {typeof column === 'string' ? (
//                     column.charAt(0).toUpperCase() + column.slice(1)
//                   ) : (
//                     <>
//                       {column.label}
//                       {column.hasHelp && <HelpCircle className="inline w-4 h-4" />}
//                     </>
//                   )}
//                   {sortColumn === (typeof column === 'string' ? column : column.name) && 
//                     (sortDirection === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
//                 </div>
//                 {(typeof column !== 'string' && column.name === 'priceChange') && (
//                   <input
//                     type="number"
//                     value={globalPriceChange}
//                     onChange={(e) => handleGlobalPriceChange(e.target.value)}
//                     className="w-full mt-1 px-2 py-1 border border-gray-400 rounded"
//                     placeholder="Set all"
//                   />
//                 )}
//                 {column === 'coverageFactor' && (
//                   <input
//                     type="number"
//                     value={globalCoverageFactor}
//                     onChange={(e) => handleGlobalCoverageFactor(e.target.value)}
//                     className="w-full mt-1 px-2 py-1 border border-gray-400 rounded"
//                     placeholder="Set all"
//                   />
//                 )}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, index) => (
//             <tr key={index} className={index % 2 === 0 ? "bg-gray-100 hover:bg-gray-200" : "bg-white hover:bg-gray-200"}>
//               <td className="px-4 py-2 border border-gray-300">{row.channel}</td>
//               <td className="px-4 py-2 border border-gray-300">{row.type}</td>
//               <td className="px-4 py-2 border border-gray-300">{row.brand}</td>
//               <td className="px-4 py-2 border border-gray-300">{row.ppg}</td>
//               <td className="px-4 py-2 border border-gray-300">{row.price}</td>
//               <td className="px-4 py-2 border border-gray-300">{row.newPrice.toFixed(2)}</td>
//               <td className="px-4 py-2 border border-gray-300">
//                 <input
//                   type="number"
//                   value={row.priceChange}
//                   onChange={(e) => setData(prevData => prevData.map((r, i) => 
//                     i === index ? { ...r, priceChange: parseFloat(e.target.value) || 0 } : r
//                   ))}
//                   className="w-full px-2 py-1 border border-gray-400 rounded"
//                 />
//               </td>
//               <td className="px-4 py-2 border border-gray-300">{row.priceElasticity}</td>
//               <td className="px-4 py-2 border border-gray-300">
//                 <select
//                   value={row.distributionAdjustment}
//                   onChange={(e) => setData(prevData => prevData.map((r, i) =>
//                     i === index ? { ...r, distributionAdjustment: e.target.value } : r
//                   ))}
//                   className="w-full px-2 py-1 border border-gray-400 rounded"
//                 >
//                   <option value="No">No</option>
//                   <option value="Yes">Yes</option>
//                 </select>
//               </td>
//               <td className="px-4 py-2 border border-gray-300">{row.expectedDistribution}</td>
//               <td className="px-4 py-2 border border-gray-300">
//                 <input
//                   type="number"
//                   value={row.coverageFactor}
//                   onChange={(e) => setData(prevData => prevData.map((r, i) =>
//                     i === index ? { ...r, coverageFactor: parseFloat(e.target.value) || 0 } : r
//                   ))}
//                   className="w-full px-2 py-1 border border-gray-400 rounded"
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };



// const initialData: DataRow[] = [
//   { channel: "C&C", type: "Own", brand: "CLIGHT", ppg: "CLIGHT81XNAO PROMOCAO", price: 1.37, newPrice: 1.37, priceChange: 0, priceElasticity: -1.22, distributionAdjustment: "No", expectedDistribution: 7, coverageFactor: 0.1 },
//   { channel: "C&C", type: "Own", brand: "FRESH", ppg: "FRESH101XNAO PROMOCAO", price: 0.79, newPrice: 0.79, priceChange: 0, priceElasticity: -1.98, distributionAdjustment: "No", expectedDistribution: 16.33, coverageFactor: 0.86 },
//   { channel: "C&C", type: "Own", brand: "TANG", ppg: "TANG25100XPROMOCAO", price: 8.1, newPrice: 8.1, priceChange: 0, priceElasticity: -2.74, distributionAdjustment: "No", expectedDistribution: 1, coverageFactor: 0.1 },
//   { channel: "C&C", type: "Competition", brand: "CAMP", ppg: "CAMP151XNAO PROMOCAO", price: 0.51, newPrice: 0.51, priceChange: 0, priceElasticity: -3, distributionAdjustment: "No", expectedDistribution: 10, coverageFactor: 0 },
//   { channel: "Hyper", type: "Own", brand: "CLIGHT", ppg: "CLIGHT81XNAO PROMOCAO", price: 0.84, newPrice: 0.84, priceChange: 0, priceElasticity: -0.83, distributionAdjustment: "No", expectedDistribution: 57.33, coverageFactor: 0.1 },
//   // New rows added
//   { channel: "C&C", type: "Own", brand: "LACTA", ppg: "COOKIELACTALACTA51", price: 3.68, newPrice: 3.72, priceChange: 1, priceElasticity: -1.92, distributionAdjustment: "No", expectedDistribution: 76.33, coverageFactor: 0.54 },
//   { channel: "C&C", type: "Own", brand: "OREO", ppg: "RECHEADO DOCEOREOOREO51", price: 3.17, newPrice: 3.2, priceChange: 1, priceElasticity: -1.5, distributionAdjustment: "No", expectedDistribution: 93.67, coverageFactor: 0.99 },
//   { channel: "C&C", type: "Own", brand: "OREO", ppg: "RECHEADO DOCEOREOOREO75", price: 8.02, newPrice: 8.1, priceChange: 1, priceElasticity: -2.77, distributionAdjustment: "No", expectedDistribution: 69.33, coverageFactor: 0.99 },
//   { channel: "C&C", type: "Own", brand: "OREO", ppg: "RECHEADO DOCEOREOOREO128", price: 1.28, newPrice: 1.29, priceChange: 1, priceElasticity: -1.12, distributionAdjustment: "No", expectedDistribution: 92, coverageFactor: 0.99 },
//   { channel: "C&C", type: "Own", brand: "TRAKINAS", ppg: "RECHEADO DOCETRAKINASTRA", price: 1.76, newPrice: 1.78, priceChange: 1, priceElasticity: -1.46, distributionAdjustment: "No", expectedDistribution: 69.33, coverageFactor: 0.44 },
//   { channel: "C&C", type: "Competition", brand: "AGUIA", ppg: "SALGADOAGUIASALT351", price: 4.37, newPrice: 4.41, priceChange: 1, priceElasticity: -1.32, distributionAdjustment: "No", expectedDistribution: 80.67, coverageFactor: 0 }
// ];


