import React, { useState } from 'react';
import { Info } from 'lucide-react';

export function Header() {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="font-sans">
      {/* Main Header */}
      <header className="bg-gradient-to-r from-[#4a235a] to-[#6b3480] text-white px-6 py-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <Info className="w-6 h-6 text-purple-200 hover:text-purple-300 transition-all duration-300" />
          <h1 className="text-2xl font-bold text-purple-50 tracking-tight">Executive Summary</h1>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm text-purple-100 font-medium">Last Refreshed: 1/30/2022</span>
          <img
            src="https://images.ctfassets.net/zo243s55pyir/719KXtcdFDKs7y4lwanRCy/e2cbd8b9c74b86615ff14b885cffe8a1/logo.png?fm=webp&q=80"
            alt="Mondelez"
            className="h-10 transition-transform duration-300 hover:scale-105"
          />
        </div>
      </header>

      {/* Primary Navigation */}
      <nav className="bg-white text-[#4a235a] px-6 py-2 border-b border-purple-200 shadow-lg">
        <div className="flex gap-4 text-sm">
          <button 
            className={`px-5 py-2 ${activeButton === 'Descriptive' ? 'bg-purple-100 shadow-inner' : 'bg-white'} rounded-lg hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-semibold`}
            onClick={() => handleButtonClick('Descriptive')}
          >
            Descriptive
          </button>
          <button 
            className={`px-5 py-2 ${activeButton === 'Diagnostics' ? 'bg-purple-100 shadow-inner' : 'bg-white'} rounded-lg hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-semibold`}
            onClick={() => handleButtonClick('Diagnostics')}
          >
            Diagnostics
          </button>
          <button 
            className={`px-5 py-2 ${activeButton === 'Predictive & Prescriptive' ? 'bg-purple-100 shadow-inner' : 'bg-white'} rounded-lg hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-semibold`}
            onClick={() => handleButtonClick('Predictive & Prescriptive')}
          >
            Predictive & Prescriptive
          </button>
        </div>
      </nav>

      {/* Secondary Navigation */}
      <div className="bg-white text-[#4a235a] px-6 py-2 border-b border-purple-200 shadow-lg">
        <div className="flex gap-3 text-sm overflow-x-auto">
          <button 
            className={`px-4 py-1.5 ${activeButton === 'Category Summary' ? 'bg-purple-100 shadow-inner' : 'bg-white'} rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
            onClick={() => handleButtonClick('Category Summary')}
          >
            Category Summary
          </button>
          <button 
            className={`px-4 py-1.5 ${activeButton === 'Regional Summary' ? 'bg-purple-100 shadow-inner' : 'bg-white'} rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
            onClick={() => handleButtonClick('Regional Summary')}
          >
            Regional Summary
          </button>
          <button 
            className={`px-4 py-1.5 ${activeButton === 'Price/Market Landscape' ? 'bg-purple-100 shadow-inner' : 'bg-white'} rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
            onClick={() => handleButtonClick('Price/Market Landscape')}
          >
            Price/Market Landscape
          </button>
          <button 
            className={`px-4 py-1.5 ${activeButton === 'Price & Distribution' ? 'bg-purple-100 shadow-inner' : 'bg-white'} rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
            onClick={() => handleButtonClick('Price & Distribution')}
          >
            Price & Distribution
          </button>
          <button 
            className={`px-4 py-1.5 ${activeButton === 'Price Evaluation' ? 'bg-purple-100 shadow-inner' : 'bg-white'} rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
            onClick={() => handleButtonClick('Price Evaluation')}
          >
            Price Evaluation
          </button>
          <button 
            className={`px-4 py-1.5 ${activeButton === 'Price Evaluation (Patterns)' ? 'bg-purple-100 shadow-inner' : 'bg-white'} rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
            onClick={() => handleButtonClick('Price Evaluation (Patterns)')}
          >
            Price Evaluation (Patterns)
          </button>
          <button 
            className={`px-4 py-1.5 ${activeButton === 'P&L' ? 'bg-purple-100 shadow-inner' : 'bg-white'} rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
            onClick={() => handleButtonClick('P&L')}
          >
            P&L
          </button>
        </div>
      </div>
    </div>
  );
}




// import { Filter, Info } from 'lucide-react';

// export function Header() {
//   return (
//     <div>
//       {/* Main Header */}
//       <header className="bg-gradient-to-r from-[#4a235a] to-[#6b3480] text-white px-6 py-4 flex items-center justify-between shadow-lg">
//         <div className="flex items-center gap-3">
//           <Info className="w-6 h-6 text-purple-200" />
//           <h1 className="text-2xl font-bold text-purple-50">Executive Summary</h1>
//         </div>
//         <div className="flex items-center gap-6">
//           <span className="text-sm text-purple-100">Last Refreshed: 11/30/2022</span>
//           <img
//             src="https://images.ctfassets.net/zo243s55pyir/719KXtcdFDKs7y4lwanRCy/e2cbd8b9c74b86615ff14b885cffe8a1/logo.png?fm=webp&q=80"
//             alt="Mondelez"
//             className="h-10"
//           />
//         </div>
//       </header>

//       {/* Primary Navigation */}
//       <nav className="bg-[#4a235a] text-white px-6 py-2 border-t border-purple-700 shadow-sm">
//         <div className="flex gap-4 text-sm">
//           <button className="px-4 py-2 bg-[#6b3480] rounded-lg hover:bg-[#7d3c98] transition-all duration-200">
//             Descriptive
//           </button>
//           <button className="px-4 py-2 hover:bg-[#6b3480] rounded-lg transition-all duration-200">
//             Diagnostics
//           </button>
//           <button className="px-4 py-2 hover:bg-[#6b3480] rounded-lg transition-all duration-200">
//             Predictive & Prescriptive
//           </button>
//         </div>
//       </nav>

//       {/* Secondary Navigation */}
//       <div className="bg-[#4a235a] text-white px-6 py-2 border-t border-purple-700 shadow-sm">
//         <div className="flex gap-3 text-sm overflow-x-auto">
//           <button className="px-3 py-1 bg-[#6b3480] rounded-lg text-xs hover:bg-[#7d3c98] transition-all duration-200 whitespace-nowrap">
//             Category Summary
//           </button>
//           <button className="px-3 py-1 hover:bg-[#6b3480] rounded-lg text-xs transition-all duration-200 whitespace-nowrap">
//             Regional Summary
//           </button>
//           <button className="px-3 py-1 hover:bg-[#6b3480] rounded-lg text-xs transition-all duration-200 whitespace-nowrap">
//             Price/Market Landscape
//           </button>
//           <button className="px-3 py-1 hover:bg-[#6b3480] rounded-lg text-xs transition-all duration-200 whitespace-nowrap">
//             Price & Distribution
//           </button>
//           <button className="px-3 py-1 hover:bg-[#6b3480] rounded-lg text-xs transition-all duration-200 whitespace-nowrap">
//             Price Evaluation
//           </button>
//           <button className="px-3 py-1 hover:bg-[#6b3480] rounded-lg text-xs transition-all duration-200 whitespace-nowrap">
//             Price Evaluation (Patterns)
//           </button>
//           <button className="px-3 py-1 hover:bg-[#6b3480] rounded-lg text-xs transition-all duration-200 whitespace-nowrap">
//             P&L
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


