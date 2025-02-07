import React, { useEffect, useRef } from 'react';

export function Filters({ isVisible, toggleVisibility }) {
  const filterRef = useRef(null);

  // Close the filter panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        toggleVisibility(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleVisibility]);

  return (
    <div
      ref={filterRef}
      className="fixed right-0 top-1/8 transition-all duration-300 z-50"
      style={{ transform: isVisible ? 'translateX(0)' : 'translateX(calc(100% - 40px))' }} // 40px = width of the button
    >
      {/* Entire sliding container (button + panel) */}
      <div className="flex">
        {/* Filter Button (part of the sliding container) */}
        <div
          className="bg-purple-900 p-2 text-white cursor-pointer rounded-l-lg shadow-md hover:bg-purple-800 transition-colors duration-200 flex items-center justify-center"
          style={{ width: '40px', height: '40px' }}
          onClick={() => toggleVisibility((prev) => !prev)}
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

        {/* Filter Panel */}
        <div className="bg-white shadow-lg w-64 p-4 overflow-y-auto" style={{ maxHeight: '80vh' }}>
          <h3 className="font-semibold text-purple-900 mb-4">Filters</h3>
          <div className="space-y-4" style={{ maxHeight: 'calc(80vh - 100px)', overflowY: 'auto' }}>
            {/* ... Your existing filter content ... */}
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


// import React from 'react';

// export function Filters({ isVisible, toggleVisibility }) {
//   return (
//       <div
//         className="fixed right-0 top-1/8 transition-all duration-300 z-50"
//         // onMouseEnter={() => toggleVisibility(true)}
//         // onMouseLeave={() => toggleVisibility(false)}
//         onClick={() => toggleVisibility(prev => !prev)}
//       >
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