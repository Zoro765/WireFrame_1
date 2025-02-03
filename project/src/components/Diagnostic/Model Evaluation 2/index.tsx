import { KPICard } from './components/KPICard';
import { kpiData } from './data/kpiData';
import VolumeDecompositionChart from './components/VolumeDecomposition';
import ActualVsPredictedSalesChart from './components/Actual_Vs_PredictedSales';

export function ModelEvaluation2() {
  return (
    <div className="body-overlay overflow-hidden">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4 space-y-4">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Filter Info */}
      <div className="text-xs text-gray-600 flex justify-between p-4">
        Year: 2021 | Quarter: All | Month: All | BU: Brazil | Region: All | Channel: All |
        Manufacturer: All | Category: POWDERED BEVERAGES | (Available Date: 11/30/2020-11/30/2022)
        | Brand: All | PPG: All
      </div>

      {/* Charts Section */}
      <div className="flex-1 p-4 space-y-4 overflow-hidden">
        {/* Actual Vs Predicted Sales Chart */}
        <div className="bg-white rounded-lg shadow-sm flex flex-col overflow-hidden relative h-full">
          <div className="bg-gray-200 rounded-t-lg p-3">
            <h2 className="text-sm font-semibold">Actual Vs Predicted Sales</h2>
          </div>
          <div className="p-4 w-full">
            <ActualVsPredictedSalesChart />
          </div>
        </div>

        {/* Volume Decomposition Chart */}
        <div className="bg-white rounded-lg shadow-sm flex flex-col overflow-hidden relative h-full">
          <div className="bg-gray-200 rounded-t-lg p-3">
            <h2 className="text-sm font-semibold">Volume Decomposition</h2>
          </div>
          <div className="p-4 w-full">
            <VolumeDecompositionChart />
          </div>
        </div>
      </div>
    </div>
  );
}
