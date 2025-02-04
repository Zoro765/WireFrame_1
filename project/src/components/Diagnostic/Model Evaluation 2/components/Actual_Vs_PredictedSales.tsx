import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export interface ActualVsPredictedSalesData {
  month: string;
  actualVolume: number;
  predicted: number;
  avgPricePerUnit: number;
}

const actualData = [23000000, 22800000, 22500000, 21000000, 19500000, 18000000, 17500000, 17200000, 18500000, 20000000, 21500000, 22000000];
const predictedData = [23200000, 22900000, 22600000, 21200000, 19700000, 18200000, 17700000, 17400000, 18700000, 20200000, 21700000, 22200000];

export function getActualVsPredictedSalesData(): ActualVsPredictedSalesData[] {
  return [
    { month: 'Jan', actualVolume: 23000000, predicted: 23200000, avgPricePerUnit: 1.00 },
    { month: 'Feb', actualVolume: 22800000, predicted: 22900000, avgPricePerUnit: 0.98 },
    { month: 'Mar', actualVolume: 22500000, predicted: 22600000, avgPricePerUnit: 0.95 },
    { month: 'Apr', actualVolume: 21000000, predicted: 21200000, avgPricePerUnit: 0.90 },
    { month: 'May', actualVolume: 19500000, predicted: 19700000, avgPricePerUnit: 0.85 },
    { month: 'Jun', actualVolume: 18000000, predicted: 18200000, avgPricePerUnit: 0.80 },
    { month: 'Jul', actualVolume: 17500000, predicted: 17700000, avgPricePerUnit: 0.78 },
    { month: 'Aug', actualVolume: 17200000, predicted: 17400000, avgPricePerUnit: 0.76 },
    { month: 'Sep', actualVolume: 18500000, predicted: 18700000, avgPricePerUnit: 0.79 },
    { month: 'Oct', actualVolume: 20000000, predicted: 20200000, avgPricePerUnit: 0.82 },
    { month: 'Nov', actualVolume: 21500000, predicted: 21700000, avgPricePerUnit: 0.88 },
    { month: 'Dec', actualVolume: 22000000, predicted: 22200000, avgPricePerUnit: 0.92 },
  ];
}

const ActualVsPredictedSalesChart = () => {
  const data = getActualVsPredictedSalesData();
  
  const maxValue = useMemo(() => Math.max(...actualData, ...predictedData), [actualData, predictedData]);

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h2 className="text-base font-semibold mb-4 text-gray-900">Actual Vs Predicted Sales</h2>
      <div className="h-[270px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              yAxisId="left"
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickFormatter={(value) => `${(value / 1_000_000).toFixed(1)}M`}
              label={{
                value: "Volume (Millions)",
                angle: -90,
                position: "insideLeft",
                style: { fill: "#6b7280", fontSize: 12 },
                dx:-5,
                dy:40
              }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickFormatter={(value) => `R$${value.toFixed(2)}`}
              label={{
                value: "Avg Price Per Unit (R$)",
                angle: -90,
                position: "insideRight",
                style: { fill: "#6b7280", fontSize: 12 },
                dx:20,
                dy:-60
              }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
              }}
              formatter={(value: any) => value.toLocaleString()}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="circle"
              wrapperStyle={{
                paddingBottom: '20px',
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="actualVolume"
              name="Actual Volume"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="predicted"
              name="Predicted"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="avgPricePerUnit"
              name="Avg Price Per Unit"
              stroke="#eab308"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActualVsPredictedSalesChart;
