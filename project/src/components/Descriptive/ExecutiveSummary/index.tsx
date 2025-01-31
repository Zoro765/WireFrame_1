import React from 'react';
import { MetricCard } from './components/KPICard';
import { VolumeMarketShare } from './components/VolumeMarketShare';
import { ValueSalesQuarter } from './components/ValueSalesQuarter';
import { RegionalSummary } from './components/RegionalSummary';
import { ChannelDistribution } from './components/ChannelDistribution';
import { PerformanceOverTime } from './components/PerformanceOverTime';
import { kpiData } from './data/kpiData';

export function ExecutiveSummary() {
  return (
    <>
      {/* KPI Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {kpiData.map((kpi, index) => (
          <MetricCard key={index} {...kpi} />
        ))}
      </section>

      {/* Filter Info */}
      <div className="text-xs text-gray-600 mb-4">
        Year: 2021 | Quarter: All | Month: All | BU: Brazil | Region: All | Channel: All |
        Manufacturer: All | Category: POWDERED BEVERAGES | (Available Date: 11/30/2020-11/30/2022)
        | Brand: All | PPG: All
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* First chart - 70% width (8/12 columns) */}
        <div className="lg:col-span-8 bg-white rounded shadow-sm w-full">
          <div className="bg-gray-200 rounded-t p-4">
            <h2 className="text-sm font-semibold">Volume Market Share</h2>
          </div>
          <div className="p-4 h-[250px] w-full">
            <VolumeMarketShare />
          </div>
        </div>

        {/* Second chart - 30% width (4/12 columns) */}
        <div className="lg:col-span-4 bg-white rounded shadow-sm w-full">
          <div className="bg-gray-200 rounded-t p-4">
            <h2 className="text-sm font-semibold">Value Sales - Quarter Analysis</h2>
          </div>
          <div className="p-4 h-[250px] w-full">
            <ValueSalesQuarter />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Bottom row pie charts - 25% total (12.5% each) */}
        <div className="lg:col-span-3 bg-white rounded shadow-sm">
          <div className="bg-gray-200 rounded-t p-4">
            <h2 className="text-sm font-semibold">Value Sales - Region Wise</h2>
          </div>
          <div className="p-4 h-[200px] w-full">
            <RegionalSummary />
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded shadow-sm">
          <div className="bg-gray-200 rounded-t p-4">
            <h2 className="text-sm font-semibold">Value Sales - Channel Wise</h2>
          </div>
          <div className="p-4 h-[200px] w-full">
            <ChannelDistribution />
          </div>
        </div>

        {/* Bottom row line chart - 75% width */}
        <div className="lg:col-span-6 bg-white rounded shadow-sm w-full">
          <div className="bg-gray-200 rounded-t p-4">
            <h2 className="text-sm font-semibold">Value Sales - Performance over time</h2>
          </div>
          <div className="p-4 h-[200px] w-full">
            <PerformanceOverTime />
          </div>
        </div>
        </div>
    </>
  );
}