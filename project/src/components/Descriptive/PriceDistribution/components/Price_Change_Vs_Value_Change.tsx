import { ScatterChart,Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data : salesChangeData[] = [
  { name: "FRUCTUS", valueChange: 5000, priceChange: 50 },
  { name: "QUALIMAX", valueChange: 2500, priceChange: 0 },
  { name: "MAJA", valueChange: 1000, priceChange: -50 },
  { name: "FRESH", valueChange: 3000, priceChange: 20 },
  { name: "CLIGHT", valueChange: 4000, priceChange: 30 }
];
interface salesChangeData {
  name: string;
  valueChange: number;
  priceChange: number;
}

export function Price_Change_Vs_Value_Change() {
  return (
    <ResponsiveContainer width="100%" height={410}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis 
                  type="number" 
                  dataKey="valueChange" 
                  name="Value Sales Change"
                  label={{ value: "% Change in Value Sales", position: "bottom" }}
                />
                <YAxis 
                  type="number" 
                  dataKey="priceChange" 
                  name="Price Change"
                  label={{ value: "Change in Price Per Unit", angle: -90, position: "left" }}
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter 
                  name="Products" 
                  data={data} 
                  fill="#663399"
                />
              </ScatterChart>
    </ResponsiveContainer>
  );
}




