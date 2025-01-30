import { KPICard } from './components/KPICard';
import { kpiData } from './data/kpiData';
import { Price_Change_Vs_Value_Change } from './components/Price_Change_Vs_Value_Change';
import { Velocity_Vs_Distribution } from './components/Velocity_Vs_Distribution';
import { Price_Vs_Distribution_Change } from './components/Price_Vs_Distribution_Change';
export function PriceDistribution() {
  return (
    <div className="space-y-6">
       {/* KPI Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpiData.map((kpi, index) => (
                <KPICard key={index} {...kpi} />
              ))}
            </div>

            {/* Filter Info */}
      <div className="text-xs text-gray-600 mb-2">
        Year: 2021 | Quarter: All | Month: All | BU: Brazil | Region: All | Channel: All |
        Manufacturer: All | Category: POWDERED BEVERAGES | (Available Date: 11/30/2020-11/30/2022)
        | Brand: All | PPG: All
      </div>
      
      {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
            <div className="lg:col-span-3 bg-white rounded shadow-sm">
              <div className="bg-gray-200 rounded-t p-4">
                <h2 className="text-sm font-semibold">Price Change Vs Value Sales Change</h2>
              </div>
              <div className="p-4 h-[430px] w-full">
                <Price_Change_Vs_Value_Change />
              </div>
            </div>
      
            <div className="lg:col-span-3 bg-white rounded shadow-sm">
              <div className="bg-gray-200 rounded-t p-4">
                <h2 className="text-sm font-semibold">Velocity Vs Distribution</h2>
              </div>
              <div className="p-4 h-[430px] w-full">
                <Velocity_Vs_Distribution />
              </div>
            </div>
      
            <div className="lg:col-span-6 bg-white rounded shadow-sm">
              <div className="bg-gray-200 rounded-t p-4">
                <h2 className="text-sm font-semibold">Price Vs Distribution Change</h2>
              </div>
              <div className="p-4 h-[320px] w-full">
                <Price_Vs_Distribution_Change />
              </div>
            </div>
          </div>
    </div>
  );
}