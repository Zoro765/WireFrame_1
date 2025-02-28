import { useState } from 'react';

const MFGTabularView = () => {
  const data = [
    {
      id: 1,
      customer: 'ARCOM SA',
      ppg: 'TANG181NAO PROMOCAO',
      avgPricePerUnit: 1.39,
      deltaAvgPricePerUnit: 3.00,
      sellOutVolume: 201948,
      deltaSellOutVolume: -3.29,
      sellOutValue: 280326,
      deltaSellOutValue: -0.39,
      sellInVolume: 30292,
      deltaSellInVolume: -3.29,
      grossSales: 926201,
      deltaGrossSales: -0.39,
      netRevenue: 899434,
      deltaNetRevenue: -0.29,
      grossProfit: 478708,
      deltaGrossProfit: 2.31
    },
    {
      id: 2,
      customer: 'ARCOM SA',
      ppg: 'TANG181NAO PROMOCAO',
      avgPricePerUnit: 1.39,
      deltaAvgPricePerUnit: 3.00,
      sellOutVolume: 201948,
      deltaSellOutVolume: -3.29,
      sellOutValue: 280326,
      deltaSellOutValue: -0.39,
      sellInVolume: 30292,
      deltaSellInVolume: -3.29,
      grossSales: 926201,
      deltaGrossSales: -0.39,
      netRevenue: 899434,
      deltaNetRevenue: -0.29,
      grossProfit: 478708,
      deltaGrossProfit: 2.31
    },
    {
      id: 3,
      customer: 'ARCOM SA',
      ppg: 'TANG181NAO PROMOCAO',
      avgPricePerUnit: 1.39,
      deltaAvgPricePerUnit: 3.00,
      sellOutVolume: 201948,
      deltaSellOutVolume: -3.29,
      sellOutValue: 280326,
      deltaSellOutValue: -0.39,
      sellInVolume: 30292,
      deltaSellInVolume: -3.29,
      grossSales: 926201,
      deltaGrossSales: -0.39,
      netRevenue: 899434,
      deltaNetRevenue: -0.29,
      grossProfit: 478708,
      deltaGrossProfit: 2.31
    },
    {
      id: 4,
      customer: 'ARCOM SA',
      ppg: 'TANG181NAO PROMOCAO',
      avgPricePerUnit: 1.39,
      deltaAvgPricePerUnit: 3.00,
      sellOutVolume: 201948,
      deltaSellOutVolume: -3.29,
      sellOutValue: 280326,
      deltaSellOutValue: -0.39,
      sellInVolume: 30292,
      deltaSellInVolume: -3.29,
      grossSales: 926201,
      deltaGrossSales: -0.39,
      netRevenue: 899434,
      deltaNetRevenue: -0.29,
      grossProfit: 478708,
      deltaGrossProfit: 2.31
    },
    {
      id: 5,
      customer: 'ARCOM SA',
      ppg: 'TANG181NAO PROMOCAO',
      avgPricePerUnit: 1.39,
      deltaAvgPricePerUnit: 3.00,
      sellOutVolume: 201948,
      deltaSellOutVolume: -3.29,
      sellOutValue: 280326,
      deltaSellOutValue: -0.39,
      sellInVolume: 30292,
      deltaSellInVolume: -3.29,
      grossSales: 926201,
      deltaGrossSales: -0.39,
      netRevenue: 899434,
      deltaNetRevenue: -0.29,
      grossProfit: 478708,
      deltaGrossProfit: 2.31
    },
    {
      id: 6,
      customer: 'ARCOM SA',
      ppg: 'TANG181NAO PROMOCAO',
      avgPricePerUnit: 1.39,
      deltaAvgPricePerUnit: 3.00,
      sellOutVolume: 201948,
      deltaSellOutVolume: -3.29,
      sellOutValue: 280326,
      deltaSellOutValue: -0.39,
      sellInVolume: 30292,
      deltaSellInVolume: -3.29,
      grossSales: 926201,
      deltaGrossSales: -0.39,
      netRevenue: 899434,
      deltaNetRevenue: -0.29,
      grossProfit: 478708,
      deltaGrossProfit: 2.31
    },
    {
      id: 7,
      customer: 'ARCOM SA',
      ppg: 'TANG181NAO PROMOCAO',
      avgPricePerUnit: 1.39,
      deltaAvgPricePerUnit: 3.00,
      sellOutVolume: 201948,
      deltaSellOutVolume: -3.29,
      sellOutValue: 280326,
      deltaSellOutValue: -0.39,
      sellInVolume: 30292,
      deltaSellInVolume: -3.29,
      grossSales: 926201,
      deltaGrossSales: -0.39,
      netRevenue: 899434,
      deltaNetRevenue: -0.29,
      grossProfit: 478708,
      deltaGrossProfit: 2.31
    }
  ];

  const [pageSize, setPageSize] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  const exportTable = () => {
    const headers = [
      'Customer', 'PPG', 'Avg Price Per Unit', '% Delta Avg Price Per Unit',
      'Sell Out Volume', '% Delta Sell Out Volume', 'Sell Out Value', '% Delta Sell Out Value',
      'Sell In Volume', '% Delta Sell In Volume', 'Gross Sales', '% Delta Gross Sales',
      'Net Revenue', '% Delta Net Revenue', 'Gross Profit', '% Delta Gross Profit'
    ];

    const csvContent = [
      headers.join(','),
      ...data.map(row => [
        row.customer, row.ppg, row.avgPricePerUnit, row.deltaAvgPricePerUnit,
        row.sellOutVolume, row.deltaSellOutVolume, row.sellOutValue, row.deltaSellOutValue,
        row.sellInVolume, row.deltaSellInVolume, row.grossSales, row.deltaGrossSales,
        row.netRevenue, row.deltaNetRevenue, row.grossProfit, row.deltaGrossProfit
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data-table.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full rounded-lg shadow-lg bg-white">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-purple-300">
              <th className="p-2 border border-gray-300 text-left sticky left-0 bg-purple-300">Sr. No</th>
              <th className="p-2 border border-gray-300 text-left">Customer</th>
              <th className="p-2 border border-gray-300 text-left">PPG</th>
              <th className="p-2 border border-gray-300 text-right">Avg Price Per Unit</th>
              <th className="p-2 border border-gray-300 text-right">% Delta Avg Price Per Unit</th>
              <th className="p-2 border border-gray-300 text-right">Sell Out Volume</th>
              <th className="p-2 border border-gray-300 text-right">% Delta Sell Out Volume</th>
              <th className="p-2 border border-gray-300 text-right">Sell Out Value</th>
              <th className="p-2 border border-gray-300 text-right">% Delta Sell Out Value</th>
              <th className="p-2 border border-gray-300 text-right">Sell In Volume</th>
              <th className="p-2 border border-gray-300 text-right">% Delta Sell In Volume</th>
              <th className="p-2 border border-gray-300 text-right">Gross Sales</th>
              <th className="p-2 border border-gray-300 text-right">% Delta Gross Sales</th>
              <th className="p-2 border border-gray-300 text-right">Net Revenue</th>
              <th className="p-2 border border-gray-300 text-right">% Delta Net Revenue</th>
              <th className="p-2 border border-gray-300 text-right">Gross Profit</th>
              <th className="p-2 border border-gray-300 text-right">% Delta Gross Profit</th>
            </tr>
          </thead>
          <tbody>
            {data.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((row, index) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="p-2 border border-gray-300 sticky left-0 bg-white">{index + 1}</td>
                   <td className="p-2 border border-gray-300">{row.customer}</td>
                   <td className="p-2 border border-gray-300">{row.ppg}</td>
                   <td className="p-2 border border-gray-300 text-right">{row.avgPricePerUnit.toFixed(2)}</td>
                   <td className="p-2 border border-gray-300 text-right">{row.deltaAvgPricePerUnit.toFixed(2)}%</td>
                   <td className="p-2 border border-gray-300 text-right">{row.sellOutVolume.toLocaleString()}</td>
                   <td className="p-2 border border-gray-300 text-right">{row.deltaSellOutVolume.toFixed(2)}%</td>
                   <td className="p-2 border border-gray-300 text-right">{row.sellOutValue.toLocaleString()}</td>
                   <td className="p-2 border border-gray-300 text-right">{row.deltaSellOutValue.toFixed(2)}%</td>
                   <td className="p-2 border border-gray-300 text-right">{row.sellInVolume.toLocaleString()}</td>
                   <td className="p-2 border border-gray-300 text-right">{row.deltaSellInVolume.toFixed(2)}%</td>
                   <td className="p-2 border border-gray-300 text-right">{row.grossSales.toLocaleString()}</td>
                   <td className="p-2 border border-gray-300 text-right">{row.deltaGrossSales.toFixed(2)}%</td>
                   <td className="p-2 border border-gray-300 text-right">{row.netRevenue.toLocaleString()}</td>
                   <td className="p-2 border border-gray-300 text-right">{row.deltaNetRevenue.toFixed(2)}%</td>
                   <td className="p-2 border border-gray-300 text-right">{row.grossProfit.toLocaleString()}</td>
                   <td className="p-2 border border-gray-300 text-right">{row.deltaGrossProfit.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 flex justify-between items-center border-t">
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Page Size:</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
          <span className="text-gray-600">Page:</span>
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {Array.from({ length: Math.ceil(data.length / pageSize) }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
        <button
          onClick={exportTable}
          className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
        >
          Export Table
        </button>
      </div>
    </div>
  );
};

export default MFGTabularView;