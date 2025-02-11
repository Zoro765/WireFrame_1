import React, { useState } from 'react';
import { KPICard } from './components/KPICard';
import { kpiData } from './data/kpiData';
import { ViewModeToggle } from './components/ViewModeToggle';
import BaseScenarioChart from './components/Charts/BaseScenarioChart';
import SelectedScenarioChart from './components/Charts/SelectedScenarioChart';
import { baseScenarioData,selectedScenarioData } from "./data/data";

export function ScenarioReview() {
  const [activeTab, setActiveTab] = useState('CustomerWaterfall');
  const [viewMode, setViewMode] = useState<'perUnit' | 'total'>('total');

  const tabs = [
    { id: 'ScenarioOverallResults', label: 'Scenario Overall Results' },
    { id: 'MFGP&LWaterfall', label: 'MFG P&L Waterfall' },
    { id: 'MFGPTabularView', label: 'MFG P&L Tabular View' },
    { id: 'CustomerWaterfall', label: 'Customer Waterfall' },
    { id: 'CustomerTabularView', label: 'Customer Tabular View' },
  ];

  return (
    <>
       {/* Tabs Navigation */}
       <div className="border-b border-gray-100">
        <nav className="-mb-px flex justify-start">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-4 border-b-2 text-base font-bold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>


      {/* Scenario Overall Results */}
      {activeTab === 'ScenarioOverallResults' && (
        <>
          {/* KPI Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {kpiData.map((kpi, index) => (
              <KPICard key={index} {...kpi} />
            ))}
          </section>

          {/* Filter Info */}
          <div className="text-xs text-gray-600 mb-4">
            Year: 2021 | Quarter: All | Month: All | BU: Brazil | Region: All | Channel: All |
            Manufacturer: All | Category: POWDERED BEVERAGES | (Available Date: 11/30/2020-11/30/2022)
            | Brand: All | PPG: All
          </div>
        </>
      )}

      {/* MFG P&L Waterfall */}
      {activeTab === 'MFGP&LWaterfall' && <div className="lg:col-span-12">{/* Add MFGP&LWaterfall component */}</div>}

      {/* MFG P&L Tabular View */}
      {activeTab === 'MFGPTabularView' && <div className="lg:col-span-12">{/* Add MFGP&L Tabular View component */}</div>}

      {/* Customer Waterfall */}
      {activeTab === 'CustomerWaterfall' && (
        <div className="lg:col-span-12">
          {/* KPI Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 ">
            {kpiData.map((kpi, index) => (
              <KPICard key={index} {...kpi} />
            ))}
          </section>

          {/* Filter Info */}
          <div className="text-xs text-gray-600 mb-4">
            Year: 2021 | Quarter: All | Month: All | BU: Brazil | Region: All | Channel: All |
            Manufacturer: All | Category: POWDERED BEVERAGES | (Available Date: 11/30/2020-11/30/2022)
            | Brand: All | PPG: All
          </div>

          {/* View Mode Toggle */}
          <div className="mb-4 flex justify-end">
          <ViewModeToggle
  mode={viewMode}
  onToggle={(mode) => {
    console.log("Switching viewMode to:", mode);
    setViewMode(mode);
  }}
/>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
  {/* Base Scenario Chart */}
  <div className="bg-gray-200 rounded-t p-4 w-[1375px] h-[750px]">
  <h1 className="text-lg font-semibold mb-2 text-center">Base Scenario</h1>
    <BaseScenarioChart rawData={baseScenarioData} viewMode={viewMode} />
  </div>

  {/* Selected Scenario Chart */}
  <div className="bg-gray-200 rounded-t p-4 w-[1375px] h-[750px]">
  <h1 className="text-lg font-semibold mb-2 text-center">Selected Scenario</h1>
    <SelectedScenarioChart rawData={selectedScenarioData} viewMode={viewMode} />
  </div>
  </div>
</div>
      )}

      {/* Customer Tabular View */}
      {activeTab === 'CustomerTabularView' && <div className="lg:col-span-12">{/* Add CustomerTabularView component */}</div>}
    </>
  );
}
