
import { ScenarioChart } from './components/ScenarioComparision';
import ScenarioTableChart from './components/ScenarioTable';



export function ScenarioSummary() {
  return (
    <div className="space-y-5">
      {/* Filter Info */}
      <div className="text-xs text-gray-600 mb-0 mt-0 leading-tight">
        Year: 2021 | Quarter: All | Month: All | BU: Brazil | Region: All | Channel: All |  
        Manufacturer: All | Category: POWDERED BEVERAGES | (Available Date: 11/30/2020-11/30/2022) |  
        Brand: All | PPG: All
      </div>
  
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Full-width Chart */}
        <div className="lg:col-span-4 bg-white rounded shadow-sm">
          <div className="bg-gray-200 rounded-t p-4">
          <h1 className="text-lg font-semibold mb-2 text-center">Scenario Table</h1>
          </div>
          <div className="p-4 h-[320px] w-full">
            <ScenarioTableChart />
          </div>
        </div>
  
        {/* 3/4 Width Chart */}
        <div className="lg:col-span-4 bg-white rounded shadow-sm">
          <div className="bg-gray-200 rounded-t p-4">
          <h1 className="text-lg font-semibold mb-2 text-center">Scenario Comparision</h1>
          </div>
          <div className="p-4 h-[436px] w-full">
            <ScenarioChart />
          </div>
        </div>
      </div>
    </div>
  );
  
  
}