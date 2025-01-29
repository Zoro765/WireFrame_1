import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { KPICard } from './components/KPICard';
import { VolumeMarketShare } from './components/VolumeMarketShare';
import { ValueSalesQuarter } from './components/ValueSalesQuarter';
import { RegionalSummary } from './components/RegionalSummary';
import { ChannelDistribution } from './components/ChannelDistribution';
import { PerformanceOverTime } from './components/PerformanceOverTime';
import { Navigation } from './components/Navigation'; // Import the Navigation component
import { kpiData } from './components/kpi_data'; // Import the KPI data

function Filters({ isVisible, toggleVisibility }) {
  return (
    <div
      className="fixed right-0 top-1/8 transition-all duration-300 z-50"
      onMouseEnter={() => toggleVisibility(true)}
      onMouseLeave={() => toggleVisibility(false)}
    >
      <div
        className={`flex transition-all duration-300 ${
          isVisible ? 'translate-x-0' : 'translate-x-[calc(100%-2.5rem)]'
        }`}
      >
        <div
          className="bg-purple-900 p-2 text-white cursor-pointer rounded-l-lg shadow-md hover:bg-purple-800 transition-colors duration-200 flex items-center justify-center"
          style={{ width: '40px', height: '40px' }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </div>
        <div className="bg-white shadow-lg w-64 p-4 overflow-y-auto" style={{ maxHeight: '80vh' }}>
          <h3 className="font-semibold text-purple-900 mb-4">Filters</h3>
          <div className="space-y-4" style={{ maxHeight: 'calc(80vh - 100px)', overflowY: 'auto' }}>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Year</label>
              <select className="border rounded-md px-2 py-1 text-sm">
                <option>2021</option>
                <option>2022</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Quarter</label>
              <select className="border rounded-md px-2 py-1 text-sm">
                <option>All</option>
                <option>Q1</option>
                <option>Q2</option>
                <option>Q3</option>
                <option>Q4</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Region</label>
              <select className="border rounded-md px-2 py-1 text-sm">
                <option>All</option>
                {['Area I', 'Area II', 'Area III', 'Area IV', 'Area V', 'Area VI', 'Area VII'].map(
                  (region) => (
                    <option key={region}>{region}</option>
                  )
                )}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Channel</label>
              <select className="border rounded-md px-2 py-1 text-sm">
                <option>All</option>
                {['Traditional', 'C&C', 'Hyper', 'Super G', 'Super P', 'Independent'].map(
                  (channel) => (
                    <option key={channel}>{channel}</option>
                  )
                )}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Manufacturer</label>
              <select className="border rounded-md px-2 py-1 text-sm">
                <option>All</option>
                {['MONDELEZ INTL', '3 CORACOES', 'PARATI', 'MARATA', 'ENOVA'].map((manufacturer) => (
                  <option key={manufacturer}>{manufacturer}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Category</label>
              <select className="border rounded-md px-2 py-1 text-sm">
                <option>All</option>
                <option>POWDERED BEVERAGES</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Brand</label>
              <select className="border rounded-md px-2 py-1 text-sm">
                <option>All</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">PPG</label>
              <select className="border rounded-md px-2 py-1 text-sm">
                <option>All</option>
              </select>
            </div>

            <div className="flex flex-col ">
              <label className="text-sm text-gray-600 mb-1">KPI</label>
              <select className="border rounded-md px-2 py-1 text-sm">
                <option>Value Sales</option>
                <option>Volume Sales</option>
                <option>Market Share</option>
              </select>
            </div>


            {/* Reset Filters Button at the Bottom of the Filters Sidebar */}
            <div className="mt-4">
            <button className="w-full px-4 py-2 bg-gray-100 text-sm rounded hover:bg-gray-200">
              Reset Filters
            </button>
          </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const toggleFiltersVisibility = (isVisible) => {
    setIsFiltersVisible(isVisible);
  };

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      {/* Navigation Sidebar */}
      <Navigation />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pl-16"> {/* Fixed padding for navigation */}
        <Header />

        <main className="flex-1 px-6 py-4 flex overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            {/* KPI Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {kpiData.map((kpi, index) => (
                <KPICard key={index} {...kpi} />
              ))}
            </section>

            {/* Filter Info */}
            <div className="text-xs text-gray-600 mb-4">
              Year: 2021 | Quarter: All | Month: All | BU: Brazil | Region: All | Channel: All |
              Manufacturer: All | Category: POWDERED BEVERAGES | (Available Date: 11/30/2020-11/30/2022)
              | Brand: All | PPG: All
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4"> {/* Changed to 12 columns for more precise control */}
            {/* First chart - 70% width (8/12 columns) */}
            <div className="lg:col-span-8 bg-white rounded shadow-sm w-full">
              <div className="bg-gray-200 rounded-t p-4">
                <h2 className="text-sm font-semibold">Volume Market Share</h2>
              </div>
              <div className="p-4 h-[350px] w-full">
                <VolumeMarketShare />
              </div>
            </div>

            {/* Second chart - 30% width (4/12 columns) */}
            <div className="lg:col-span-4 bg-white rounded shadow-sm w-full">
              <div className="bg-gray-200 rounded-t p-4">
                <h2 className="text-sm font-semibold">Value Sales - Quarter Analysis</h2>
              </div>
              <div className="p-4 h-[350px] w-full">
                <ValueSalesQuarter />
              </div>
            </div>

            {/* Bottom row pie charts - 25% total (12.5% each) */}
            <div className="lg:col-span-3 bg-white rounded shadow-sm">
              <div className="bg-gray-200 rounded-t p-4">
                <h2 className="text-sm font-semibold">Value Sales - Region Wise</h2>
              </div>
              <div className="p-4 h-[300px] w-full">
                <RegionalSummary />
              </div>
            </div>

            <div className="lg:col-span-3 bg-white rounded shadow-sm">
              <div className="bg-gray-200 rounded-t p-4">
                <h2 className="text-sm font-semibold">Value Sales - Channel Wise</h2>
              </div>
              <div className="p-4 h-[300px] w-full">
                <ChannelDistribution />
              </div>
            </div>

            {/* Bottom row line chart - 75% width */}
            <div className="lg:col-span-6 bg-white rounded shadow-sm w-full">
              <div className="bg-gray-200 rounded-t p-4">
                <h2 className="text-sm font-semibold">Value Sales - Performance over time</h2>
              </div>
              <div className="p-4 h-[300px] w-full">
                <PerformanceOverTime />
              </div>
            </div>
          </div>
          </div>

          {/* Hoverable Filters Sidebar */}
          <Filters isVisible={isFiltersVisible} toggleVisibility={toggleFiltersVisibility} />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;


// import React, { useState } from 'react';
// import { Header } from './components/Header';
// import { Footer } from './components/Footer';
// import { KPICard } from './components/KPICard';
// import { VolumeMarketShare } from './components/VolumeMarketShare';
// import { ValueSalesQuarter } from './components/ValueSalesQuarter';
// import { RegionalSummary } from './components/RegionalSummary';
// import { ChannelDistribution } from './components/ChannelDistribution';
// import { PerformanceOverTime } from './components/PerformanceOverTime';
// import { Navigation } from './components/Navigation'; // Import the Navigation component

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

// function Filters({ isVisible, toggleVisibility }) {
//   return (
//     <div
//       className="fixed right-0 top-1/8 transition-all duration-300 z-50"
//       onMouseEnter={() => toggleVisibility(true)}
//       onMouseLeave={() => toggleVisibility(false)}
//     >
//       <div
//         className={`flex transition-all duration-300 ${
//           isVisible ? 'translate-x-0' : 'translate-x-[calc(100%-2.5rem)]'
//         }`}
//       >
//         <div
//           className="bg-purple-900 p-2 text-white cursor-pointer rounded-l-lg shadow-md hover:bg-purple-800 transition-colors duration-200 flex items-center justify-center"
//           style={{ width: '40px', height: '40px' }}
//         >
//           <svg
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
//           </svg>
//         </div>
//         <div className="bg-white shadow-lg w-64 p-4 overflow-y-auto" style={{ maxHeight: '80vh' }}>
//           <h3 className="font-semibold text-purple-900 mb-4">Filters</h3>
//           <div className="space-y-4" style={{ maxHeight: 'calc(80vh - 100px)', overflowY: 'auto' }}>
//             <div className="flex flex-col">
//               <label className="text-sm text-gray-600 mb-1">Year</label>
//               <select className="border rounded-md px-2 py-1 text-sm">
//                 <option>2021</option>
//                 <option>2022</option>
//               </select>
//             </div>

//             <div className="flex flex-col">
//               <label className="text-sm text-gray-600 mb-1">Quarter</label>
//               <select className="border rounded-md px-2 py-1 text-sm">
//                 <option>All</option>
//                 <option>Q1</option>
//                 <option>Q2</option>
//                 <option>Q3</option>
//                 <option>Q4</option>
//               </select>
//             </div>

//             <div className="flex flex-col">
//               <label className="text-sm text-gray-600 mb-1">Region</label>
//               <select className="border rounded-md px-2 py-1 text-sm">
//                 <option>All</option>
//                 {['Area I', 'Area II', 'Area III', 'Area IV', 'Area V', 'Area VI', 'Area VII'].map(
//                   (region) => (
//                     <option key={region}>{region}</option>
//                   )
//                 )}
//               </select>
//             </div>

//             <div className="flex flex-col">
//               <label className="text-sm text-gray-600 mb-1">Channel</label>
//               <select className="border rounded-md px-2 py-1 text-sm">
//                 <option>All</option>
//                 {['Traditional', 'C&C', 'Hyper', 'Super G', 'Super P', 'Independent'].map(
//                   (channel) => (
//                     <option key={channel}>{channel}</option>
//                   )
//                 )}
//               </select>
//             </div>

//             <div className="flex flex-col">
//               <label className="text-sm text-gray-600 mb-1">Manufacturer</label>
//               <select className="border rounded-md px-2 py-1 text-sm">
//                 <option>All</option>
//                 {['MONDELEZ INTL', '3 CORACOES', 'PARATI', 'MARATA', 'ENOVA'].map((manufacturer) => (
//                   <option key={manufacturer}>{manufacturer}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex flex-col">
//               <label className="text-sm text-gray-600 mb-1">Category</label>
//               <select className="border rounded-md px-2 py-1 text-sm">
//                 <option>All</option>
//                 <option>POWDERED BEVERAGES</option>
//               </select>
//             </div>

//             <div className="flex flex-col">
//               <label className="text-sm text-gray-600 mb-1">Brand</label>
//               <select className="border rounded-md px-2 py-1 text-sm">
//                 <option>All</option>
//               </select>
//             </div>

//             <div className="flex flex-col">
//               <label className="text-sm text-gray-600 mb-1">PPG</label>
//               <select className="border rounded-md px-2 py-1 text-sm">
//                 <option>All</option>
//               </select>
//             </div>

//             <div className="flex flex-col ">
//               <label className="text-sm text-gray-600 mb-1">KPI</label>
//               <select className="border rounded-md px-2 py-1 text-sm">
//                 <option>Value Sales</option>
//                 <option>Volume Sales</option>
//                 <option>Market Share</option>
//               </select>
//             </div>


//             {/* Reset Filters Button at the Bottom of the Filters Sidebar */}
//             <div className="mt-4">
//             <button className="w-full px-4 py-2 bg-gray-100 text-sm rounded hover:bg-gray-200">
//               Reset Filters
//             </button>
//           </div>
//           </div>

          
//         </div>
//       </div>
//     </div>
//   );
// }

// function App() {
//   const [isFiltersVisible, setIsFiltersVisible] = useState(false);

//   const toggleFiltersVisibility = (isVisible) => {
//     setIsFiltersVisible(isVisible);
//   };

//   return (
//     <div className="flex min-h-screen bg-[#f5f5f5]">
//       {/* Navigation Sidebar */}
//       <Navigation />

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col pl-16"> {/* Fixed padding for navigation */}
//         <Header />

//         <main className="flex-1 px-6 py-4 flex overflow-hidden">
//           {/* Main Content */}
//           <div className="flex-1 overflow-y-auto">
//             {/* KPI Section */}
//             <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//               {kpiData.map((kpi, index) => (
//                 <KPICard key={index} {...kpi} />
//               ))}
//             </section>

//             {/* Filter Info */}
//             <div className="text-xs text-gray-600 mb-4">
//               Year: 2021 | Quarter: All | Month: All | BU: Brazil | Region: All | Channel: All |
//               Manufacturer: All | Category: POWDERED BEVERAGES | (Available Date: 11/30/2020-11/30/2022)
//               | Brand: All | PPG: All
//             </div>

//             {/* Charts Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-4"> {/* Changed to 12 columns for more precise control */}
//             {/* First chart - 70% width (8/12 columns) */}
//             <div className="lg:col-span-8 bg-white rounded shadow-sm w-full">
//               <div className="bg-gray-200 rounded-t p-4">
//                 <h2 className="text-sm font-semibold">Volume Market Share</h2>
//               </div>
//               <div className="p-4 h-[350px] w-full">
//                 <VolumeMarketShare />
//               </div>
//             </div>

//             {/* Second chart - 30% width (4/12 columns) */}
//             <div className="lg:col-span-4 bg-white rounded shadow-sm w-full">
//               <div className="bg-gray-200 rounded-t p-4">
//                 <h2 className="text-sm font-semibold">Value Sales - Quarter Analysis</h2>
//               </div>
//               <div className="p-4 h-[350px] w-full">
//                 <ValueSalesQuarter />
//               </div>
//             </div>

//             {/* Bottom row pie charts - 25% total (12.5% each) */}
//             <div className="lg:col-span-3 bg-white rounded shadow-sm">
//               <div className="bg-gray-200 rounded-t p-4">
//                 <h2 className="text-sm font-semibold">Value Sales - Region Wise</h2>
//               </div>
//               <div className="p-4 h-[300px] w-full">
//                 <RegionalSummary />
//               </div>
//             </div>

//             <div className="lg:col-span-3 bg-white rounded shadow-sm">
//               <div className="bg-gray-200 rounded-t p-4">
//                 <h2 className="text-sm font-semibold">Value Sales - Channel Wise</h2>
//               </div>
//               <div className="p-4 h-[300px] w-full">
//                 <ChannelDistribution />
//               </div>
//             </div>

//             {/* Bottom row line chart - 75% width */}
//             <div className="lg:col-span-6 bg-white rounded shadow-sm w-full">
//               <div className="bg-gray-200 rounded-t p-4">
//                 <h2 className="text-sm font-semibold">Value Sales - Performance over time</h2>
//               </div>
//               <div className="p-4 h-[300px] w-full">
//                 <PerformanceOverTime />
//               </div>
//             </div>
//           </div>
//           </div>

//           {/* Hoverable Filters Sidebar */}
//           <Filters isVisible={isFiltersVisible} toggleVisibility={toggleFiltersVisibility} />
//         </main>

//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default App;




