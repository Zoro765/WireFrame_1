import React, { useState } from 'react';
import { ScopeSelection } from './components/ScopeSelection';
import { KPICard } from './components/KPICard';
import { DataTable } from './components/DataTable';
import { kpiData } from './data/kpiData';
import { OptimizationConstraints } from './components/OptimizationConstraints';

export const SimulationOptimization: React.FC = () => {
  const [isScopeConfirmed, setIsScopeConfirmed] = useState(false);
  const [isScopeCollapsed, setIsScopeCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const handleConfirmScope = () => {
    setIsScopeConfirmed(true); // Only confirm the scope, do not collapse
  };

  const handleResetScope = () => {
    setIsScopeConfirmed(false);
    setIsScopeCollapsed(false); // Reset collapse state
  };

  const handleOptimizeClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="flex flex-col p-2 gap-4">
      {/* Scope Selection Section */}
      <ScopeSelection 
        onConfirm={handleConfirmScope} 
        onReset={handleResetScope} 
        isScopeCollapsed={isScopeCollapsed}
        setIsScopeCollapsed={setIsScopeCollapsed}
      />

      {/* KPI Cards - Show only when scope is collapsed */}
      {isScopeCollapsed && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>
      )}

      {/* Filter Info and Data Table - Show only when scope is confirmed */}
      {isScopeConfirmed && (
        <>
          <div className="text-xs text-gray-600 mb-0 mt-0 leading-tight ml-1">
            <span className="font-semibold">Channel: All | Type: All | Brand: All | PPG: All</span>
          </div>
          <DataTable />
        </>
      )}

      {/* Bottom Buttons */}
      <div className="flex justify-between mt-4 mb-4">
        <button className="px-4 py-2 bg-white hover:bg-purple-50 text-gray rounded-md text-lg transition-colors">
          Reset Inputs to Default
        </button>
        <div className="space-x-2">
          {isScopeCollapsed && (
            <button
              onClick={handleOptimizeClick}
              className="px-4 py-2 bg-white hover:bg-purple-50 text-gray rounded-md text-lg transition-colors"
            >
              Optimize
            </button>
          )}
          <button className="px-4 py-2 bg-white hover:bg-purple-50 text-gray rounded-md text-lg transition-colors">
            Add & Review
          </button>
          <button className="px-4 py-2 bg-white hover:bg-purple-50 text-gray rounded-md text-lg transition-colors">
            Load Scenario
          </button>
        </div>
      </div>

      {/* Modal Window */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 pl-20">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-[90%] p-6 ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Optimization Constraints</h2>
              <button
                onClick={handleCloseModal}
                className="text-xl text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <OptimizationConstraints />
          </div>
        </div>
      )}
    </div>
  );
};






// import React, { useState } from 'react';
// import { ScopeSelection } from './components/ScopeSelection';
// import { KPICard } from './components/KPICard';
// import { DataTable } from './components/DataTable';
// import { kpiData } from './data/kpiData';

// export const SimulationOptimization: React.FC = () => {
//   const [isScopeConfirmed, setIsScopeConfirmed] = useState(false);
//   const [isScopeCollapsed, setIsScopeCollapsed] = useState(false);

//   const handleConfirmScope = () => {
//     setIsScopeConfirmed(true);
//     // setIsScopeCollapsed(true);
//   };

//   const handleResetScope = () => {
//     setIsScopeConfirmed(false);
//     setIsScopeCollapsed(false);
//   };

//   return (
//     <div className="flex flex-col min-h-screen p-4 gap-4">
//       {/* Scope Selection Section */}
//       <ScopeSelection 
//         onConfirm={handleConfirmScope} 
//         onReset={handleResetScope} 
//         isScopeCollapsed={isScopeCollapsed}
//         setIsScopeCollapsed={setIsScopeCollapsed}
//       />

//       {/* KPI Cards - Show only when scope is collapsed */}
//       {isScopeCollapsed && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {kpiData.map((kpi, index) => (
//             <KPICard key={index} {...kpi} />
//           ))}
//         </div>
//       )}

//       {/* Filter Info and Data Table - Show only when scope is confirmed */}
//       {isScopeConfirmed && (
//         <>
//           <div className="text-xs text-gray-600 mb-0 mt-0 leading-tight ml-1">
//           Channel: All | Type: All | Brand: All | PPG: All
//           </div>
//           <DataTable />
//         </>
//       )}

//       {/* Bottom Buttons */}
//       <div className="flex justify-between mt-auto">
//         <button className="px-4 py-2 bg-white hover:bg-purple-50 text-gray rounded-md text-lg transition-colors">
//           Reset Inputs to Default
//         </button>
//         <div className="space-x-2">
//           {isScopeCollapsed && (
//             <button className="px-4 py-2 bg-white hover:bg-purple-50 text-gray rounded-md text-lg transition-colors">
//               Optimize
//             </button>
//           )}
//           <button className="px-4 py-2 bg-white hover:bg-purple-50 text-gray rounded-md text-lg transition-colors">
//             Add & Review
//           </button>
//           <button className="px-4 py-2 bg-white hover:bg-purple-50 text-gray rounded-md text-lg transition-colors">
//             Load Scenario
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };



