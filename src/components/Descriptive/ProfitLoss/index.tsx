import { KPICard } from './components/KPICard';
import { PricePositioning } from './components/PricePositioning';
import { PricePerformance } from './components/PricePerformance';
import { GrossProfitGrowth } from './components/GPG-Vs-VG';
import { kpiData } from './data/KpiData';
import { PricingPvsR } from './components/Pricing-PvsR';

export function ProfitLoss() {
  return (
    <>
      {/* KPI Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </section>

      {/* Filter Info */}
      <div className="text-xs text-gray-600 mb-0">
        Year: 2021 | Quarter: All | Month: All | BU: Brazil | Region: All | Channel: All |
        Manufacturer: All | Category: POWDERED BEVERAGES | (Available Date: 11/30/2020-11/30/2022)
        | Brand: All | PPG: All
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-2 ">
          {/* Price Positioning */}
          <div className="bg-white rounded-lg shadow px-2 py-2">
            <h3 className="text-m bg-gray-300 px-2 mb-4"><b>Price Positioning|</b><i> Bubble Size : Sell In Volume(P&L)</i></h3>
            <PricePositioning height={200} />
          </div>


          {/* Price Performance */}
          <div className="bg-white rounded-lg shadow px-2 py-2">
            <h3 className="text-m bg-gray-300 px-2 mb-4"><b>Price Performance(across customers)</b></h3>
            <PricePerformance height={200} />
          </div>
      </div>

      {/* Bottom Charts Grid */}
      <div className="grid grid-cols-2 gap-2 ">
        {/* Pricing Profitability Vs Revenue */}
        <div className="bg-white rounded-lg shadow px-2 py-2">
          <h3 className="text-m bg-gray-300 px-2 mb-4"><b>Pricing-Profitability vs Revenue|</b><i> Bubble Size : Sell In Volume(P&L)</i></h3>
          <PricingPvsR height={200} />
        </div>

        {/* Gross Profit Growth Vs Volume Growth */}
        <div className="bg-white rounded-lg shadow px-2 py-2">
          <h3 className="text-m bg-gray-300 px-2 mb-4"><b>Gross Profit Growth vs Volume Growth|</b><i> Bubble Size : Sell In Volume(P&L)</i></h3>
          <GrossProfitGrowth height={200} />
        </div> 
      </div> 
    </>
  );
}