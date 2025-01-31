import React from 'react';
import { KPICard } from './components/KPICard';
import { kpiData } from './data/kpiData';
import AccuracyChart from './components/AccuracyChart';
import MAPEChart from './components/MAPEChart';
import RSquareChart from './components/RSquareChart';

export function ModelEvaluation1() {
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
        {/* Accuracy Chart */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm">
          <div className="bg-gray-200 rounded-t-lg p-4">
            <h2 className="text-sm font-semibold">Accuracy Distribution</h2>
          </div>
          <div className="p-4 h-[280px] w-full">
            <AccuracyChart />
          </div>
        </div>

        {/* R-Square Chart */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm">
          <div className="bg-gray-200 rounded-t-lg p-4">
            <h2 className="text-sm font-semibold">R-Square Distribution</h2>
          </div>
          <div className="p-4 h-[280px] w-full">
            <RSquareChart />
          </div>
        </div>

        {/* MAPE Chart */}
        <div className="lg:col-span-6 bg-white rounded-lg shadow-sm">
          <div className="bg-gray-200 rounded-t-lg p-4">
            <h2 className="text-sm font-semibold">MAPE Distribution</h2>
          </div>
          <div className="p-4 h-[280px] w-full">
            <MAPEChart />
          </div>
        </div>
      </div>
    </div>
  );
}