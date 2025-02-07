import React from 'react';

export const OptimizationConstraints: React.FC = () => {
  return (
    <div className="p-6 bg-white">
      <div className="space-y-4">
        {/* KPI and Scenario Name Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-base mb-1">Optimization KPI:</label>
            <select className="w-full p-2 border rounded">
              <option>Select KPI...</option>
            </select>
          </div>
          <div>
            <label className="block text-base mb-1">Comment</label>
            <textarea 
              className="w-full p-2 border rounded"
              placeholder="Insert your comment"
            />
          </div>
        </div>

        <div>
          <label className="block text-base mb-1">Enter Optimization Scenario Name:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter Scenario Name"
          />
        </div>

        {/* Stop Loss Controls */}
        <div>
          <label className="block text-base mb-1">Stop Loss Constraints Considered?</label>
          <select className="w-40 p-2 border rounded">
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        {/* Market Share and Metrics Tables */}
        <div className="grid grid-cols-4 gap-4">
          {/* Market Share Stoploss Table */}
          <div className="col-span-1">
            <div className="border rounded">
              <div className="bg-purple-50 p-2 border-b">
                <h3 className="text-purple-700">Market Share Stoploss</h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 w-2/3">Metric</th>
                    <th className="text-left p-2 w-1/3">Stoploss</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">
                      <select className="w-full p-2 border rounded">
                        <option>Market share by value</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value="0"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Metrics Table */}
          <div className="col-span-3">
            <div className="overflow-x-auto border rounded h-[142px]">
              <table className="w-full h-[142px]">
                <thead className="bg-purple-50 p-2 border-b">
                  <tr>
                    <th className="p-2 border text-center text-purple-700 font-medium">Sell-out Volume<br/>Stoploss</th>
                    <th className="p-2 border text-center text-purple-700 font-medium">Sell-out Units<br/>Stoploss</th>
                    <th className="p-2 border text-center text-purple-700 font-medium">Sell-out Value<br/>Stoploss</th>
                    <th className="p-2 border text-center text-purple-700 font-medium">Sell-in Volume<br/>Stoploss</th>
                    <th className="p-2 border text-center text-purple-700 font-medium">Sell-in Units<br/>Stoploss</th>
                    <th className="p-2 border text-center text-purple-700 font-medium">Net Revenue<br/>Stoploss</th>
                    <th className="p-2 border text-center text-purple-700 font-medium">Gross Profit<br/>Stoploss</th>
                    <th className="p-2 border text-center text-purple-700 font-medium">Net Revenue/KG<br/>Stoploss</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border"><input type="number" className="w-full p-1 border rounded" value="10" /></td>
                    <td className="p-2 border"><input type="number" className="w-full p-1 border rounded" value="10" /></td>
                    <td className="p-2 border"><input type="number" className="w-full p-1 border rounded" value="10" /></td>
                    <td className="p-2 border"><input type="number" className="w-full p-1 border rounded" value="10" /></td>
                    <td className="p-2 border"><input type="number" className="w-full p-1 border rounded" value="10" /></td>
                    <td className="p-2 border"><input type="number" className="w-full p-1 border rounded" value="10" /></td>
                    <td className="p-2 border"><input type="number" className="w-full p-1 border rounded" value="10" /></td>
                    <td className="p-2 border"><input type="number" className="w-full p-1 border rounded" value="10" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Ending Price Rules */}
        <div>
          <label className="block text-base mb-2">Ending price Rule:</label>
          <div className="flex gap-2">
            <button className="px-4 py-1 border rounded hover:bg-purple-50">0.00</button>
            <button className="px-4 py-1 border rounded hover:bg-purple-50">0.05</button>
            <button className="px-4 py-1 border rounded hover:bg-purple-50">0.09</button>
            <button className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-md text-base transition-colors">NONE</button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6 pt-2 pb-0">
          <button className="px-6 py-2 border rounded text-purple-700 hover:bg-purple-100 transition-colors">
            Cancel
          </button>
          <button className="px-6 py-2 border rounded text-purple-700 hover:bg-purple-100 transition-colors">
            Reset and Back
          </button>
          <button className="px-6 py-2 border rounded text-purple-700 hover:bg-purple-100 transition-colors">
            Reset Current Inputs
          </button>
          <button className="px-6 py-2 border rounded text-purple-700 hover:bg-purple-100 transition-colors">
            Optimize
          </button>
        </div>
      </div>
    </div>
  );
};


