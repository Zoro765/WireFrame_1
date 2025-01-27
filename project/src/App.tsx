import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa'; // Import the filter icon from react-icons

// Mock components (replace these with your actual components)
const Header = () => <header className="bg-blue-500 text-white p-4">Header</header>;
const Footer = () => <footer className="bg-blue-500 text-white p-4">Footer</footer>;
const KPICard = ({ mainLabel, value, yoyLabel }) => (
  <div className="bg-white p-4 rounded shadow-sm">
    <h3 className="text-lg font-semibold">{mainLabel}</h3>
    <p className="text-2xl">{value}</p>
    <p className="text-sm text-gray-600">{yoyLabel}</p>
  </div>
);
const VolumeMarketShare = () => <div className="h-40 bg-gray-200">Volume Market Share Chart</div>;
const ValueSalesQuarter = () => <div className="h-40 bg-gray-200">Value Sales Quarter Chart</div>;
const RegionalSummary = () => <div className="h-40 bg-gray-200">Regional Summary Chart</div>;
const ChannelDistribution = () => <div className="h-40 bg-gray-200">Channel Distribution Chart</div>;
const PerformanceOverTime = () => <div className="h-40 bg-gray-200">Performance Over Time Chart</div>;

const kpiData = [
  {
    mainLabel: 'Sell Out Volume',
    value: '348,940K',
    yoyLabel: 'YoY: -67,201K (-12.85%)',
  },
  {
    mainLabel: 'Sell Out Value',
    value: 'R$302,631K',
    yoyLabel: 'YoY: -R$56,410K (-7.70%)',
  },
  {
    mainLabel: 'Sell Out Units',
    value: '297,284K',
    yoyLabel: 'YoY: -57,627K (-12.34%)',
  },
  {
    mainLabel: 'Avg Price Per Unit',
    value: 'R$1.02',
    yoyLabel: 'YoY: +R$0.98 (5.30%)',
  },
];

function App() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);

  const toggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Header />

      <main className="flex-1 px-6 py-4 flex">
        {/* Main Content */}
        <div className="flex-1">
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
            <div className="bg-white rounded shadow-sm">
              <div className="bg-gray-300 rounded-t p-4">
                <h2 className="text-sm font-semibold">Volume Market Share</h2>
              </div>
              <div className="p-4">
                <VolumeMarketShare />
              </div>
            </div>

            <div className="bg-white rounded shadow-sm">
              <div className="bg-gray-300 rounded-t p-4">
                <h2 className="text-sm font-semibold">Value Sales - Quarter Analysis</h2>
              </div>
              <div className="p-4">
                <ValueSalesQuarter />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded shadow-sm">
                <div className="bg-gray-300 rounded-t p-4">
                  <h2 className="text-sm font-semibold">Value Sales - Region Wise</h2>
                </div>
                <div className="p-4">
                  <RegionalSummary />
                </div>
              </div>

              <div className="bg-white rounded shadow-sm">
                <div className="bg-gray-300 rounded-t p-4">
                  <h2 className="text-sm font-semibold">Value Sales - Channel Wise</h2>
                </div>
                <div className="p-4">
                  <ChannelDistribution />
                </div>
              </div>
            </div>

            <div className="bg-white rounded shadow-sm">
              <div className="bg-gray-300 rounded-t p-4">
                <h2 className="text-sm font-semibold">Value Sales - Performance over time</h2>
              </div>
              <div className="p-4">
                <PerformanceOverTime />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Sidebar */}
        <div className="w-64 ml-4 flex flex-col">
          <div className="bg-gray-300 rounded-lg shadow-sm p-4 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-sm text-gray-600">Filters</h3>
              <button
                onClick={toggleFilters}
                className="p-2 rounded hover:bg-gray-400 transition-colors"
              >
                <FaFilter className="text-gray-600" />
              </button>
            </div>

            {isFiltersVisible && (
              <div className="space-y-4 flex-1">
                {/* Year Filter */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Year</label>
                  <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>2021</option>
                    <option>2022</option>
                  </select>
                </div>

                {/* Quarter Filter */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Quarter</label>
                  <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>All</option>
                    <option>Q1</option>
                    <option>Q2</option>
                    <option>Q3</option>
                    <option>Q4</option>
                  </select>
                </div>

                {/* Month Filter */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Month</label>
                  <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>All</option>
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                      <option key={month}>{month}</option>
                    ))}
                  </select>
                </div>

                {/* Region Filter */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Region</label>
                  <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>All</option>
                    {['Area I', 'Area II', 'Area III', 'Area IV', 'Area V', 'Area VI', 'Area VII'].map(region => (
                      <option key={region}>{region}</option>
                    ))}
                  </select>
                </div>

                {/* Channel Filter */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Channel</label>
                  <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>All</option>
                    {['Traditional', 'C&C', 'Hyper', 'Super G', 'Super P', 'Independent'].map(channel => (
                      <option key={channel}>{channel}</option>
                    ))}
                  </select>
                </div>

                {/* Manufacturer Filter */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Manufacturer</label>
                  <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>All</option>
                    {['MONDELEZ INTL', '3 CORACOES', 'PARATI', 'MARATA', 'ENOVA'].map(manufacturer => (
                      <option key={manufacturer}>{manufacturer}</option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>POWDERED BEVERAGES</option>
                  </select>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Brand</label>
                  <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>All</option>
                  </select>
                </div>

                {/* PPG Filter */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">PPG</label>
                  <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>All</option>
                  </select>
                </div>

                {/* KPI Filter */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">KPI</label>
                  <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Value Sales</option>
                    <option>Volume Sales</option>
                    <option>Market Share</option>
                  </select>
                </div>
              </div>
            )}

            {/* Reset Filters Button at the Bottom of the Filters Sidebar */}
            <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-sm rounded hover:bg-gray-200">
              Reset Filters
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;




// import React from 'react';
// import { Header } from './components/Header';
// import { Footer } from './components/Footer';
// import { KPICard } from './components/KPICard';
// import { VolumeMarketShare } from './components/VolumeMarketShare';
// import { ValueSalesQuarter } from './components/ValueSalesQuarter';
// import { RegionalSummary } from './components/RegionalSummary';
// import { ChannelDistribution } from './components/ChannelDistribution';
// import { PerformanceOverTime } from './components/PerformanceOverTime';

// const kpiData = [
//   {
//     mainLabel: 'Sell Out Volume',
//     subLabel: '',
//     value: '348,940K',
//     yoyLabel: 'YoY: -67,201K (-12.85%)',
//     change: -12.85,
//     mdlzValue: '144,077K',
//     mdlzYoyChange: 'YoY: -28,195K (-13.43%)',
//     mdlzIsPositive: false,
//     mdlzLabel: 'Volume (Mdlz)',
//   },
//   {
//     mainLabel: 'Sell Out Value',
//     subLabel: '',
//     value: 'R$302,631K',
//     yoyLabel: 'YoY: -R$56,410K (-7.70%)',
//     change: -7.70,
//     mdlzValue: 'R$148,194K',
//     mdlzYoyChange: 'YoY: -R$28,335K (-10.20%)',
//     mdlzIsPositive: false,
//     mdlzLabel: 'Value (Mdlz)',
//   },
//   {
//     mainLabel: 'Sell Out Units',
//     subLabel: '',
//     value: '297,284K',
//     yoyLabel: 'YoY: -57,627K (-12.34%)',
//     change: -12.34,
//     mdlzValue: '140,089K',
//     mdlzYoyChange: 'YoY: -27,339K (-13.82%)',
//     mdlzIsPositive: false,
//     mdlzLabel: 'Units (Mdlz)',
//   },
//   {
//     mainLabel: 'Avg Price Per Unit',
//     subLabel: '',
//     value: 'R$1.02',
//     yoyLabel: 'YoY: +R$0.98 (5.30%)',
//     change: 5.30,
//     mdlzValue: 'R$1.06',
//     mdlzYoyChange: 'YoY: +R$1.04 (4.21%)',
//     mdlzIsPositive: true,
//     mdlzLabel: 'Avg Price (Mdlz)',
//   },
// ];

// function App() {
//   return (
//     <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
//       <Header />

//       <main className="flex-1 px-6 py-4 flex">
//         {/* Main Content */}
//         <div className="flex-1">
//           {/* KPI Section */}
//           <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//             {kpiData.map((kpi, index) => (
//               <KPICard key={index} {...kpi} />
//             ))}
//           </section>

//           {/* Filter Info */}
//           <div className="text-xs text-gray-600 mb-4">
//             Year: 2021 | Quarter: All | Month: All | BU: Brazil | Region: All | Channel: All | Manufacturer: All | Category: POWDERED BEVERAGES | (Available Date: 11/30/2020-11/30/2022) | Brand: All | PPG: All
//           </div>

//           {/* Charts Section */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div className="bg-white rounded shadow-sm">
//             <div className="bg-gray-300 rounded-t p-4">
//               <h2 className="text-sm font-semibold">Volume Market Share</h2>
//             </div>
//             <div className="p-4">
//               <VolumeMarketShare />
//             </div>
//           </div>

//             <div className="bg-white rounded shadow-sm">
//               <div className="bg-gray-300 rounded-t p-4">
//                 <h2 className="text-sm font-semibold">Value Sales - Quarter Analysis</h2>
//               </div>
//               <div className="p-4">
//                 <ValueSalesQuarter />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//             <div className="bg-white rounded shadow-sm">
//               <div className="bg-gray-300 rounded-t p-4">
//                 <h2 className="text-sm font-semibold">Value Sales - Region Wise</h2>
//               </div>
//               <div className="p-4">
//                 <RegionalSummary />
//               </div>
//             </div>

//             <div className="bg-white rounded shadow-sm">
//               <div className="bg-gray-300 rounded-t p-4">
//                 <h2 className="text-sm font-semibold">Value Sales - Channel Wise</h2>
//               </div>
//               <div className="p-4">
//                 <ChannelDistribution />
//               </div>
//             </div>
//             </div>

//             <div className="bg-white rounded shadow-sm">
//             <div className="bg-gray-300 rounded-t p-4">
//               <h2 className="text-sm font-semibold">Value Sales - Performance over time</h2>
//             </div>
//             <div className="p-4">
//               <PerformanceOverTime />
//             </div>
//           </div>
//           </div>
//         </div>

//         <div className="w-64 ml-4 flex flex-col">
//           <div className="bg-gray-300 rounded-lg shadow-sm p-4 flex-1 flex flex-col">
//             <h3 className="font-semibold text-sm mb-4 text-gray-600">Filters</h3>

//             <div className="space-y-4 flex-1">
//               {/* Year Filter */}
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Year</label>
//                 <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
//                   <option>2021</option>
//                   <option>2022</option>
//                 </select>
//               </div>

//               {/* Quarter Filter */}
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Quarter</label>
//                 <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
//                   <option>All</option>
//                   <option>Q1</option>
//                   <option>Q2</option>
//                   <option>Q3</option>
//                   <option>Q4</option>
//                 </select>
//               </div>

//               {/* Month Filter */}
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Month</label>
//                 <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
//                   <option>All</option>
//                   {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
//                     <option key={month}>{month}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Region Filter */}
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Region</label>
//                 <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
//                   <option>All</option>
//                   {['Area I', 'Area II', 'Area III', 'Area IV', 'Area V', 'Area VI', 'Area VII'].map(region => (
//                     <option key={region}>{region}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Channel Filter */}
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Channel</label>
//                 <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
//                   <option>All</option>
//                   {['Traditional', 'C&C', 'Hyper', 'Super G', 'Super P', 'Independent'].map(channel => (
//                     <option key={channel}>{channel}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Manufacturer Filter */}
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Manufacturer</label>
//                 <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
//                   <option>All</option>
//                   {['MONDELEZ INTL', '3 CORACOES', 'PARATI', 'MARATA', 'ENOVA'].map(manufacturer => (
//                     <option key={manufacturer}>{manufacturer}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Category Filter */}
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
//                 <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
//                   <option>POWDERED BEVERAGES</option>
//                 </select>
//               </div>

//               {/* Brand Filter */}
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Brand</label>
//                 <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
//                   <option>All</option>
//                 </select>
//               </div>

//               {/* PPG Filter */}
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">PPG</label>
//                 <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
//                   <option>All</option>
//                 </select>
//               </div>

//               {/* KPI Filter */}
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">KPI</label>
//                 <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
//                   <option>Value Sales</option>
//                   <option>Volume Sales</option>
//                   <option>Market Share</option>
//                 </select>
//               </div>
//             </div>

//             {/* Reset Filters Button at the Bottom of the Filters Sidebar */}
//             <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-sm rounded hover:bg-gray-200">
//               Reset Filters
//             </button>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default App;



// // import React from 'react';
// // import { Header } from './components/Header';
// // import { Footer } from './components/Footer';
// // import { KPICard } from './components/KPICard';
// // import { VolumeMarketShare } from './components/VolumeMarketShare';
// // import { ValueSalesQuarter } from './components/ValueSalesQuarter';
// // import { RegionalSummary } from './components/RegionalSummary';
// // import { ChannelDistribution } from './components/ChannelDistribution';
// // import { PerformanceOverTime } from './components/PerformanceOverTime';



// // const kpiData = [
// //   {
// //     mainLabel: 'Sell Out Volume',
// //     subLabel: '',
// //     value: '348,940K',
// //     yoyLabel: 'YoY: -67,201K (-12.85%)',
// //     change: -12.85,
// //     mdlzValue: '144,077K',
// //     mdlzYoyChange: 'YoY: -28,195K (-13.43%)',
// //     mdlzIsPositive: false,
// //     mdlzLabel: 'Volume (Mdlz)',
// //   },
// //   {
// //     mainLabel: 'Sell Out Value',
// //     subLabel: '',
// //     value: 'R$302,631K',
// //     yoyLabel: 'YoY: -R$56,410K (-7.70%)',
// //     change: -7.70,
// //     mdlzValue: 'R$148,194K',
// //     mdlzYoyChange: 'YoY: -R$28,335K (-10.20%)',
// //     mdlzIsPositive: false,
// //     mdlzLabel: 'Value (Mdlz)',
// //   },
// //   {
// //     mainLabel: 'Sell Out Units',
// //     subLabel: '',
// //     value: '297,284K',
// //     yoyLabel: 'YoY: -57,627K (-12.34%)',
// //     change: -12.34,
// //     mdlzValue: '140,089K',
// //     mdlzYoyChange: 'YoY: -27,339K (-13.82%)',
// //     mdlzIsPositive: false,
// //     mdlzLabel: 'Units (Mdlz)',
// //   },
// //   {
// //     mainLabel: 'Avg Price Per Unit',
// //     subLabel: '',
// //     value: 'R$1.02',
// //     yoyLabel: 'YoY: +R$0.98 (5.30%)',
// //     change: 5.30,
// //     mdlzValue: 'R$1.06',
// //     mdlzYoyChange: 'YoY: +R$1.04 (4.21%)',
// //     mdlzIsPositive: true,
// //     mdlzLabel: 'Avg Price (Mdlz)',
// //   },
// // ];


// // function App() {
// //   return (
// //     <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
// //       <Header />

// //       <main className="flex-1 px-6 py-4 flex">
// //         {/* Main Content */}
// //         <div className="flex-1">
// //           {/* KPI Section */}
// //           <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
// //             {kpiData.map((kpi, index) => (
// //               <KPICard key={index} {...kpi} />
// //             ))}
// //           </section>

// //           {/* Filter Info */}
// //             <div className="text-xs text-gray-600 mb-4">
// //               Year: 2021 | Quarter: All | Month: All | BU: Brazil | Region: All | Channel: All | Manufacturer: All | Category: POWDERED BEVERAGES | (Available Date: 11/30/2020-11/30/2022) | Brand: All | PPG: All
// //             </div>

// //             {/* Charts Section */}
// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
// //               <div className="bg-white rounded shadow-sm p-4">
// //                 <h2 className="text-sm font-semibold mb-2">Volume Market Share</h2>
// //                 <VolumeMarketShare />
// //               </div>

// //               <div className="bg-white rounded shadow-sm p-4">
// //                 <h2 className="text-sm font-semibold mb-2">Value Sales - Quarter Analysis</h2>
// //                 <ValueSalesQuarter />
// //               </div>

// //               <div className="grid grid-cols-2 gap-4">
// //                 <div className="bg-white rounded shadow-sm p-4">
// //                   <h2 className="text-sm font-semibold mb-2">Value Sales - Region Wise</h2>
// //                   <RegionalSummary />
// //                 </div>

// //                 <div className="bg-white rounded shadow-sm p-4">
// //                   <h2 className="text-sm font-semibold mb-2">Value Sales - Channel Wise</h2>
// //                   <ChannelDistribution />
// //                 </div>
// //               </div>

// //               <div className="bg-white rounded shadow-sm p-4">
// //                 <h2 className="text-sm font-semibold mb-2">Value Sales - Performance over time</h2>
// //                 <PerformanceOverTime />
// //               </div>
// //             </div>
// //           </div>

// //           <div className="w-64 ml-4 flex flex-col">
// //     <div className="bg-white rounded-lg shadow-sm p-4 flex-1 flex flex-col">
// //       <h3 className="font-semibold text-sm mb-4 text-gray-800">Filters</h3>

// //       <div className="space-y-4 flex-1">
// //         {/* Year Filter */}
// //         <div>
// //           <label className="block text-xs font-medium text-gray-700 mb-1">Year</label>
// //           <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
// //             <option>2021</option>
// //             <option>2022</option>
// //           </select>
// //         </div>

// //         {/* Quarter Filter */}
// //         <div>
// //           <label className="block text-xs font-medium text-gray-700 mb-1">Quarter</label>
// //           <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
// //             <option>All</option>
// //             <option>Q1</option>
// //             <option>Q2</option>
// //             <option>Q3</option>
// //             <option>Q4</option>
// //           </select>
// //         </div>

// //         {/* Month Filter */}
// //         <div>
// //           <label className="block text-xs font-medium text-gray-700 mb-1">Month</label>
// //           <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
// //             <option>All</option>
// //             {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
// //               <option key={month}>{month}</option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* Region Filter */}
// //         <div>
// //           <label className="block text-xs font-medium text-gray-700 mb-1">Region</label>
// //           <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
// //             <option>All</option>
// //             {['Area I', 'Area II', 'Area III', 'Area IV', 'Area V', 'Area VI', 'Area VII'].map(region => (
// //               <option key={region}>{region}</option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* Channel Filter */}
// //         <div>
// //           <label className="block text-xs font-medium text-gray-700 mb-1">Channel</label>
// //           <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
// //             <option>All</option>
// //             {['Traditional', 'C&C', 'Hyper', 'Super G', 'Super P', 'Independent'].map(channel => (
// //               <option key={channel}>{channel}</option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* Manufacturer Filter */}
// //         <div>
// //           <label className="block text-xs font-medium text-gray-700 mb-1">Manufacturer</label>
// //           <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
// //             <option>All</option>
// //             {['MONDELEZ INTL', '3 CORACOES', 'PARATI', 'MARATA', 'ENOVA'].map(manufacturer => (
// //               <option key={manufacturer}>{manufacturer}</option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* Category Filter */}
// //         <div>
// //           <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
// //           <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
// //             <option>POWDERED BEVERAGES</option>
// //           </select>
// //         </div>

// //         {/* Brand Filter */}
// //         <div>
// //           <label className="block text-xs font-medium text-gray-700 mb-1">Brand</label>
// //           <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
// //             <option>All</option>
// //           </select>
// //         </div>

// //         {/* PPG Filter */}
// //         <div>
// //           <label className="block text-xs font-medium text-gray-700 mb-1">PPG</label>
// //           <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
// //             <option>All</option>
// //           </select>
// //         </div>

// //         {/* KPI Filter */}
// //         <div>
// //           <label className="block text-xs font-medium text-gray-700 mb-1">KPI</label>
// //           <select className="w-full rounded-lg border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
// //             <option>Value Sales</option>
// //             <option>Volume Sales</option>
// //             <option>Market Share</option>
// //           </select>
// //         </div>
// //       </div>

// //       {/* Reset Filters Button at the Bottom of the Filters Sidebar */}
// //       <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-sm rounded hover:bg-gray-200">
// //               Reset Filters
// //             </button>
// //           </div>
// //         </div>
// //       </main>

// //       <Footer />
// //     </div>
// //   );
// // }

// // export default App;

