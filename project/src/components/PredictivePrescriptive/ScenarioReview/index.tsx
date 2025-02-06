import React, { useState } from 'react';
import { MetricCard } from './components/KPICard';
import { kpiDataSOR, kpiDataMixEVA } from './data/kpiData';
import { SummaryChangesChart, CountProductsChart, PriceIndexingChart } from './components/OverallResult';
import { ProductMixChart, DecompositionEVAChart } from './components/MixEVA';

export function ScenarioReview() {
  const [activeTab, setActiveTab] = useState('ScenarioOverallResults');

  const tabs = [
    { id: 'ScenarioOverallResults', label: 'Scenario Overall Results' },
    { id: 'MFGP&LWaterfall', label: 'MFG P&L Waterfall' },
    { id: 'MFGP&LTabularView', label: 'MFG P&L Tabular View' },
    { id: 'MixEVA', label: 'Mix/EVA' },
    { id: 'CustomerWaterfall', label: 'Customer Waterfall' },
    { id: 'CustomerTabularView', label: 'Customer Tabular View' },
  ];

  return (
    <>
      {/* Tabs Navigation */}
      <div className="border-b border-gray-100">
        <nav className="-mb-px flex justify-start grid lg:grid-cols-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-1 px-2 border-b-2 text-base font-bold transition-all duration-200 hover:text-purple-700 col-span-1 bg-white rounded shadow-sm w-full
                ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600 scale-100'
                    : 'border-transparent text-gray-500 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="text-xs text-gray-600 mb-2"></div>

      {activeTab === 'ScenarioOverallResults' && (
        <>
          {/* KPI Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {kpiDataSOR.map((kpi, index) => (
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
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-4">
            {/* First Chart */}
            <div className="lg:col-span-4 bg-white rounded shadow-sm w-full">
              <div className="bg-gray-200 rounded-t p-4">
                <h2 className="text-sm font-semibold">Summary Changes</h2>
              </div>
              <div className="p-4 h-[570px] w-full">
                <SummaryChangesChart />
              </div>
            </div>

            {/* Second Chart */}
            <div className="lg:col-span-3 bg-white rounded shadow-sm w-full">
              <div className="bg-gray-200 rounded-t p-4">
                <h2 className="text-sm font-semibold">Count Products</h2>
              </div>
              <div className="p-4 h-[570px] w-full">
                <CountProductsChart />
              </div>
            </div>

            {/* Third Chart */}
            <div className="lg:col-span-4 bg-white rounded shadow-sm w-full">
              <div className="bg-gray-200 rounded-t p-4">
                <h2 className="text-sm font-semibold">Price Indexing</h2>
              </div>
              <div className="p-4 h-[570px] w-full">
                <PriceIndexingChart />
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'MFGP&LWaterfall' && (
        <div className="lg:col-span-12">
          {/* Add MFGP&LWaterfall component */}
        </div>
      )}

      {activeTab === 'MFGP&LTabularView' && (
        <div className="lg:col-span-12">
          {/* Add MFGP&LTabularView component */}
        </div>
      )}

      {activeTab === 'MixEVA' && (
        <>
        {/* KPI Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {kpiDataMixEVA.map((kpi, index) => (
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
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
          {/* First Chart */}
          <div className="lg:col-span-1 bg-white rounded shadow-sm w-full">
            <div className="bg-gray-200 rounded-t p-4">
              <h2 className="text-sm font-semibold">Product Mix</h2>
            </div>
            <div className="p-4 h-[250px] w-full">
              <ProductMixChart />
            </div>
          </div>

          {/* Second Chart */}
          <div className="lg:col-span-1 bg-white rounded shadow-sm w-full">
            <div className="bg-gray-200 rounded-t p-4">
              <h2 className="text-sm font-semibold">Decomposition EVA</h2>
            </div>
            <div className="p-4 h-[300px] w-full">
              <DecompositionEVAChart />
            </div>
          </div>
        </div>
      </>
    )}


      {activeTab === 'CustomerWaterfall' && (
        <div className="lg:col-span-12">
          {/* Add CustomerWaterfall component */}
        </div>
      )}

      {activeTab === 'CustomerTabularView' && (
        <div className="lg:col-span-12">
          {/* Add CustomerTabularView component */}
        </div>
      )}
    </>
  );
}
