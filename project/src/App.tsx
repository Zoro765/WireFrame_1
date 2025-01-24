import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { KPICard } from './components/KPICard';
import { VolumeMarketShare } from './components/VolumeMarketShare';
import { ValueSalesQuarter } from './components/ValueSalesQuarter';
import { RegionalSummary } from './components/RegionalSummary';
import { ChannelDistribution } from './components/ChannelDistribution';
import { PerformanceOverTime } from './components/PerformanceOverTime';

const kpiData = [
  {
    mainLabel: 'Sell Out',
    subLabel: '',
    value: '348,940K',
    yoyLabel: 'YoY: 67,201K',
    change: -12.85,
  },
  {
    mainLabel: 'Sell Out',
    subLabel: 'Volume (Mdl2)',
    value: '144,077K',
    yoyLabel: 'YoY: 28,195K',
    change: -13.43,
  },
  {
    mainLabel: 'Sell Out',
    subLabel: 'Value (Mdl2)',
    value: 'R$148,194K',
    yoyLabel: 'YoY: R$28,335K',
    change: -10.20,
  },
  {
    mainLabel: 'Avg Price',
    subLabel: 'Per Unit (Mdl2)',
    value: 'R$1.06',
    yoyLabel: 'YoY: R$1.04',
    change: 4.21,
  },
];

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Header />
      
      <main className="flex-1 px-6 py-4">
        {/* KPI Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </section>

        {/* Filter Info */}
        <div className="text-xs text-gray-600 mb-4">
          Year: 2021 | Quarter: All | Month: All | BU: Brazil | Region: All | Channel: All | Manufacturer: All | Category: POWDERED BEVERAGES | (Available Date: 11/30/2020-11/30/2022) | Brand: All | PPG: All
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded shadow-sm p-4">
            <h2 className="text-sm font-semibold mb-2">Volume Market Share</h2>
            <VolumeMarketShare />
          </div>

          <div className="bg-white rounded shadow-sm p-4">
            <h2 className="text-sm font-semibold mb-2">Value Sales - Quarter Analysis</h2>
            <ValueSalesQuarter />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded shadow-sm p-4">
              <h2 className="text-sm font-semibold mb-2">Value Sales - Region Wise</h2>
              <RegionalSummary />
            </div>

            <div className="bg-white rounded shadow-sm p-4">
              <h2 className="text-sm font-semibold mb-2">Value Sales - Channel Wise</h2>
              <ChannelDistribution />
            </div>
          </div>

          <div className="bg-white rounded shadow-sm p-4">
            <h2 className="text-sm font-semibold mb-2">Value Sales - Performance over time</h2>
            <PerformanceOverTime />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;