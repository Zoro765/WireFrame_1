import { useState } from 'react';

const CustomerTabularView = () => {
  const data = [
    {
      id: 1,
      scenarioName: "3% increase",
      scenarioType: "Simulation",
      scenarioCategory: "POWDERED",
      channelPricing: "ASSAI",
      familiaPricing: "CLIGHT",
      state: "MG",
      chave: "ASSAI/Cligh",
      pesoCx: 0.0160,
      ybpo: 1.8816,
      yista: 0.0000,
      ybda: 0.0000,
      ybdbNew: 0.5156,
      precoLista: 2.3670,
      descontoTotal: 0.6417,
      netSales: 1.6076,
      precoProdutos: 2.0414,
      taxOnInvoice: 0.4338,
      precoNf: 2.0414,
      sellinGm1: -0.0772,
      sellinGm2: -0.0660,
      sellinGm3: 0.1
    },
    {
      id: 2,
      scenarioName: "3% increase",
      scenarioType: "Simulation",
      scenarioCategory: "POWDERED",
      channelPricing: "ASSAI",
      familiaPricing: "FRESH PL",
      state: "MG",
      chave: "ASSAI/Fresh",
      pesoCx: 0.0150,
      ybpo: 0.6077,
      yista: 0.0000,
      ybda: 0.0000,
      ybdbNew: 0.2793,
      precoLista: 0.7773,
      descontoTotal: 0.0285,
      netSales: 0.7630,
      precoProdutos: 0.9639,
      taxOnInvoice: 0.2048,
      precoNf: 0.9639,
      sellinGm1: -0.1584,
      sellinGm2: -0.0924,
      sellinGm3: 0.2
    },
    {
      id: 3,
      scenarioName: "3% increase",
      scenarioType: "Simulation",
      scenarioCategory: "POWDERED",
      channelPricing: "ASSAI",
      familiaPricing: "FRESH PL",
      state: "MG",
      chave: "ASSAI/Fresh",
      pesoCx: 0.0150,
      ybpo: 0.6077,
      yista: 0.0000,
      ybda: 0.0000,
      ybdbNew: 0.2793,
      precoLista: 0.7773,
      descontoTotal: 0.0285,
      netSales: 0.7630,
      precoProdutos: 0.9639,
      taxOnInvoice: 0.2048,
      precoNf: 0.9639,
      sellinGm1: -0.1584,
      sellinGm2: -0.0924,
      sellinGm3: 0.2
    },
    {
      id: 4,
      scenarioName: "3% increase",
      scenarioType: "Simulation",
      scenarioCategory: "POWDERED",
      channelPricing: "ASSAI",
      familiaPricing: "FRESH PL",
      state: "MG",
      chave: "ASSAI/Fresh",
      pesoCx: 0.0150,
      ybpo: 0.6077,
      yista: 0.0000,
      ybda: 0.0000,
      ybdbNew: 0.2793,
      precoLista: 0.7773,
      descontoTotal: 0.0285,
      netSales: 0.7630,
      precoProdutos: 0.9639,
      taxOnInvoice: 0.2048,
      precoNf: 0.9639,
      sellinGm1: -0.1584,
      sellinGm2: -0.0924,
      sellinGm3: 0.2
    },
    {
      id: 5,
      scenarioName: "3% increase",
      scenarioType: "Simulation",
      scenarioCategory: "POWDERED",
      channelPricing: "ASSAI",
      familiaPricing: "FRESH PL",
      state: "MG",
      chave: "ASSAI/Fresh",
      pesoCx: 0.0150,
      ybpo: 0.6077,
      yista: 0.0000,
      ybda: 0.0000,
      ybdbNew: 0.2793,
      precoLista: 0.7773,
      descontoTotal: 0.0285,
      netSales: 0.7630,
      precoProdutos: 0.9639,
      taxOnInvoice: 0.2048,
      precoNf: 0.9639,
      sellinGm1: -0.1584,
      sellinGm2: -0.0924,
      sellinGm3: 0.2
    },
    {
      id: 6,
      scenarioName: "3% increase",
      scenarioType: "Simulation",
      scenarioCategory: "POWDERED",
      channelPricing: "ASSAI",
      familiaPricing: "FRESH PL",
      state: "MG",
      chave: "ASSAI/Fresh",
      pesoCx: 0.0150,
      ybpo: 0.6077,
      yista: 0.0000,
      ybda: 0.0000,
      ybdbNew: 0.2793,
      precoLista: 0.7773,
      descontoTotal: 0.0285,
      netSales: 0.7630,
      precoProdutos: 0.9639,
      taxOnInvoice: 0.2048,
      precoNf: 0.9639,
      sellinGm1: -0.1584,
      sellinGm2: -0.0924,
      sellinGm3: 0.2
    },
  
    

    // Add more sample data entries following the same pattern
  ];

  const [pageSize, setPageSize] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  const exportTable = () => {
    const headers = [
      'Sr. No', 'Scenario Name', 'Scenario Type', 'Scenario Category', 
      'Channel Pricing', 'Familia Pricing', 'State', 'Chave', 
      'PESO CX(Kg)', 'Ybpo', 'Yista', 'Ybda', 'YBDB NEW', 
      'Preco Lista', 'Desconto Total', 'Net Sales', 'Preco Produtos',
      'Tax on Invoice', 'Preco NF', 'Sellin GM1', 'Sellin GM2', 'Sellin GM3'
    ];

    const csvContent = [
      headers.join(','),
      ...data.map((row, index) => [
        index + 1,
        row.scenarioName,
        row.scenarioType,
        row.scenarioCategory,
        row.channelPricing,
        row.familiaPricing,
        row.state,
        row.chave,
        row.pesoCx,
        row.ybpo,
        row.yista,
        row.ybda,
        row.ybdbNew,
        row.precoLista,
        row.descontoTotal,
        row.netSales,
        row.precoProdutos,
        row.taxOnInvoice,
        row.precoNf,
        row.sellinGm1,
        row.sellinGm2,
        row.sellinGm3
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pricing-table.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full rounded-lg shadow-lg bg-white">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-purple-300 ">
              <th className="p-2 border border-gray-300 text-left sticky left-0 bg-purple-300">Sr. No</th>
              <th className="p-2 border border-gray-300 text-left">Scenario Name</th>
              <th className="p-2 border border-gray-300 text-left">Scenario Type</th>
              <th className="p-2 border border-gray-300 text-left">Scenario Category</th>
              <th className="p-2 border border-gray-300 text-left">Channel Pricing</th>
              <th className="p-2 border border-gray-300 text-left">Familia Pricing</th>
              <th className="p-2 border border-gray-300 text-left">State</th>
              <th className="p-2 border border-gray-300 text-left">Chave</th>
              <th className="p-2 border border-gray-300 text-right">PESO CX(Kg)</th>
              <th className="p-2 border border-gray-300 text-right">Ybpo</th>
              <th className="p-2 border border-gray-300 text-right">Yista</th>
              <th className="p-2 border border-gray-300 text-right">Ybda</th>
              <th className="p-2 border border-gray-300 text-right">YBDB NEW</th>
              <th className="p-2 border border-gray-300 text-right">Preco Lista</th>
              <th className="p-2 border border-gray-300 text-right">Desconto Total</th>
              <th className="p-2 border border-gray-300 text-right">Net Sales</th>
              <th className="p-2 border border-gray-300 text-right">Preco Produtos</th>
              <th className="p-2 border border-gray-300 text-right">Tax on Invoice</th>
              <th className="p-2 border border-gray-300 text-right">Preco NF</th>
              <th className="p-2 border border-gray-300 text-right">Sellin GM1</th>
              <th className="p-2 border border-gray-300 text-right">Sellin GM2</th>
              <th className="p-2 border border-gray-300 text-right">Sellin GM3</th>
            </tr>
          </thead>
          <tbody>
            {data.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((row, index) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="p-2 border border-gray-300 sticky left-0 bg-white">{index + 1}</td>
                <td className="p-2 border border-gray-300">{row.scenarioName}</td>
                <td className="p-2 border border-gray-300">{row.scenarioType}</td>
                <td className="p-2 border border-gray-300">{row.scenarioCategory}</td>
                <td className="p-2 border border-gray-300">{row.channelPricing}</td>
                <td className="p-2 border border-gray-300">{row.familiaPricing}</td>
                <td className="p-2 border border-gray-300">{row.state}</td>
                <td className="p-2 border border-gray-300">{row.chave}</td>
                <td className="p-2 border border-gray-300 text-right">{row.pesoCx.toFixed(4)}</td>
                <td className="p-2 border border-gray-300 text-right">{row.ybpo.toFixed(4)}</td>
                <td className="p-2 border border-gray-300 text-right">{row.yista.toFixed(4)}</td>
                <td className="p-2 border border-gray-300 text-right">{row.ybda.toFixed(4)}</td>
                <td className="p-2 border border-gray-300 text-right">{row.ybdbNew.toFixed(4)}</td>
                <td className="p-2 border border-gray-300 text-right">{row.precoLista.toFixed(4)}</td>
                <td className="p-2 border border-gray-300 text-right">{row.descontoTotal.toFixed(4)}</td>
                <td className="p-2 border border-gray-300 text-right">{row.netSales.toFixed(4)}</td>
                <td className="p-2 border border-gray-300 text-right">{row.precoProdutos.toFixed(4)}</td>
                <td className="p-2 border border-gray-300 text-right">{row.taxOnInvoice.toFixed(4)}</td>
                <td className="p-2 border border-gray-300 text-right">{row.precoNf.toFixed(4)}</td>
                <td className="p-2 border border-gray-300 text-right">{row.sellinGm1.toFixed(4)}</td>
                <td className="p-2 border border-gray-300 text-right">{row.sellinGm2.toFixed(4)}</td>
                <td className="p-2 border border-gray-300 text-right">{row.sellinGm3.toFixed(4)}</td>
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

export default CustomerTabularView;