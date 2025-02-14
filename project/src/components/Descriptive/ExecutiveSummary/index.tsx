import { useEffect, useState } from "react";
import axios from "axios";
import { KPICard } from "./components/KPICard";
import { VolumeMarketShare } from "./components/VolumeMarketShare";
import { ValueSalesQuarter } from "./components/ValueSalesQuarter";
import { RegionalSummary } from "./components/RegionalSummary";
import { ChannelDistribution } from "./components/ChannelDistribution";
import { PerformanceOverTime } from "./components/PerformanceOverTime";

interface KpiData {
  id: number;
  main_label: string;
  value: string;
  yoy_label: string;
  change: number;
  mdlz_label?: string;
  mdlz_value?: string;
  mdlz_yoy_change?: string;
  mdlz_is_positive?: boolean;
}

export function ExecutiveSummary() {
  const [kpiData, setKpiData] = useState<KpiData[]>([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL || "http://localhost:5000/api/kpi-data") // ✅ Uses environment variable for flexibility
      .then((response) => setKpiData(response.data))
      .catch((error) => console.error("Error fetching KPI data:", error));
  }, []);

  return (
    <>
      {/* KPI Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {kpiData.map((kpi) => (
          <KPICard 
            key={kpi.id} 
            mainLabel={kpi.main_label} 
            value={kpi.value} 
            yoyLabel={kpi.yoy_label} 
            change={kpi.change} 
            mdlzLabel={kpi.mdlz_label} 
            mdlzValue={kpi.mdlz_value} 
            mdlzYoyChange={kpi.mdlz_yoy_change} 
            mdlzIsPositive={kpi.mdlz_is_positive} 
          />
        ))}
      </section>

      {/* Filter Info */}
      <div className="text-xs text-gray-600 mb-4">
        Year: 2021 | Quarter: All | Month: All | BU: Brazil | Region: All |
        Channel: All | Manufacturer: All | Category: POWDERED BEVERAGES |
        (Available Date: 11/30/2020-11/30/2022) | Brand: All | PPG: All
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 bg-white rounded shadow-sm w-full">
          <div className="bg-gray-200 rounded-t p-4">
            <h2 className="text-sm font-semibold">Volume Market Share</h2>
          </div>
          <div className="p-4 h-[350px] w-full">
            <VolumeMarketShare />
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded shadow-sm w-full">
          <div className="bg-gray-200 rounded-t p-4">
            <h2 className="text-sm font-semibold">
              Value Sales - Quarter Analysis
            </h2>
          </div>
          <div className="p-4 h-[350px] w-full">
            <ValueSalesQuarter />
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded shadow-sm">
          <div className="bg-gray-200 rounded-t p-4">
            <h2 className="text-sm font-semibold">
              Value Sales - Region Wise
            </h2>
          </div>
          <div className="p-4 h-[300px] w-full">
            <RegionalSummary />
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded shadow-sm">
          <div className="bg-gray-200 rounded-t p-4">
            <h2 className="text-sm font-semibold">
              Value Sales - Channel Wise
            </h2>
          </div>
          <div className="p-4 h-[300px] w-full">
            <ChannelDistribution />
          </div>
        </div>

        <div className="lg:col-span-6 bg-white rounded shadow-sm w-full">
          <div className="bg-gray-200 rounded-t p-4">
            <h2 className="text-sm font-semibold">
              Value Sales - Performance over time
            </h2>
          </div>
          <div className="p-4 h-[300px] w-full">
            <PerformanceOverTime />
          </div>
        </div>
      </div>
    </>
  );
}
