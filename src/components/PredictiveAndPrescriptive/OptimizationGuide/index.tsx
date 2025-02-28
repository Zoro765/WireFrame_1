import PricingMetricsChart from './components/PPSMO';
import OptimizationFrontier from './components/OOF';
import OptimizationFrontierExample from './components/OOFE';

export function OptimizationGuide() {
  return (
    <div className="space-y-6 overflow-hidden">
       {/* Filter Info */}
      <div className="text-xs text-gray-600 mb-2">
        Year: 2021 | Quarter: All | Month: All | BU: Brazil | Region: All | Channel: All |
        Manufacturer: All | Category: POWDERED BEVERAGES | (Available Date: 11/30/2020-11/30/2022)
        | Brand: All | PPG: All


        {/* Gap between filter section and charts */}
        <div className="mt-3"></div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-4  ">
          {/* Predicted Pricing and Sales Metrics for Optimization */}
        <div className="lg:col-span-3 bg-white rounded shadow-sm">
          <div className="bg-gray-200 rounded-t p-2">
            <h2 className="text-sm font-bold">Predicted Pricing and Sales Metrics for Optimization</h2>
          </div>
          <div className="p-4 h-78 w-full">
            <PricingMetricsChart />
          </div>
        </div>
      </div>

       {/* Gap between top and bottom charts */}
       <div className="mt-6"></div>

      {/* Bottom Charts Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Optimization Opportunity Frontier Example */}
        <div className="bg-white rounded shadow-sm">
          <div className="bg-gray-200 rounded-t p-2">
            <h2 className="text-sm font-bold">Optimization Opportunity Frontier Example</h2>
          </div>
          <div className="p-4 h-78 w-full">
            <OptimizationFrontierExample />
          </div>
        </div>

        {/* Optimization Opportunity Frontier */}
        <div className="bg-white rounded shadow-sm">
          <div className="bg-gray-200 rounded-t p-2">
            <h2 className="text-sm font-bold">Optimization Opportunity Frontier</h2>
          </div>
          <div className="p-4 h-78 w-full">
            <OptimizationFrontier />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}