export interface MAPEData {
  range: string;
  count: number;
}

export function getMAPEData(): MAPEData[] {
  return [
    { range: "Greater than 25%", count: 3 },
    { range: "Lesser than or equal to 25% and greater than 20%", count: 3 },
    { range: "Lesser than or equal to 20% and greater than 15%", count: 7 },
    { range: "Less than or equal to 15%", count: 245 },
  ];
}

const MAPEChart = () => {
  const data = getMAPEData();
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="h-64 overflow-auto">
      <table className="w-full">
        <thead className="bg-purple-50">
          <tr>
            <th className="text-left p-3 text-purple-900 font-semibold">MAPE Range</th>
            <th className="text-right p-3 text-purple-900 font-semibold">No of Models</th>
            <th className="text-right p-3 text-purple-900 font-semibold">Distribution</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-purple-50/50'}>
              <td className="text-left p-3 text-gray-700">{item.range}</td>
              <td className="text-right p-3 font-semibold text-purple-900">{item.count}</td>
              <td className="text-right p-3">
                <div className="flex items-center justify-end gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${(item.count / total) * 100}%` }}
                    />
                  </div>
                  <span className="font-semibold text-purple-900">
                    {((item.count / total) * 100).toFixed(1)}%
                  </span>
                </div>
              </td>
            </tr>
          ))}
          <tr className="bg-purple-100">
            <td className="text-left p-3 font-semibold text-purple-900">Total</td>
            <td className="text-right p-3 font-semibold text-purple-900">{total}</td>
            <td className="text-right p-3 font-semibold text-purple-900">100%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MAPEChart;