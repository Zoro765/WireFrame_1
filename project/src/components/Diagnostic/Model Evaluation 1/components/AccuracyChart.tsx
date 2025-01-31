export interface AccuracyData {
  range: string;
  count: number;
}

export function getAccuracyData(): AccuracyData[] {
  return [
    { range: "Great than or equal to 70%", count: 257 },
    { range: "Greater than or equal to 60% and less than 70%", count: 1 },
  ];
}

const AccuracyChart = () => {
  const data = getAccuracyData();

  return (
    <div className="h-64 overflow-auto">
      <table className="w-full">
        <thead className="bg-purple-50">
          <tr>
            <th className="text-left p-3 text-purple-900 font-semibold">Accuracy Percentage Bin</th>
            <th className="text-right p-3 text-purple-900 font-semibold">Number of Models</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-purple-50/50'}>
              <td className="text-left p-3 text-gray-700">{item.range}</td>
              <td className="text-right p-3 font-semibold text-purple-900">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccuracyChart;