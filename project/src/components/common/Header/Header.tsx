import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Info } from 'lucide-react';

export function Header() {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [showSecondaryNav, setShowSecondaryNav] = useState(false);
  const location = useLocation(); // Get the current route location

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
    if (buttonName === 'Descriptive') {
      setShowSecondaryNav(!showSecondaryNav);
    } else {
      setShowSecondaryNav(false);
    }
  };

  // Function to determine the heading based on the current route
  const getHeading = () => {
    switch (location.pathname) {
      case '/executive-summary':
        return 'Executive Summary';
      case '/category-summary':
        return 'Category Summary';
      case '/regional-summary':
        return 'Regional Summary';
      case '/price-market-landscape':
        return 'Price/Market Landscape';
      case '/price-distribution':
        return 'Price & Distribution';
      case '/price-evaluation':
        return 'Price Evaluation';
      case '/price-evaluation-patterns':
        return 'Price Evaluation (Patterns)';
      case '/profit-loss':
        return 'P&L';
      case '/model-evaluation-1':
        return 'Model Evaluation 1'
      default:
        return 'Executive Summary';
    }
  };

  return (
    <div className="font-sans">
      {/* Main Header */}
      <header className="bg-gradient-to-r from-[#4a235a] to-[#6b3480] text-white px-6 py-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <Info className="w-6 h-6 text-purple-200 hover:text-purple-300 transition-all duration-300" />
          <h1 className="text-2xl font-bold text-purple-50 tracking-tight">{getHeading()}</h1>
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
            className={`px-5 py-2 ${
              activeButton === 'Descriptive' ? 'bg-purple-100 shadow-inner' : 'bg-white'
            } rounded-lg hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-semibold`}
            onClick={() => handleButtonClick('Descriptive')}
          >
            Descriptive
          </button>
          <button
            className={`px-5 py-2 ${
              activeButton === 'Diagnostics' ? 'bg-purple-100 shadow-inner' : 'bg-white'
            } rounded-lg hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-semibold`}
            onClick={() => handleButtonClick('Diagnostics')}
          >
            Diagnostics
          </button>
          <button
            className={`px-5 py-2 ${
              activeButton === 'Predictive & Prescriptive' ? 'bg-purple-100 shadow-inner' : 'bg-white'
            } rounded-lg hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-semibold`}
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
            <Link
              to="/executive-summary"
              className={`px-4 py-1.5 ${
                activeButton === 'Executive Summary' ? 'bg-purple-100 shadow-inner' : 'bg-white'
              } rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
              onClick={() => setActiveButton('Executive Summary')}
            >
              Executive Summary
            </Link>
            <Link
              to="/category-summary"
              className={`px-4 py-1.5 ${
                activeButton === 'Category Summary' ? 'bg-purple-100 shadow-inner' : 'bg-white'
              } rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
              onClick={() => setActiveButton('Category Summary')}
            >
              Category Summary
            </Link>
            <Link
              to="/regional-summary"
              className={`px-4 py-1.5 ${
                activeButton === 'Regional Summary' ? 'bg-purple-100 shadow-inner' : 'bg-white'
              } rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
              onClick={() => setActiveButton('Regional Summary')}
            >
              Regional Summary
            </Link>
            <Link
              to="/price-market-landscape"
              className={`px-4 py-1.5 ${
                activeButton === 'Price/Market Landscape' ? 'bg-purple-100 shadow-inner' : 'bg-white'
              } rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
              onClick={() => setActiveButton('Price/Market Landscape')}
            >
              Price/Market Landscape
            </Link>
            <Link
              to="/price-distribution"
              className={`px-4 py-1.5 ${
                activeButton === 'Price & Distribution' ? 'bg-purple-100 shadow-inner' : 'bg-white'
              } rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
              onClick={() => setActiveButton('Price & Distribution')}
            >
              Price & Distribution
            </Link>
            <Link
              to="/price-evaluation"
              className={`px-4 py-1.5 ${
                activeButton === 'Price Evaluation' ? 'bg-purple-100 shadow-inner' : 'bg-white'
              } rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
              onClick={() => setActiveButton('Price Evaluation')}
            >
              Price Evaluation
            </Link>
            <Link
              to="/price-evaluation-patterns"
              className={`px-4 py-1.5 ${
                activeButton === 'Price Evaluation (Patterns)' ? 'bg-purple-100 shadow-inner' : 'bg-white'
              } rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
              onClick={() => setActiveButton('Price Evaluation (Patterns)')}
            >
              Price Evaluation (Patterns)
            </Link>
            <Link
              to="/profit-loss"
              className={`px-4 py-1.5 ${
                activeButton === 'P&L' ? 'bg-purple-100 shadow-inner' : 'bg-white'
              } rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
              onClick={() => setActiveButton('P&L')}
            >
              P&L
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Info } from 'lucide-react';

// export function Header() {
//   const [activeButton, setActiveButton] = useState<string | null>(null);
//   const [showSecondaryNav, setShowSecondaryNav] = useState(false);

//   const handleButtonClick = (buttonName: string) => {
//     setActiveButton(buttonName);
//     if (buttonName === 'Descriptive') {
//       setShowSecondaryNav(!showSecondaryNav);
//     } else {
//       setShowSecondaryNav(false);
//     }
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
//       <nav className="bg-white text-[#4a235a] px-6 py-2 border-b border-purple-200 shadow-lg flex items-center justify-between">
//         <div className="flex gap-4 text-sm">
//           <button
//             className={`px-5 py-2 ${
//               activeButton === 'Descriptive' ? 'bg-purple-100 shadow-inner' : 'bg-white'
//             } rounded-lg hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-semibold`}
//             onClick={() => handleButtonClick('Descriptive')}
//           >
//             Descriptive
//           </button>
//           <button
//             className={`px-5 py-2 ${
//               activeButton === 'Diagnostics' ? 'bg-purple-100 shadow-inner' : 'bg-white'
//             } rounded-lg hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-semibold`}
//             onClick={() => handleButtonClick('Diagnostics')}
//           >
//             Diagnostics
//           </button>
//           <button
//             className={`px-5 py-2 ${
//               activeButton === 'Predictive & Prescriptive' ? 'bg-purple-100 shadow-inner' : 'bg-white'
//             } rounded-lg hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-semibold`}
//             onClick={() => handleButtonClick('Predictive & Prescriptive')}
//           >
//             Predictive & Prescriptive
//           </button>
//         </div>
//       </nav>

//       {/* Secondary Navigation */}
//       {showSecondaryNav && (
//         <div className="bg-white text-[#4a235a] px-6 py-2 border-b border-purple-200 shadow-lg">
//           <div className="flex gap-3 text-sm overflow-x-auto">
//             <Link
//               to="/executive-summary"
//               className={`px-4 py-1.5 ${
//                 activeButton === 'Executive Summary' ? 'bg-purple-100 shadow-inner' : 'bg-white'
//               } rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
//               onClick={() => setActiveButton('Executive Summary')}
//             >
//               Executive Summary
//             </Link>
//             <Link
//               to="/category-summary"
//               className={`px-4 py-1.5 ${
//                 activeButton === 'Category Summary' ? 'bg-purple-100 shadow-inner' : 'bg-white'
//               } rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
//               onClick={() => setActiveButton('Category Summary')}
//             >
//               Category Summary
//             </Link>
//             <Link
//               to="/regional-summary"
//               className={`px-4 py-1.5 ${
//                 activeButton === 'Regional Summary' ? 'bg-purple-100 shadow-inner' : 'bg-white'
//               } rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
//               onClick={() => setActiveButton('Regional Summary')}
//             >
//               Regional Summary
//             </Link>
//             <Link
//               to="/price-market-landscape"
//               className={`px-4 py-1.5 ${
//                 activeButton === 'Price/Market Landscape' ? 'bg-purple-100 shadow-inner' : 'bg-white'
//               } rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
//               onClick={() => setActiveButton('Price/Market Landscape')}
//             >
//               Price/Market Landscape
//             </Link>
//             <Link
//               to="/price-distribution"
//               className={`px-4 py-1.5 ${
//                 activeButton === 'Price & Distribution' ? 'bg-purple-100 shadow-inner' : 'bg-white'
//               } rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
//               onClick={() => setActiveButton('Price & Distribution')}
//             >
//               Price & Distribution
//             </Link>
//             <Link
//               to="/price-evaluation"
//               className={`px-4 py-1.5 ${
//                 activeButton === 'Price Evaluation' ? 'bg-purple-100 shadow-inner' : 'bg-white'
//               } rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
//               onClick={() => setActiveButton('Price Evaluation')}
//             >
//               Price Evaluation
//             </Link>
//             <Link
//               to="/price-evaluation-patterns"
//               className={`px-4 py-1.5 ${
//                 activeButton === 'Price Evaluation (Patterns)' ? 'bg-purple-100 shadow-inner' : 'bg-white'
//               } rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
//               onClick={() => setActiveButton('Price Evaluation (Patterns)')}
//             >
//               Price Evaluation (Patterns)
//             </Link>
//             <Link
//               to="/profit-loss"
//               className={`px-4 py-1.5 ${
//                 activeButton === 'P&L' ? 'bg-purple-100 shadow-inner' : 'bg-white'
//               } rounded-md hover:bg-purple-50 hover:shadow-md transition-all duration-300 font-medium whitespace-nowrap`}
//               onClick={() => setActiveButton('P&L')}
//             >
//               P&L
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


