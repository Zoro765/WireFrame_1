// import React, { useState, useEffect } from 'react';
// import { KPICard } from './components/KPICard';
// import { VolumeMarketShare } from './components/VolumeMarketShare';
// import { ValueSalesQuarter } from './components/ValueSalesQuarter';
// import { RegionalSummary } from './components/RegionalSummary';
// import { ChannelDistribution } from './components/ChannelDistribution';
// import { PerformanceOverTime } from './components/PerformanceOverTime';
// // import { kpiData } from './data/kpiData';
// import { fetchKPIs } from './data/kpiData';

// export function ExecutiveSummary() {

//   const [kpis, setKpis] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchKPIs()
//       .then(data => {
//         setKpis(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError('Failed to load KPIs');
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div className="text-center p-4">Loading...</div>;
//   if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

//   return (
//     <>
//       {/* KPI Section */}
//       {/* <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//         {kpiData.map((kpi, index) => (
//           <KPICard key={index} {...kpi} />
//         ))}
//       </section> */}
//       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//       {kpis.map((kpi, index) => (
//         <KPICard key={index} {...kpi} />
//       ))}
//     </section>

//       {/* Filter Info */}
//       <div className="text-xs text-gray-600 mb-4">
//         Year: 2021 | Quarter: All | Month: All | BU: Brazil | Region: All | Channel: All |
//         Manufacturer: All | Category: POWDERED BEVERAGES | (Available Date: 11/30/2020-11/30/2022)
//         | Brand: All | PPG: All
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
//         {/* First chart - 70% width (8/12 columns) */}
//         <div className="lg:col-span-8 bg-white rounded shadow-sm w-full">
//           <div className="bg-gray-200 rounded-t p-4">
//             <h2 className="text-sm font-semibold">Volume Market Share</h2>
//           </div>
//           <div className="p-4 h-[350px] w-full">
//             <VolumeMarketShare />
//           </div>
//         </div>

//         {/* Second chart - 30% width (4/12 columns) */}
//         <div className="lg:col-span-4 bg-white rounded shadow-sm w-full">
//           <div className="bg-gray-200 rounded-t p-4">
//             <h2 className="text-sm font-semibold">Value Sales - Quarter Analysis</h2>
//           </div>
//           <div className="p-4 h-[350px] w-full">
//             <ValueSalesQuarter />
//           </div>
//         </div>

//         {/* Bottom row pie charts - 25% total (12.5% each) */}
//         <div className="lg:col-span-3 bg-white rounded shadow-sm">
//           <div className="bg-gray-200 rounded-t p-4">
//             <h2 className="text-sm font-semibold">Value Sales - Region Wise</h2>
//           </div>
//           <div className="p-4 h-[300px] w-full">
//             <RegionalSummary />
//           </div>
//         </div>

//         <div className="lg:col-span-3 bg-white rounded shadow-sm">
//           <div className="bg-gray-200 rounded-t p-4">
//             <h2 className="text-sm font-semibold">Value Sales - Channel Wise</h2>
//           </div>
//           <div className="p-4 h-[300px] w-full">
//             <ChannelDistribution />
//           </div>
//         </div>

//         {/* Bottom row line chart - 75% width */}
//         <div className="lg:col-span-6 bg-white rounded shadow-sm w-full">
//           <div className="bg-gray-200 rounded-t p-4">
//             <h2 className="text-sm font-semibold">Value Sales - Performance over time</h2>
//           </div>
//           <div className="p-4 h-[300px] w-full">
//             <PerformanceOverTime />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }







// src/components/Descriptive/ExecutiveSummary/index.tsx
import React, { useState, useEffect, useCallback } from 'react';

// API Service (Ensure this path is correct based on your project structure)
// If apiService.ts is in 'src/services/', and this file is in 'src/components/Descriptive/ExecutiveSummary/'
// the path would be '../../../services/apiService'
import { 
    getFiltersOptions, 
    getExecutiveSummaryData,
    FilterOptionsResponse, // Type for the whole filter options object
    KpiItem,             // Type for individual KPI card items
    ExecutiveSummaryChartsData, // Type for the 'charts' object in API response
    ExecutiveSummaryParams // Type for parameters sent to getExecutiveSummaryData
} from '../../../services/apiService'; 

// Your UI Components (Ensure paths are correct)
import { KPICard } from './components/KPICard';
import { VolumeMarketShare } from './components/VolumeMarketShare';
import { ValueSalesQuarter } from './components/ValueSalesQuarter';
import { RegionalSummary } from './components/RegionalSummary';
import { ChannelDistribution } from './components/ChannelDistribution';
import { PerformanceOverTime } from './components/PerformanceOverTime';
// Import your main Filters panel that handles the slide-out (ensure path is correct)
import { Filters as MainFiltersPanel } from '../../common/Filters/Filters'; 

// Initial state for selected filters
const initialSelectedFilters: ExecutiveSummaryParams = {
  year: '', // Will be set from API; ensure it's treated as string/number consistently
  quarter: 'All',
  region: 'All',
  channel: 'All',
  manufacturer: 'All',
  category: 'All',
  brand: 'All',
  ppg: 'All', // Make sure your Filters.tsx has a 'ppg' select with this name
  // kpi: 'Value Sales', // If you have a KPI selector that influences data fetching
};

// Helper to display current filters
const CurrentFiltersDisplay: React.FC<{ filters: ExecutiveSummaryParams }> = ({ filters }) => {
  const activeFilters = Object.entries(filters)
    .filter(([key, value]) => {
      if (key === 'year' && !value) return false; // Don't show if year is not yet set
      return value && value !== 'All'; // Only show if value exists and is not 'All'
    })
    .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
    .join(' | ');
  
  const yearDisplay = filters.year ? `Year: ${filters.year}` : "Loading filters...";

  return (
    <div className="text-xs text-gray-600 mb-4 p-2 bg-gray-50 rounded shadow-sm">
      {activeFilters ? `Active Filters: ${activeFilters}` : `${yearDisplay} (defaulting to all other dimensions)`}
    </div>
  );
};

export function ExecutiveSummary() {
  const [filterOptions, setFilterOptions] = useState<FilterOptionsResponse>({
    years: [], quarters: [], regions: [], channels: [],
    manufacturers: [], categories: [], brands: [], ppgs: [], 
  });
  const [selectedFilters, setSelectedFilters] = useState<ExecutiveSummaryParams>(initialSelectedFilters);
  const [kpiCardDisplayData, setKpiCardDisplayData] = useState<KpiItem[]>([]);
  const [chartsDisplayData, setChartsDisplayData] = useState<ExecutiveSummaryChartsData>({
    volumeMarketShare: [], valueSalesQuarterly: [], valueSalesPerformance: [],
    channelDistributionData: [], // Initialize if you plan to fetch data for this
  });
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [loadingData, setLoadingData] = useState(false); 
  const [error, setError] = useState<string | null>(null);
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);

  // 1. Fetch filter options on component mount
  useEffect(() => {
    setLoadingFilters(true);
    getFiltersOptions()
      .then(response => {
        const options = response.data;
        setFilterOptions(options);
        if (options.years && options.years.length > 0) {
          setSelectedFilters(prevFilters => ({
            ...prevFilters,
            year: String(options.years[0]), 
          }));
        } else {
           setSelectedFilters(prevFilters => ({
            ...prevFilters,
            year: new Date().getFullYear().toString(),
          }));
        }
      })
      .catch(err => {
        console.error("Error fetching filter options:", err);
        setError('Failed to load filter options. Please check connectivity or API.');
      })
      .finally(() => {
        setLoadingFilters(false);
      });
  }, []);

  // 2. Fetch executive summary data
  const fetchMainData = useCallback(() => {
    if (!selectedFilters.year || selectedFilters.year === '') {
      // console.log("Year not set in selectedFilters, or filter options not loaded. Skipping main data fetch.");
      return; 
    }
    setLoadingData(true);
    setError(null); 

    getExecutiveSummaryData(selectedFilters)
      .then(response => {
        setKpiCardDisplayData(response.data.kpis || []);
        setChartsDisplayData({ // Ensure all chart data keys are initialized
          volumeMarketShare: response.data.charts?.volumeMarketShare || [],
          valueSalesQuarterly: response.data.charts?.valueSalesQuarterly || [],
          valueSalesPerformance: response.data.charts?.valueSalesPerformance || [],
          channelDistributionData: response.data.charts?.channelDistributionData || [], 
        });
      })
      .catch(err => {
        console.error("Error fetching executive summary data:", err);
        setError('Failed to load summary data. Please check filters or API.');
        setKpiCardDisplayData([]); 
        setChartsDisplayData({ volumeMarketShare: [], valueSalesQuarterly: [], valueSalesPerformance: [], channelDistributionData: [] });
      })
      .finally(() => {
        setLoadingData(false);
      });
  }, [selectedFilters]); 

  useEffect(() => {
    // Fetch main data only after filter options are loaded AND a year is set in selectedFilters
    if (!loadingFilters && selectedFilters.year) {
      fetchMainData();
    }
  }, [loadingFilters, selectedFilters.year, fetchMainData]); // fetchMainData is stable due to useCallback

  const handleFilterChange = (filterName: keyof SelectedFilters, value: string | number) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleResetFilters = () => {
    const latestYear = (filterOptions.years && filterOptions.years.length > 0) 
                       ? String(filterOptions.years[0]) 
                       : new Date().getFullYear().toString();
    setSelectedFilters({
        ...initialSelectedFilters, // Reset all other filters to 'All' or their defaults
        year: latestYear // Ensure year is specifically set
    });
  };
  
  if (loadingFilters) {
      return <div className="text-center p-4">Loading Filters...</div>;
  }
  // If filter loading failed and we can't proceed
  if (error && filterOptions.years.length === 0) { 
     return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="relative min-h-screen bg-gray-50"> {/* Added a light background to the page */}
      <MainFiltersPanel
        isVisible={isFilterPanelVisible}
        toggleVisibility={setIsFilterPanelVisible}
        options={filterOptions}
        selected={selectedFilters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
      />
      
      {/* <div className="p-1 md:p-2 lg:p-4"> */}
      <div>
        {/* <CurrentFiltersDisplay filters={selectedFilters} /> */}
        
        {loadingData && <div className="text-center p-4">Loading Dashboard Data...</div>}
        {error && !loadingData && <div className="text-red-500 text-center p-4">{error}</div>}

        {!loadingData && !error && (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6"> {/* Increased gap */}
              {kpiCardDisplayData.length > 0 ? (
                kpiCardDisplayData.map((kpi) => (
                  <KPICard key={kpi.mainLabel} {...kpi} />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">No KPI data available for the selected filters.</p>
              )}
            </section>

            {/* <<<< NEW POSITION FOR CurrentFiltersDisplay >>>> */}
            {(!loadingFilters && !loadingData) && <CurrentFiltersDisplay filters={selectedFilters} />}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6"> {/* Increased gap */}
              <div className="lg:col-span-8 bg-white rounded-xl shadow-lg p-1 border border-gray-200"> {/* Softer shadow, more rounded */}
                <div className="bg-slate-100 rounded-t-lg p-3 border-b border-gray-200"> {/* Lighter header bg */}
                  <h2 className="text-md font-semibold text-slate-700">Volume Market Share</h2>
                </div>
                <div className="p-4 h-[350px] w-full">
                  <VolumeMarketShare data={chartsDisplayData.volumeMarketShare} />
                </div>
              </div>

              <div className="lg:col-span-4 bg-white rounded-xl shadow-lg p-1 border border-gray-200">
                <div className="bg-slate-100 rounded-t-lg p-3 border-b border-gray-200">
                  <h2 className="text-md font-semibold text-slate-700">Value Sales - Quarter Analysis</h2>
                </div>
                <div className="p-4 h-[350px] w-full">
                  <ValueSalesQuarter data={chartsDisplayData.valueSalesQuarterly} />
                </div>
              </div>

              <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-1 border border-gray-200">
                <div className="bg-slate-100 rounded-t-lg p-3 border-b border-gray-200">
                  <h2 className="text-md font-semibold text-slate-700">Value Sales - Region Wise</h2>
                </div>
                <div className="p-4 h-[300px] w-full">
                  {/* <RegionalSummary chartData={chartsDisplayData.valueSalesQuarterly} /> */}
                  <RegionalSummary apiData={chartsDisplayData.valueSalesQuarterly || []} />
                </div>
              </div>

              <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-1 border border-gray-200">
                <div className="bg-slate-100 rounded-t-lg p-3 border-b border-gray-200">
                  <h2 className="text-md font-semibold text-slate-700">Value Sales - Channel Wise</h2>
                </div>
                <div className="p-4 h-[300px] w-full">
                  {/* Ensure apiData prop matches what ChannelDistribution expects */}
                  <ChannelDistribution apiData={chartsDisplayData.channelDistributionData || []} /> 
                </div>
              </div>

              <div className="lg:col-span-6 bg-white rounded-xl shadow-lg p-1 border border-gray-200">
                <div className="bg-slate-100 rounded-t-lg p-3 border-b border-gray-200">
                  <h2 className="text-md font-semibold text-slate-700">Value Sales - Performance over time</h2>
                </div>
                <div className="p-4 h-[300px] w-full">
                  <PerformanceOverTime data={chartsDisplayData.valueSalesPerformance} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

