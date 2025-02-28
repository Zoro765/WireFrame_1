import {
  LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend, ResponsiveContainer} from 'recharts';

const PricingMetricsChart = () => {
  
  const data = [
    { price: 0.90, grossProfit: 48000, netRevenue: 45000, sellOutVolume: 27000, sellOutValue: 26000 },
    { price: 0.95, grossProfit: 46000, netRevenue: 44000, sellOutVolume: 26000, sellOutValue: 25500 },
    { price: 1.00, grossProfit: 44000, netRevenue: 43000, sellOutVolume: 25000, sellOutValue: 25000 },
    { price: 1.10, grossProfit: 42000, netRevenue: 42000, sellOutVolume: 24000, sellOutValue: 24500 },
    { price: 1.20, grossProfit: 40000, netRevenue: 41000, sellOutVolume: 23000, sellOutValue: 24000 },
    { price: 1.30, grossProfit: 38000, netRevenue: 40000, sellOutVolume: 22000, sellOutValue: 23500 },
    { price: 1.40, grossProfit: 36000, netRevenue: 39000, sellOutVolume: 21000, sellOutValue: 23000 },
    { price: 1.50, grossProfit: 34000, netRevenue: 38000, sellOutVolume: 20000, sellOutValue: 22500 },
    { price: 1.60, grossProfit: 32000, netRevenue: 37000, sellOutVolume: 19000, sellOutValue: 22000 },
    { price: 1.70, grossProfit: 30000, netRevenue: 36000, sellOutVolume: 18000, sellOutValue: 21500 },
    { price: 1.75, grossProfit: 28000, netRevenue: 35000, sellOutVolume: 17000, sellOutValue: 21000 }
  ];

  return (
    <div className="w-full h-96 mt-6 mb-6 ">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 80, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="price" 
            label={{ 
              value: 'Avg Price Per Unit Simulated', 
              
              position: 'bottom',
              offset: 20,
              style: { fontSize: '14px' }
            }}
            tickFormatter={(value) => `R$${value.toFixed(2)}`}
          />
          <YAxis
            yAxisId="left"
            label={{ 
              value: 'Value',
              angle: -90,
              position: 'insideLeft',
              offset: -15,
              style: { fontSize: '14px' }
            }}
            tickFormatter={(value) => `R$${(value/1000).toFixed(1)}K`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ 
              value: 'Sell Out Volume Simulated',
              angle: 90,
              position: 'insideRight',
              offset: -20,
              style: { fontSize: '14px' }
            }}
            tickFormatter={(value) => `R$${(value/1000).toFixed(1)}K`}
          />
          <Tooltip 
            formatter={(value, name) => [value, name]}
            labelFormatter={(label) => `R$${label.toFixed(2)}`}
          />
          <Legend mt-4 verticalAlign="bottom" align="center"/>
          <Line
            yAxisId="left" type="monotone" dataKey="grossProfit" name="Gross Profit Simulated" stroke="#663399" dot={false}
          />
          <Line
            yAxisId="left" type="monotone" dataKey="netRevenue" name="Net Revenue Simulated" stroke="#ff8c00" dot={false}
          />
          <Line
            yAxisId="right" type="monotone" dataKey="sellOutVolume" name="Sell Out Volume Simulated" stroke="#8b4513" dot={false}
          />
          <Line
            yAxisId="left" type="monotone" dataKey="sellOutValue" name="Sell Out Value Simulated" stroke="#228b22" dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PricingMetricsChart;