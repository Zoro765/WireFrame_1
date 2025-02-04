import React, { useState } from 'react';
import { MetricCard } from './components/KPICard';
import { Cannibalization } from './components/Cannibalization';
import { kpiData } from './data/kpiData';

export function ModelResults() {

  const [activeTab, setActiveTab] = useState('priceElasticity');

  const tabs = [
    { id: 'priceElasticity', label: 'Price Elasticity' },
    { id: 'priceResponsiveness', label: 'Average Price Responsiveness' },
    { id: 'cannibalization', label: 'Cannibalization' },
  ];

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

        {/* Tabs Navigation */}
        <div className="border-b border-gray-100">
        <nav className="-mb-px flex justify-start grid lg:grid-cols-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-1 px-2 border-b-2 text-base font-bold transition-all duration-200 hover:text-purple-700 col-span-1 bg-white rounded shadow-sm w-full
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

      <div className="text-xs text-gray-600 mb-2">
      </div>


{/* Charts Section */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
  {activeTab === 'cannibalization' && (
    <div className="lg:col-span-12 bg-white rounded shadow-sm w-full">
      <div className="p-4 h-[650px] w-full">
        <Cannibalization />
      </div>
    </div>
  )}
  
  {activeTab === 'priceElasticity' && (
    <div className="lg:col-span-12">
      {/* Add PriceElasticity component */}
    </div>
  )}

  {activeTab === 'priceResponsiveness' && (
    <div className="lg:col-span-12">
      {/* Add PriceResponsiveness component */}
    </div>
  )}
</div>
    </>
  );
}