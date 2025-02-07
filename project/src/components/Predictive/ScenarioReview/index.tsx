import React, { useState } from 'react';
import { KPICard } from './components/KPICard';
import { BaseScenario } from './components/BaseScenario';
import { SelectedScenario } from './components/SelectedScenario';
import { kpiData } from './data/kpiData';

export function ScenarioReview () {

  const [activeTab, setActiveTab] = useState('priceElasticity');

  const tabs = [
    { id: 'overview', label: 'Scenario Overall Results' },
    { id: 'mfgPLWaterfall', label: 'MFG P&L Waterfall View' },
    { id: 'mfgPLTabular', label: 'MFG P&L Tabular View' },
    { id: 'mix/eva', label: 'Mix/EVA' },
    { id: 'customerWaterfall', label: 'Customer Waterfall View' },
    { id: 'customerTabular', label: 'Customer Tabular View' },
];

  return (
    <div className="space-y-5">
      {/* header */}
      <h1 className="text-xl font-bold text-gray-800 mb-4">Selected Scenario's Scope</h1>

      {/* Filter Info */}
      <div className="text-xs text-gray-600 mb-0 mt-0 leading-tight ml-1">
      Scenario Name: 3% increaseMDLZ_Refresh_Area 2 | Scenario Type: All | Scenario Status: All | Task Assigned To: All | Task Status: All | BU: BRAZIL | Market: BR | Region: All | Category: POWDERED BEVERAGES | Planning period and Base Scenario Forecasted Data is for the months of: 12/31/2022 - 5/31/2024
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex justify-start gap-24 ml-5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-3 px-10 border-b-2 text-base font-bold transition-all duration-200 hover:text-purple-700
                ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600 scale-105'
                    : 'border-transparent text-gray-500 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Filter Info */}
      <div className="text-xs text-gray-600 mb-0 mt-0 leading-tight ml-1">
      Customer: ARCOM SA | Channel: Independente | Brand: All | PPG: All
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 ">
      <div className="lg:col-span-3 bg-white rounded shadow-sm">
        <div className="bg-gray-200 rounded-t p-4 flex justify-between items-center">
          <h2 className="text-sm font-semibold">BaseScenario</h2>
          <span className="text-md text-bold text-gray-600">GP% : 51.82%</span>
        </div>
        <div className="p-4 h-[530px] w-full">
          <BaseScenario />
        </div>
      </div>

      <div className="lg:col-span-3 bg-white rounded shadow-sm">
        <div className="bg-gray-200 rounded-t p-4 flex justify-between items-center">
          <h2 className="text-sm font-semibold">Selected Scenario</h2>
          <span className="text-md text-bold text-gray-600">GP% : 53.22%</span>
        </div>
        <div className="p-4 h-[530px] w-full">
          <SelectedScenario />
        </div>
      </div>
    </div>
    </div>
  );
}