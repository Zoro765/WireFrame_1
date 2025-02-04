import React from 'react';

const ScenarioTableChart: React.FC = () => {
  const headers = [
    'Scenario Name',
    'Scenario Creation Date',
    'Scenario Type',
    'Comments',
    'Optimization KPI',
    'Scenario Status',
    'Optimization Status',
    'Task Assigned To',
    'CFT Approval Status',
    'SD Approval Status',
    'Scenario BU',
    'Scenario Region',
    'Scenario Category',
    '% Delta Avg Price',
    '% Delta Sell Out Value',
    '% Delta Sell Out Volume',
    '% Delta Sell Out Units',
  ];

  const sampleData = [
    {
      scenarioName: '3% IncreaseMDLZ_Refresh_Are...',
      creationDate: '3/30/2023',
      type: 'Simulation',
      comments: 'Null',
      optimizationKpi: 'Null',
      status: 'Output Saved',
      optimizationStatus: '-',
      taskAssignedTo: 'Unassigned',
      cftStatus: 'Null',
      sdStatus: 'Null',
      bu: 'Brazil',
      region: 'AREA I',
      category: 'POWDERED BEV...',
      deltaPrice: '2.08%',
      deltaValue: '0.21%',
      deltaVolume: '-1.96%',
      deltaUnits: '-1.83%',
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-[#4a235a] text-white">
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-2 text-left text-sm font-medium"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sampleData.map((row, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="px-4 py-2 text-sm">{row.scenarioName}</td>
              <td className="px-4 py-2 text-sm">{row.creationDate}</td>
              <td className="px-4 py-2 text-sm">{row.type}</td>
              <td className="px-4 py-2 text-sm">{row.comments}</td>
              <td className="px-4 py-2 text-sm">{row.optimizationKpi}</td>
              <td className="px-4 py-2 text-sm">{row.status}</td>
              <td className="px-4 py-2 text-sm">{row.optimizationStatus}</td>
              <td className="px-4 py-2 text-sm">{row.taskAssignedTo}</td>
              <td className="px-4 py-2 text-sm">{row.cftStatus}</td>
              <td className="px-4 py-2 text-sm">{row.sdStatus}</td>
              <td className="px-4 py-2 text-sm">{row.bu}</td>
              <td className="px-4 py-2 text-sm">{row.region}</td>
              <td className="px-4 py-2 text-sm">{row.category}</td>
              <td className="px-4 py-2 text-sm text-green-600">
                {row.deltaPrice}
              </td>
              <td className="px-4 py-2 text-sm text-green-600">
                {row.deltaValue}
              </td>
              <td className="px-4 py-2 text-sm text-red-600">
                {row.deltaVolume}
              </td>
              <td className="px-4 py-2 text-sm text-red-600">{row.deltaUnits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScenarioTableChart;