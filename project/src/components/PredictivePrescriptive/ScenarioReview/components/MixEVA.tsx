import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell 
  } from 'recharts';
  
  const productMixData = [
    { name: 'TANG', base: 100, scenario: 100 }
  ];
  
  const decompositionEVAData = [
    { metric: 'Gross_Revenue', volumeNegative: -20000, volumePositive: 0, price: 24000, scenario: 0, percentChange: -0.5 },
    { metric: 'Net_Revenue', volumeNegative: -20000, volumePositive: 0, price: 24000, scenario: 0, percentChange: -0.5 },
    { metric: 'Gross_Profit', volumeNegative: -10000, volumePositive: 0, price: 15000, scenario: 0, percentChange: 2.0 },
    { metric: 'Sell_in_Units', volumeNegative: 0, volumePositive: 0, price: 0, scenario: 390000, percentChange: -2.0 },
    { metric: 'Sell_in_Volume', volumeNegative: 0, volumePositive: 0, price: 0, scenario: 0, percentChange: -2.0 }
  ];
  
  export function ProductMixChart() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={productMixData} layout="vertical">
          {/* Removed CartesianGrid */}
          <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} tickCount={5}  />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="base" fill="#724E8D" name="Base Volume Mix %" barSize={40} />
          <Bar dataKey="scenario" fill="#2D6EAA" name="Scenario Volume Mix %" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  
  export function DecompositionEVAChart() {
    return (
      <div className="w-full h-full">
        <div className="flex h-full">
          {/* Volume Change Chart */}
          <div className="w-1/4 border-r border-gray-300">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={decompositionEVAData} layout="vertical" margin={{ top: 5, right: 10, left: 60, bottom: 5 }}>
                
                <XAxis type="number" domain={[-30000, 0]} tickFormatter={(value) => `${Math.abs(value/1000)}k`} tickCount={6} />
                <YAxis type="category" dataKey="metric" interval={0} />
                <Tooltip />
                <Legend wrapperStyle={{ bottom: -10 }} />
                <Bar dataKey="volumeNegative" fill="#808080" name="Change due to Volume" barSize={20}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
  
          {/* Price Change Chart */}
          <div className="w-1/4 border-r border-gray-300">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={decompositionEVAData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                
                <XAxis type="number" domain={[0, 25000]} tickFormatter={(value) => `${value/1000}k`} tickCount={6} />
                <YAxis type="category" dataKey="metric" interval={0} hide />
                <Tooltip />
                <Legend wrapperStyle={{ bottom: -10 }} />
                <Bar dataKey="price" fill="#4682B4" name="Change due to Price" barSize={20}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
  
          {/* Selected Scenario Chart */}
          <div className="w-1/4 border-r border-gray-300">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={decompositionEVAData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                
                <XAxis type="number" domain={[0, 400000]} tickFormatter={(value) => `${value/1000}k`} tickCount={8} />
                <YAxis type="category" dataKey="metric" interval={0} hide />
                <Tooltip />
                <Legend wrapperStyle={{ bottom: -10 }} />
                <Bar dataKey="scenario" fill="#4682B4" name="Selected Scenario" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
  
          {/* Percent Change Chart */}
          <div className="w-1/4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={decompositionEVAData} layout="vertical" margin={{ top: 5, right: 30, left: 25, bottom: 5 }}>
                
                <XAxis type="number" domain={[-3, 2]} tickFormatter={(value) => `${value.toFixed(2)}%`} tickCount={6} />
                <YAxis type="category" dataKey="metric" interval={0} hide />
                <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                <Legend wrapperStyle={{ bottom: -10 }} />
                <Bar dataKey="percentChange" name="% Change of Scenario vs Base" barSize={20}>
                  {decompositionEVAData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.percentChange < 0 ? '#808080' : '#4682B4'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
  