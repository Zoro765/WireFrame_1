import React, { useState } from 'react';
import { FaChevronDown, FaUndo } from 'react-icons/fa';

interface ScopeSelectionProps {
  onConfirm: () => void;
  onReset: () => void;
  isScopeCollapsed: boolean;
  setIsScopeCollapsed: (isCollapsed: boolean) => void;
}

export const ScopeSelection: React.FC<ScopeSelectionProps> = ({ onConfirm, onReset, isScopeCollapsed, setIsScopeCollapsed }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-gray-200 text-black p-4 flex justify-between items-center">
        <h2 className="text-sm font-semibold">
          {isScopeCollapsed ? 'Current Selected Scope:' : 'Scope Selection'}
        </h2>
      </div>

      {/* Body */}
      {!isScopeCollapsed ? (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Market */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Market</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="BR">BR</option>
              </select>
            </div>

            {/* Region */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Region</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="AREA I">AREA I</option>
              </select>
            </div>

            {/* BU */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">BU</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="BRAZIL">BRAZIL</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Category</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="POWDERED BEVERAGES">POWDERED BEVERAGES</option>
              </select>
            </div>

            {/* Start Period */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Start Period</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="05/2022">05/2022</option>
              </select>
            </div>

            {/* End Period */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">End Period</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="04/2023">04/2023</option>
              </select>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setIsScopeCollapsed(true)}
              className="flex items-center px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-md text-sm transition-colors"
            >
              <FaChevronDown className="mr-2" />
              Collapse
            </button>
            <div className="flex gap-2">
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-md text-sm transition-colors"
              >
                Confirm Scope
              </button>
              <button
                onClick={onReset}
                className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-md text-sm transition-colors"
              >
                Reset Scope
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 pt-1">
          {/* Selected Scope Details */}
          <div className="text-md pb-5 text-gray-700 p-4 rounded-md">
            <span className="font-semibold">BU:</span> BRAZIL |{' '}
            <span className="font-semibold">Region:</span> AREA I |{' '}
            <span className="font-semibold">Market:</span> BR |{' '}
            <span className="font-semibold">Category:</span> BISCUITS |{' '}
            <span className="font-semibold">Period:</span> 05/2022 - 07/2022
          </div>
          <div className="flex items-center justify-between w-full">
            <button
              onClick={() => setIsScopeCollapsed(false)}
              className="flex items-center px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-md text-sm transition-colors"
            >
              <FaChevronDown className="mr-2" />
              Show more details
            </button>
            <button
              onClick={onReset}
              className="flex items-center px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-md text-sm transition-colors"
            >
              <FaUndo className="mr-2" />
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};







// import React, { useState } from 'react';
// import { FaChevronDown, FaUndo } from 'react-icons/fa'; // Importing icons from react-icons

// interface ScopeSelectionProps {
//   onConfirm: () => void;
//   onReset: () => void;
// }

// export const ScopeSelection: React.FC<ScopeSelectionProps> = ({ onConfirm, onReset }) => {
//   const [isScopeCollapsed, setIsScopeCollapsed] = useState(false);

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       {/* Header */}
//       <div className="bg-gray-200 text-black p-4 flex justify-between items-center">
//         <h2 className="text-sm font-semibold">
//           {isScopeCollapsed ? 'Current Selected Scope:' : 'Scope Selection'}
//         </h2>
//         {/* {isScopeCollapsed && (
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setIsScopeCollapsed(!isScopeCollapsed)}
//               className="flex items-center px-5 py-1.5 text-gray-700  bg-white hover:bg-purple-50 rounded-md text-sm transition-colors"
//             >
//               <FaChevronDown className="mr-2" />
//               Show more details
//             </button>
//             <button
//               onClick={onReset}
//               className="flex items-center px-3 py-1.5 text-gray-700 bg-white hover:bg-purple-600 rounded-md text-sm transition-colors"
//             >
//               <FaUndo className="mr-2" />
//               Reset
//             </button>
//           </div>
//         )} */}
//       </div>

//       {/* Body */}
//       {!isScopeCollapsed ? (
//         <div className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {/* Market */}
//             <div>
//               <label className="block text-sm text-gray-600 mb-2">Market</label>
//               <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
//                 <option value="BR">BR</option>
//               </select>
//             </div>

//             {/* Region */}
//             <div>
//               <label className="block text-sm text-gray-600 mb-2">Region</label>
//               <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
//                 <option value="AREA I">AREA I</option>
//               </select>
//             </div>

//             {/* BU */}
//             <div>
//               <label className="block text-sm text-gray-600 mb-2">BU</label>
//               <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
//                 <option value="BRAZIL">BRAZIL</option>
//               </select>
//             </div>

//             {/* Category */}
//             <div>
//               <label className="block text-sm text-gray-600 mb-2">Category</label>
//               <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
//                 <option value="POWDERED BEVERAGES">POWDERED BEVERAGES</option>
//               </select>
//             </div>

//             {/* Start Period */}
//             <div>
//               <label className="block text-sm text-gray-600 mb-2">Start Period</label>
//               <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
//                 <option value="05/2022">05/2022</option>
//               </select>
//             </div>

//             {/* End Period */}
//             <div>
//               <label className="block text-sm text-gray-600 mb-2">End Period</label>
//               <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
//                 <option value="04/2023">04/2023</option>
//               </select>
//             </div>
//           </div>

//           {/* Footer Buttons */}
//           <div className="flex justify-between mt-6 ">
//             <button
//               onClick={() => setIsScopeCollapsed(!isScopeCollapsed)}
//               className="flex items-center px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-md text-sm transition-colors"
//             >
//               <FaChevronDown className="mr-2" />
//               Collapse
//             </button>
//             <div className="flex gap-2">
//               <button
//                 onClick={onConfirm}
//                 className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-md text-sm transition-colors"
//               >
//                 Confirm Scope
//               </button>
//               <button
//                 onClick={onReset}
//                 className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-md text-sm transition-colors"
//               >
//                 Reset Scope
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="p-4 pt-1">
//           {/* Selected Scope Details */}
//           <div className="text-md pb-5 text-gray-700 p-4 rounded-md">
//             <span className="font-semibold">BU:</span> BRAZIL |{' '}
//             <span className="font-semibold">Region:</span> AREA I |{' '}
//             <span className="font-semibold">Market:</span> BR |{' '}
//             <span className="font-semibold">Category:</span> BISCUITS |{' '}
//             <span className="font-semibold">Period:</span> 05/2022 - 07/2022
//           </div>
//           {isScopeCollapsed && (
//             <div className="flex items-center justify-between w-full">
//             <button
//               onClick={() => setIsScopeCollapsed(!isScopeCollapsed)}
//               className="flex items-center px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-md text-sm transition-colors"
//             >
//               <FaChevronDown className="mr-2" />
//               Show more details
//             </button>
//             <button
//               onClick={onReset}
//               className="flex items-center px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-md text-sm transition-colors"
//             >
//               <FaUndo className="mr-2" />
//               Reset
//             </button>
//           </div>
//         )}
//         </div>
//       )}
//     </div>
//   );
// };






