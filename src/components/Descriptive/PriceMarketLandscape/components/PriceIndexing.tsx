import { useState } from 'react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer, Legend
} from 'recharts';

// Sample data for Price Indexing
const indexingData = Array.from({ length: 12 }, (_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  internalPriceIndex: Math.random() * 0.5 + 0.5, // Internal Price Index (Mdlz PPGs)
  externalPriceIndex: Math.random() * 0.3 + 0.7, // External Price Index (External PPGs)
  volumeMarketShare: Math.random() * 10 + 20, // Volume Market Share
}));

export function PriceIndexing() {
  const [showMdlzPPGs, setShowMdlzPPGs] = useState(true); // Toggle for Mdlz PPGs
  const [showExternalPPGs, setShowExternalPPGs] = useState(true); // Toggle for External PPGs

  return (
    <div className="bg-white rounded-sm flex-grow p-4">
      {/* Filter Options */}
      <div className="flex gap-16 mb-4">
        {/* Dropdown for Mdlz PPGs */}
        <label className="flex items-center gap-2">
          <select
            value={showMdlzPPGs ? 'show' : 'hide'}
            onChange={(e) => setShowMdlzPPGs(e.target.value === 'show')}
            className="p-2 border rounded"
          >
            <option value="show" >Show Mdlz PPGs</option>
            <option value="hide" >Hide Mdlz PPGs</option>
          </select>
        </label>

        {/* Dropdown for External PPGs */}
        <label className="flex items-center gap-2">
          <select
            value={showExternalPPGs ? 'show' : 'hide'}
            onChange={(e) => setShowExternalPPGs(e.target.value === 'show')}
            className="p-2 border rounded"
          >
            <option value="show">Show External PPGs</option>
            <option value="hide">Hide External PPGs</option>
          </select>
        </label>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={150}>
        <LineChart
          data={indexingData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          {showMdlzPPGs && (
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="internalPriceIndex"
              name="Mdlz PPGs (Price Index)"
              stroke="#8884d8"
              strokeWidth={2}
            />
          )}
          {showExternalPPGs && (
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="externalPriceIndex"
              name="External PPGs (Price Index)"
              stroke="#82ca9d"
              strokeWidth={2}
            />
          )}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="volumeMarketShare"
            name="Volume Market Share"
            stroke="#ff7300"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}