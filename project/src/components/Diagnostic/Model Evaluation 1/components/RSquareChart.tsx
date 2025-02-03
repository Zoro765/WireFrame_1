export interface RSquareData {
  range: string;
  count: number;
}

export function getRSquareData(): RSquareData[] {
  return [
    { range: "Great than or equal to 70%", count: 199 },
    { range: "Greater than or equal to 50% and less than 60%", count: 20 },
    { range: "Greater than or equal to 60% and less than 70%", count: 25 },
    { range: "Less than 50%", count: 14 },
  ];
}

const RSquareChart = () => {
  const data = getRSquareData();
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="h-64"> {/* Removed overflow-auto */}
      <table className="w-full">
        <thead className="bg-purple-50">
          <tr>
            <th className="text-left p-3 text-purple-900 font-semibold">R Square Percentage Bin</th>
            <th className="text-right p-3 text-purple-900 font-semibold">Count</th>
            <th className="text-right p-3 text-purple-900 font-semibold">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-purple-50/50'}>
              <td className="text-left p-3 text-gray-700">{item.range}</td>
              <td className="text-right p-3 font-semibold text-purple-900">{item.count}</td>
              <td className="text-right p-3 font-semibold text-purple-900">
                {((item.count / total) * 100).toFixed(1)}%
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

export default RSquareChart;