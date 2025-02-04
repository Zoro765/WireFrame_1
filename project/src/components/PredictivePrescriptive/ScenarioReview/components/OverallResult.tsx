import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

const summaryChangesData = [
  { name: 'Base', SelloutVolume: 25317841, NetRevenue: 102459692, GrossProfit: 46003834 },
  { name: 'Scenario', SelloutVolume: 24609741, NetRevenue: 102590333, GrossProfit: 47729158 },
];

const data = [
  { name: 'Increased Products', value: 1.00 }
];


const COLORS = ['#287819'];

export function SummaryChangesChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={summaryChangesData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `${value / 1000000}M`} 
          label={{
            value: "Value",
            angle: -90,
            position: "outsideLeft", // Keeps the label outside the axis ticks
            dx: -30, // Move label further to the left
            dy: 1,   // Adjust vertical alignment if needed
          }}
          />
        <Tooltip />
        <Legend />
        <Bar dataKey="SelloutVolume" fill="#724E8D" name="Sellout Volume" />
        <Bar dataKey="NetRevenue" fill="#2D6EAA" name="Net Revenue" />
        <Bar dataKey="GrossProfit" fill="#917865" name="Gross Profit" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CountProductsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={140} // Creates the donut effect
          outerRadius={190}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize={16} fontWeight="semibold">
          Increased Products 1 (100%)
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
}

const priceIndexingData = [
  { name: 'TANG', base: 1.26, scenario: 1.30 }
];

export function PriceIndexingChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={priceIndexingData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} domain={[0, 1.4]} tickFormatter={(value) => `R$${value.toFixed(2)}`} 
        label={{
        value: "Value",
        angle: -90,
        position: "outsideLeft", // Keeps the label outside the axis ticks
        dx: -30, // Move label further to the left
        dy: 1,   // Adjust vertical alignment if needed
        }}
          />
        <Tooltip formatter={(value) => `R$${value.toFixed(2)}`} />
        <Legend />
        <Bar dataKey="base" name="Avg Price Per Unit Base" fill="#81A8CC" barSize={200}>
          <LabelList dataKey="base" position="top" formatter={(value) => `R$${value.toFixed(2)}`} />
        </Bar>
        <Bar dataKey="scenario" name="Avg Price Per Unit Scenario" fill="#4F2170" barSize={200}>
          <LabelList dataKey="scenario" position="top" formatter={(value) => `R$${value.toFixed(2)}`} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
