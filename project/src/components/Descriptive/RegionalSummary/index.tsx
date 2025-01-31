import React from 'react';
import { KPICard } from './components/KPICard';
import { ValueSalesByRegion } from './components/ValueSalesByRegion';
import { ValueSalesByChannel } from './components/ValueSalesByChannel';
import { ValueSalesOverTime } from './components/ValueSalesOverTime';
import { kpiData } from './data/kpiData';

export function RegionalSummary() {
  return (
    <div className="space-y-5">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Filter Info */}
      <div className="text-xs text-gray-600 mb-0 mt-0 leading-tight">
        Year: 2021 | Quarter: All | Month: All | BU: Brazil | Region: All | Channel: All |  
        Manufacturer: All | Category: POWDERED BEVERAGES | (Available Date: 11/30/2020-11/30/2022) |  
        Brand: All | PPG: All
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 ">
      <div className="lg:col-span-3 bg-white rounded shadow-sm">
        <div className="bg-gray-200 rounded-t p-4">
          <h2 className="text-sm font-semibold">Value Sales Performance by Region</h2>
        </div>
        <div className="p-4 h-[430px] w-full">
          <ValueSalesByRegion />
        </div>
      </div>

      <div className="lg:col-span-3 bg-white rounded shadow-sm">
        <div className="bg-gray-200 rounded-t p-4">
          <h2 className="text-sm font-semibold">Value Sales Performance by Channel</h2>
        </div>
        <div className="p-4 h-[430px] w-full">
          <ValueSalesByChannel />
        </div>
      </div>

      <div className="lg:col-span-6 bg-white rounded shadow-sm">
        <div className="bg-gray-200 rounded-t p-4">
          <h2 className="text-sm font-semibold">Value Sales by Region Across Time</h2>
        </div>
        <div className="p-4 h-[320px] w-full">
          <ValueSalesOverTime />
        </div>
      </div>
    </div>
    </div>
  );
}