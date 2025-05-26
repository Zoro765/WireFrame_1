// import React, { useEffect, useRef } from 'react';

// export function Filters({ isVisible, toggleVisibility }) {
//   const filterRef = useRef(null);

//   // Close the filter panel when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (filterRef.current && !filterRef.current.contains(event.target)) {
//         toggleVisibility(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [toggleVisibility]);

//   return (
//     <div
//       ref={filterRef}
//       className="fixed right-0 top-1/8 transition-all duration-300 z-50"
//       style={{ transform: isVisible ? 'translateX(0)' : 'translateX(calc(100% - 40px))' }} // 40px = width of the button
//     >
//       {/* Entire sliding container (button + panel) */}
//       <div className="flex">
//         {/* Filter Button (part of the sliding container) */}
//         <div
//           className="bg-purple-900 p-2 text-white cursor-pointer rounded-l-lg shadow-md hover:bg-purple-800 transition-colors duration-200 flex items-center justify-center"
//           style={{ width: '40px', height: '40px' }}
//           onClick={() => toggleVisibility((prev) => !prev)}
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

//         {/* Filter Panel */}
//         <div className="bg-white shadow-lg w-64 p-4 overflow-y-auto" style={{ maxHeight: '80vh' }}>
//           <h3 className="font-semibold text-purple-900 mb-4">Filters</h3>
//           <div className="space-y-4" style={{ maxHeight: 'calc(80vh - 100px)', overflowY: 'auto' }}>
//             {/* ... Your existing filter content ... */}
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
//             <div className="mt-4">
//               <button className="w-full px-4 py-2 bg-gray-100 text-sm rounded hover:bg-gray-200">
//                 Reset Filters
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// src/components/common/Filters/Filters.tsx
import React, { useEffect, useRef } from 'react';

// (Keep your FilterOptionItem, FilterOptions, SelectedFilters, FiltersProps interfaces as defined before)
export interface FilterOptionItem {
  value: string | number;
  label: string;
}
export interface FilterOptions {
  years: (string | number)[]; quarters: FilterOptionItem[]; regions: FilterOptionItem[];
  channels: FilterOptionItem[]; manufacturers: FilterOptionItem[]; categories: FilterOptionItem[];
  brands: FilterOptionItem[]; ppgs?: FilterOptionItem[]; kpis?: FilterOptionItem[];
}
export interface SelectedFilters {
  year: string | number; quarter: string | number; region: string; channel: string;
  manufacturer: string; category: string; brand: string; ppg?: string; kpi?: string;
}
interface FiltersProps {
  isVisible: boolean;
  toggleVisibility: (updater: (prev: boolean) => boolean) => void;
  options: FilterOptions;
  selected: SelectedFilters; // This prop MUST be a defined object from the parent
  onChange: (filterName: keyof SelectedFilters, value: string | number) => void;
  onReset?: () => void;
}

export function Filters({ 
  isVisible, 
  toggleVisibility,
  options,
  selected, // Crucially, ensure parent (ExecutiveSummary) ALWAYS passes a defined 'selected' object
  onChange,
  onReset 
}: FiltersProps) {
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        if (isVisible) { toggleVisibility(() => false); }
      }
    };
    if (isVisible) { document.addEventListener('mousedown', handleClickOutside); }
    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, [isVisible, toggleVisibility]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    onChange(name as keyof SelectedFilters, value);
  };

  // If selected or options are not ready, perhaps show a minimal panel or a loading state within the panel
  // This check happens BEFORE trying to destructure or access properties of 'selected' or 'options'
  if (!selected || !options) {
    // This case should ideally be prevented by the parent (ExecutiveSummary) ensuring valid props
    // If it still happens, render a minimal panel or nothing for the content
    return (
        <div ref={filterRef} className="fixed right-0 top-[12.5%] ..." style={{ transform: isVisible ? 'translateX(0)' : 'translateX(calc(100% - 40px))' }}>
            <div className="flex items-start">
                {isVisible && (
                    <div className="bg-white shadow-xl w-64 p-4 ...">
                        <h3 className="font-semibold text-purple-900 mb-4">Filters</h3>
                        <p>Loading filter data...</p>
                    </div>
                )}
            </div>
        </div>
    );
  }

  // Now we know 'selected' and 'options' are defined objects
  const selectedYear = selected.year ?? ''; // Default to empty string if year is null/undefined
  const selectedQuarter = selected.quarter ?? 'All';
  const selectedRegion = selected.region ?? 'All';
  const selectedChannel = selected.channel ?? 'All';
  const selectedManufacturer = selected.manufacturer ?? 'All';
  const selectedCategory = selected.category ?? 'All';
  const selectedBrand = selected.brand ?? 'All';
  const selectedPpg = selected.ppg ?? 'All';
  const selectedKpi = selected.kpi ?? 'Value Sales';

  const yearsReady = options.years?.length > 0;
  const quartersReady = options.quarters?.length > 0;
  const regionsReady = options.regions?.length > 0;
  const channelsReady = options.channels?.length > 0;
  const manufacturersReady = options.manufacturers?.length > 0;
  const categoriesReady = options.categories?.length > 0;
  const brandsReady = options.brands?.length > 0;
  const ppgsReady = options.ppgs?.length > 0;

  return (
    <div
      ref={filterRef}
      className="fixed right-0 top-1/8 transition-all duration-300 z-50"
      style={{ transform: isVisible ? 'translateX(0)' : 'translateX(calc(100% - 40px))' }} 
    >
      <div className="flex items-start">
        <div
          className={`bg-purple-900 p-2 text-white cursor-pointer rounded-l-lg shadow-md hover:bg-purple-800 transition-colors duration-200 flex items-center justify-center`}
          style={{ width: '40px', height: '40px'}} 
          onClick={() => toggleVisibility((prev) => !prev)}
          aria-label={isVisible ? "Hide filters" : "Show filters"}
          role="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </div>

        <div 
            className={`bg-white shadow-xl w-64 border-l border-gray-300 
                        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
                        transition-opacity duration-300 ease-in-out`}
            style={{ maxHeight: '80vh', overflowY: 'hidden' }} 
        >
          {/* Only render the content div if isVisible is true */}
          {isVisible && ( 
            <>
              <h3 className="font-semibold text-purple-900 mb-4 px-4 pt-4 sticky top-0 bg-white z-10 border-b">Filters</h3>
              <div className="space-y-4 px-4 pb-4" style={{ maxHeight: 'calc(80vh - 80px)', overflowY: 'auto' }}> {/* Main scrollable content */}
                
                <div className="flex flex-col">
                  <label htmlFor="year" className="text-sm text-gray-600 mb-1">Year</label>
                  <select name="year" id="year" value={selectedYear} onChange={handleSelectChange} className="border rounded-md px-2 py-1 text-sm w-full" disabled={!yearsReady}>
                    {!yearsReady && <option value="">Loading...</option>}
                    {yearsReady && options.years.map(year => (<option key={String(year)} value={String(year)}>{String(year)}</option>))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="quarter" className="text-sm text-gray-600 mb-1">Quarter</label>
                  <select name="quarter" id="quarter" value={selectedQuarter} onChange={handleSelectChange} className="border rounded-md px-2 py-1 text-sm w-full" disabled={!quartersReady}>
                    {!quartersReady && <option value="All">Loading...</option>}
                    {quartersReady && options.quarters.map(q => (<option key={q.value} value={q.value}>{q.label}</option>))}
                  </select>
                </div>
                
                <div className="flex flex-col">
                  <label htmlFor="region" className="text-sm text-gray-600 mb-1">Region</label>
                  <select name="region" id="region" value={selectedRegion} onChange={handleSelectChange} className="border rounded-md px-2 py-1 text-sm w-full" disabled={!regionsReady}>
                    {!regionsReady && <option value="All">Loading...</option>}
                    {regionsReady && options.regions.map(r => (<option key={r.value} value={r.value}>{r.label}</option>))}
                  </select>
                </div>
                
                 <div className="flex flex-col">
                  <label htmlFor="channel" className="text-sm text-gray-600 mb-1">Channel</label>
                  <select name="channel" id="channel" value={selectedChannel} onChange={handleSelectChange} className="border rounded-md px-2 py-1 text-sm w-full" disabled={!channelsReady}>
                    {!channelsReady && <option value="All">Loading...</option>}
                    {channelsReady && options.channels.map(c => (<option key={c.value} value={c.value}>{c.label}</option>))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="manufacturer" className="text-sm text-gray-600 mb-1">Manufacturer</label>
                  <select name="manufacturer" id="manufacturer" value={selectedManufacturer} onChange={handleSelectChange} className="border rounded-md px-2 py-1 text-sm w-full" disabled={!manufacturersReady}>
                    {!manufacturersReady && <option value="All">Loading...</option>}
                    {manufacturersReady && options.manufacturers.map(m => (<option key={m.value} value={m.value}>{m.label}</option>))}
                  </select>
                </div>

                 <div className="flex flex-col">
                  <label htmlFor="category" className="text-sm text-gray-600 mb-1">Category</label>
                  <select name="category" id="category" value={selectedCategory} onChange={handleSelectChange} className="border rounded-md px-2 py-1 text-sm w-full" disabled={!categoriesReady}>
                    {!categoriesReady && <option value="All">Loading...</option>}
                    {categoriesReady && options.categories.map(cat => (<option key={cat.value} value={cat.value}>{cat.label}</option>))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="brand" className="text-sm text-gray-600 mb-1">Brand</label>
                  <select name="brand" id="brand" value={selectedBrand} onChange={handleSelectChange} className="border rounded-md px-2 py-1 text-sm w-full" disabled={!brandsReady}>
                    {!brandsReady && <option value="All">Loading...</option>}
                    {brandsReady && options.brands.map(b => (<option key={b.value} value={b.value}>{b.label}</option>))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="ppg" className="text-sm text-gray-600 mb-1">PPG</label>
                  <select name="ppg" id="ppg" value={selectedPpg} onChange={handleSelectChange} className="border rounded-md px-2 py-1 text-sm w-full disabled={!ppgsReady}">
                    {!ppgsReady && <option value="All">Loading...</option>}
                    {ppgsReady && options.ppgs.map(p => (<option key={p.value} value={p.value}>{p.label}</option>))}
                    {/* <option value="All">All PPGs</option> */}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="kpi" className="text-sm text-gray-600 mb-1">KPI</label>
                  <select name="kpi" id="kpi" value={selectedKpi} onChange={handleSelectChange} className="border rounded-md px-2 py-1 text-sm w-full">
                    <option>Value Sales</option> <option>Volume Sales</option> <option>Market Share</option>
                  </select>
                </div>

                {onReset && (
                  <div className="mt-6 sticky bottom-0 bg-white py-3 border-t">
                    <button 
                      onClick={onReset} 
                      className="w-full px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}







