import { Bar,  Line,  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';

// Data for Value Sales over Time & Avg Price Per Unit
const valueSalesData = [
    { month: 'Jan', sales: 28000000, price: 1.00 },
    { month: 'Feb', sales: 29000000, price: 1.01 },
    { month: 'Mar', sales: 29500000, price: 1.02 },
    { month: 'Apr', sales: 23000000, price: 1.03 },
    { month: 'May', sales: 21000000, price: 1.02 },
    { month: 'Jun', sales: 20000000, price: 1.01 },
    { month: 'Jul', sales: 19000000, price: 1.00 },
    { month: 'Aug', sales: 19500000, price: 1.01 },
    { month: 'Sep', sales: 20000000, price: 1.02 },
    { month: 'Oct', sales: 22000000, price: 1.03 },
    { month: 'Nov', sales: 23000000, price: 1.04 },
    { month: 'Dec', sales: 24000000, price: 1.05 }
];

export function ValueSalesChart() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={valueSalesData} margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis 
                yAxisId="left" 
                tickFormatter={(value) => `${value / 1000000}M`} 
                label={{ 
                    value: "KPI (Millions)", 
                    angle: -90, 
                    position: "insideLeft", 
                    dx: -10, // Move label further to the left
                    dy: 50,   // Adjust vertical alignment if needed
                    }} />
                <YAxis yAxisId="right" 
                orientation="right" 
                label={{ 
                    value: "Avg Price Per Unit", 
                    angle: -90, 
                    position: "insideRight",
                    dx: -10, // Move label further to the left
                    dy: -55,   // Adjust vertical alignment if needed
                     }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="sales" name="Value Sales" fill="#6B46C1" barSize={30} />
                <Line yAxisId="right" type="monotone" dataKey="price" name="Avg Price Per Unit" stroke="#1A4066" strokeWidth={2} />
            </ComposedChart>
        </ResponsiveContainer>
    );
}