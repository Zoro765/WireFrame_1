import { BarChart, Bar, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';



// Data for Price Compliance Evolution by PPGs
const priceComplianceData = [
    { ppg: 'TANG181P', avgPrice: 12, strategicPrice: 10, compliance: 80 },
    { ppg: 'TANG191P', avgPrice: 10, strategicPrice: 8, compliance: 60 },
    { ppg: 'FRESH151NA', avgPrice: 5, strategicPrice: 4, compliance: 50 },
    { ppg: 'CLIGHT18NA', avgPrice: 4, strategicPrice: 3, compliance: 30 }
];

export function PriceComplianceChart() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={priceComplianceData} margin={{ top: 5, right: 10, left: 15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ppg" tick={{ fontSize: 12 }} />
                <YAxis 
                yAxisId="left" 
                label={{ 
                    value: "Price (R$)", 
                    angle: -90, 
                    position: "insideLeft",
                    dx: 0, // Move label further to the left
                    dy: 50,   // Adjust vertical alignment if needed
                     }} />
                <YAxis 
                yAxisId="right" 
                orientation="right" 
                label={{ 
                    value: "Price Compliance (%)", 
                    angle: -90, 
                    position: "insideRight",
                    dx: -10, // Move label further to the left
                    dy: -80,   // Adjust vertical alignment if needed
                     }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="avgPrice" name="Avg Price Per Unit" fill="#6B46C1" barSize={30} />
                <Bar yAxisId="left" dataKey="strategicPrice" name="Strategic Price Per Unit" fill="#8B5CF6" barSize={30} />
                <Scatter yAxisId="right" dataKey="compliance" name="Price Compliance" fill="#FF7300" />
            </ComposedChart>
        </ResponsiveContainer>
    );
}