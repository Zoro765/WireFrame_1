import React, { useState } from 'react';
import { KPICard } from './components/KPICard';
import { AnalysisBreakdown } from './components/AnalysisBreakdown';
import { ElasticityTable } from './components/ElasticityTable';
import { PriceElasticityPerPPG } from './components/PriceElasticityPerPPG';
import { kpiData } from './data/kpiData';

export function ModelResults () {

  const [activeTab, setActiveTab] = useState('priceElasticity');

  const tabs = [
    { id: 'priceElasticity', label: 'Price Elasticity' },
    { id: 'priceResponsiveness', label: 'Average Price Responsiveness' },
    { id: 'cannibalization', label: 'Cannibalization' },
  ];

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

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex justify-start gap-14">
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 ">
      <div className="lg:col-span-3 bg-white rounded shadow-sm">
        <div className="bg-gray-200 rounded-t p-4">
          <h2 className="text-sm font-semibold">Analysis Breakdown</h2>
        </div>
        <div className="p-4 h-[430px] w-full">
          <AnalysisBreakdown />
        </div>
      </div>

      <div className="lg:col-span-3 bg-white rounded shadow-sm">
        <div className="bg-gray-200 rounded-t p-4">
          <h2 className="text-sm font-semibold">Elasticity Table</h2>
        </div>
        <div className="p-4 h-[430px] w-full">
          <ElasticityTable />
        </div>
      </div>

      <div className="lg:col-span-6 bg-white rounded shadow-sm">
        <div className="bg-gray-200 rounded-t p-4">
          <h2 className="text-sm font-semibold">Price Elasticity Per PPG</h2>
        </div>
        <div className="p-4 h-[320px] w-full">
          <PriceElasticityPerPPG />
        </div>
      </div>
    </div>
    </div>
  );
}