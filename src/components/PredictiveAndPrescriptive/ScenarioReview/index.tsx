import { useState } from 'react';
import { MetricCard } from './Components/KPICard';
import { kpiDataSOR, kpiDataMixEVA } from './data/kpiData';
import { SummaryChangesChart, CountProductsChart, PriceIndexingChart } from './Components/OverallResult';
import { ProductMixChart, DecompositionEVAChart } from './Components/MixEVA';
import  MFGTabularView  from './Components/MFGTabularView';
import CustomerTabularView from './Components/CustomerTabularView';

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
    <div className="bg-white h-70 p-4 rounded shadow-sm w-full">
      {/* Filter Info */}
      <div className="text-lg font-bold text-gray-1000 mb-4">
      Selected Scenario's Scope
      </div>

      <div className="text-xs text-gray-800 mb-4">
            Scenario Name: 3% increaseMDLZ_Refresh_Area2 | Scenario Type: All | Scenario Status: All | Task Assigned To: All | BU:Brazil | Market:BR |Region: All | Category : POWDERED BEVERAGES |
            Planning Period and Base Scenario Forecasted Data is for the months of: 12/31/2022-5/31/2024
      </div>

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

      {activeTab === 'MFGP&LTabularView' && (
        <div className="lg:col-span-12">
          
          {/* Table Component*/}
          <div className="text-s text-gray-600 mb-4">
            Customer: ARCOM SA | Channel: Independente | Brand: All | PPG: All
          </div>
           {/* Add MFGTabularView component*/}
          <div className="lg:col-span-1 bg-white rounded shadow-sm w-full">
            </div>
            <div className="p-4 h-full w-full overflow-auto">
              <MFGTabularView />
            </div>
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

        Charts Section
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
            <div className="p-4 h-[400px] w-full">
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
           {/* Table Component*/}
           <div className="text-s text-gray-600 mb-1 mt-4">
            State: All | Pricing Channel: All | Pricing Family: All
          </div>
           {/* Add CustomerTabularView component*/}
          <div className="lg:col-span-1 bg-white rounded shadow-sm w-full">
              <div className="p-4 h-full w-full overflow-auto">
              <h2 className="text-L bg-gray-200 rounded-t p-3 mb-1 font-semibold">Customer Table</h2>
              <CustomerTabularView />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}