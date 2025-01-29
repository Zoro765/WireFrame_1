import React, { useState } from 'react';
import { Info } from 'lucide-react';

export function Header() {
  const [activeButton, setActiveButton] = useState(null);
  const [showSecondaryNav, setShowSecondaryNav] = useState(false);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName === 'Descriptive') {
      setShowSecondaryNav(!showSecondaryNav);
    } else {
      setShowSecondaryNav(false);
    }
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
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=248,fit=crop,q=95/mnl9o5EwDJhOxRQ9/adraca-logo-2-upscaled-bgr-dOqyLakEyxsy4jaZ.png"
            alt="Mondelez"
            className="h-8 w-auto object-contain transition-transform duration-300 hover:scale-105 filter brightness-100 contrast-100"
          />
        </div>
      </header>

      {/* Primary Navigation */}
      <nav className="bg-white text-[#4a235a] px-6 py-2 border-b border-purple-200 shadow-lg flex items-center justify-between">
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
      {showSecondaryNav && (
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
      )}
    </div>
  );
}


// import React, { useState } from 'react';
// import { Info } from 'lucide-react';

// export function Header() {
//   const [activeButton, setActiveButton] = useState(null);

//   const handleButtonClick = (buttonName) => {
//     setActiveButton(buttonName);
//   };

//   return (
//     <div className="font-sans">
//       {/* Main Header */}
//       <header className="bg-gradient-to-r from-[#4a235a] to-[#6b3480] text-white px-6 py-4 flex items-center justify-between shadow-2xl">
//         <div className="flex items-center gap-3">
//           <Info className="w-6 h-6 text-purple-200 hover:text-purple-300 transition-all duration-300" />
//           <h1 className="text-2xl font-bold text-purple-50 tracking-tight">Executive Summary</h1>
//         </div>
//         <div className="flex items-center gap-6">
//           <span className="text-sm text-purple-100 font-medium">Last Refreshed: 1/30/2022</span>
//           <img
//             src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=248,fit=crop,q=95/mnl9o5EwDJhOxRQ9/adraca-logo-2-upscaled-bgr-dOqyLakEyxsy4jaZ.png"
//             alt="Mondelez"
//             className="h-8 w-auto object-contain transition-transform duration-300 hover:scale-105 filter brightness-100 contrast-100"
//           />
//         </div>
//       </header>

//       {/* Primary Navigation */}
//       <nav className="bg-white text-[#4a235a] px-6 py-2 border-b border-purple-200 shadow-lg">
//         <div className="flex gap-4 text-sm">
//           <button 
//             className={`px-5 py-2 ${activeButton === 'Descriptive' ? 'bg-purple-100 shadow-inner' : 'bg-white'} rounded-lg hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-semibold`}
//             onClick={() => handleButtonClick('Descriptive')}
//           >
//             Descriptive
//           </button>
//           <button 
//             className={`px-5 py-2 ${activeButton === 'Diagnostics' ? 'bg-purple-100 shadow-inner' : 'bg-white'} rounded-lg hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-semibold`}
//             onClick={() => handleButtonClick('Diagnostics')}
//           >
//             Diagnostics
//           </button>
//           <button 
//             className={`px-5 py-2 ${activeButton === 'Predictive & Prescriptive' ? 'bg-purple-100 shadow-inner' : 'bg-white'} rounded-lg hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-semibold`}
//             onClick={() => handleButtonClick('Predictive & Prescriptive')}
//           >
//             Predictive & Prescriptive
//           </button>
//         </div>
//       </nav>

      

//       {/* Secondary Navigation */}
//       <div className="bg-white text-[#4a235a] px-6 py-2 border-b border-purple-200 shadow-lg">
//         <div className="flex gap-3 text-sm overflow-x-auto">
//           <button 
//             className={`px-4 py-1.5 ${activeButton === 'Category Summary' ? 'bg-purple-100 shadow-inner' : 'bg-white'} rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
//             onClick={() => handleButtonClick('Category Summary')}
//           >
//             Category Summary
//           </button>
//           <button 
//             className={`px-4 py-1.5 ${activeButton === 'Regional Summary' ? 'bg-purple-100 shadow-inner' : 'bg-white'} rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
//             onClick={() => handleButtonClick('Regional Summary')}
//           >
//             Regional Summary
//           </button>
//           <button 
//             className={`px-4 py-1.5 ${activeButton === 'Price/Market Landscape' ? 'bg-purple-100 shadow-inner' : 'bg-white'} rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
//             onClick={() => handleButtonClick('Price/Market Landscape')}
//           >
//             Price/Market Landscape
//           </button>
//           <button 
//             className={`px-4 py-1.5 ${activeButton === 'Price & Distribution' ? 'bg-purple-100 shadow-inner' : 'bg-white'} rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
//             onClick={() => handleButtonClick('Price & Distribution')}
//           >
//             Price & Distribution
//           </button>
//           <button 
//             className={`px-4 py-1.5 ${activeButton === 'Price Evaluation' ? 'bg-purple-100 shadow-inner' : 'bg-white'} rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
//             onClick={() => handleButtonClick('Price Evaluation')}
//           >
//             Price Evaluation
//           </button>
//           <button 
//             className={`px-4 py-1.5 ${activeButton === 'Price Evaluation (Patterns)' ? 'bg-purple-100 shadow-inner' : 'bg-white'} rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
//             onClick={() => handleButtonClick('Price Evaluation (Patterns)')}
//           >
//             Price Evaluation (Patterns)
//           </button>
//           <button 
//             className={`px-4 py-1.5 ${activeButton === 'P&L' ? 'bg-purple-100 shadow-inner' : 'bg-white'} rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
//             onClick={() => handleButtonClick('P&L')}
//           >
//             P&L
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }