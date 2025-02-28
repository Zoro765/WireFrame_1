import { KPICard } from "./components/KPICard";
import { MarketPriceTiers } from "./components/MarketPriceTiers";
import { PriceTiersOfSelection } from "./components/PriceTiersOfSelection";
import { PricePositioning } from "./components/PricePositioning";
import { PriceIndexing } from "./components/PriceIndexing";
import { ComparisonTable } from "./components/PriceComparison";
import { kpiData } from "./data/KpiData";

export function PriceMarketLandscape() {
  return (
    <>
      {/* KPI Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </section>

      {/* Filter Info */}
      <div className="text-xs text-gray-600 mb-2">
        Year: 2021 | Quarter: All | Month: All | BU: Brazil | Region: All | Channel: All |
        Manufacturer: All | Category: POWDERED BEVERAGES | (Available Date: 11/30/2020-11/30/2022)
        | Brand: All | PPG: All
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-3 gap-2 ">
          {/* Price Tiers */}
          <div className=" bg-gray-200 rounded-lg shadow px-2 py-2">
            <h3 className="text-sm font-semibold mb-4">Price Tiers of Selection</h3>
            <PriceTiersOfSelection height={210} />
          </div>

          <div className='bg-gray-200 rounded-lg shadow px-2 py-2'>
          <h3 className="text-sm font-semibold mb-4">Sales Comparison | <i>PY ValueSales% Vs CY ValueSales%</i></h3>
          <ComparisonTable height={210}/>
          </div>

          {/* Market Price Tiers */}
          <div className="bg-gray-200 rounded-lg shadow px-2 py-2">
            <h3 className="text-sm font-semibold mb-4">Market Price Tiers | <i>Static Visual(Manufacturer,Brand,PPG not considered)</i></h3>
            <MarketPriceTiers height={210} />
          </div>
      </div>

      {/* Bottom Charts Grid */}
      <div className="grid grid-cols-2 gap-2 ">
        {/* Price Positioning */}
        <div className="bg-gray-200 rounded-lg shadow px-2 py-2">
          <h3 className="text-sm font-semibold mb-4">Price Positioning | <i>Bubble Size: Volume Market Share</i></h3>
          <PricePositioning />
        </div>

        {/* Price Indexing */}
        <div className="bg-gray-200 rounded-lg shadow px-2 py-2">
          <h3 className="text-sm font-semibold mb-4">Price Indexing | TANG1815PROMOCAO Vs ADORALLE1801NAO PROMOCAO</h3>
          <PriceIndexing />
        </div> 
      </div> 
    </> 
  );
}
