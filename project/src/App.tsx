import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/common/Header/Header';
import { Footer } from './components/common/Footer/Footer';
import { Navigation } from './components/common/Navigation/Navigation';
import { Filters } from './components/common/Filters/Filters';
import { ExecutiveSummary } from './components/Descriptive/ExecutiveSummary';
import { RegionalSummary } from './components/Descriptive/RegionalSummary';
import { CategorySummary } from './components/Descriptive/CategorySummary';
import { PriceMarketLandscape } from './components/Descriptive/PriceMarketLandscape';
import { PriceDistribution } from './components/Descriptive/PriceDistribution';
import { PriceEvaluation } from './components/Descriptive/PriceEvaluation';
import { PriceEvaluationPatterns } from './components/Descriptive/PriceEvaluationPatterns';
import { ProfitLoss } from './components/Descriptive/ProfitLoss';
import { ModelEvaluation1 } from './components/Diagnostic/ModelEvaluation1';
import { ModelEvaluation2 } from './components/Diagnostic/ModelEvaluation2';
import { ModelResults } from './components/Diagnostic/ModelResults';
import { SimulationOptimization } from './components/Predictive/SimulationOptimization';
import { ScenarioReview } from './components/Predictive/ScenarioReview';

function App() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const toggleFiltersVisibility = (isVisible) => {
    setIsFiltersVisible(isVisible);
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-[#f5f5f5]">
        {/* Navigation Sidebar */}
        <Navigation />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col pl-16"> {/* Fixed padding for navigation */}
          <Header />

          <main className="flex-1 px-6 py-4 flex overflow-hidden">
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<ExecutiveSummary />} />
                <Route path="/executive-summary" element={<ExecutiveSummary />} />
                <Route path="/category-summary" element={<CategorySummary />} />
                <Route path="/regional-summary" element={<RegionalSummary />} />
                <Route path="/price-market-landscape" element={<PriceMarketLandscape />} />
                <Route path="/price-distribution" element={<PriceDistribution />} />
                <Route path="/price-evaluation" element={<PriceEvaluation />} />
                <Route path="/price-evaluation-patterns" element={<PriceEvaluationPatterns />} />
                <Route path="/profit-loss" element={<ProfitLoss />} />
                {/* Diagnostic Routes */}
                <Route path="/model-evaluation-1" element={<ModelEvaluation1 />} />
                <Route path="/model-evaluation-2" element={<ModelEvaluation2 />} />
                <Route path="/model-results" element={<ModelResults />} />
                {/* Predictive */}
                <Route path="/simulation-optimization" element={<SimulationOptimization />} />
                <Route path="/scenario-review" element={<ScenarioReview />} />
              </Routes>
            </div>

            {/* Hoverable Filters Sidebar */}
            <Filters isVisible={isFiltersVisible} toggleVisibility={toggleFiltersVisibility} />
          </main>

          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;





// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Header } from './components/common/Header/Header';
// import { Footer } from './components/common/Footer/Footer';
// import { Navigation } from './components/common/Navigation/Navigation';
// import { Filters } from './components/common/Filters/Filters';
// import { ExecutiveSummary } from './components/Descriptive/ExecutiveSummary';
// import { RegionalSummary } from './components/Descriptive/RegionalSummary';
// import { CategorySummary } from './components/Descriptive/CategorySummary';
// import { PriceMarketLandscape } from './components/Descriptive/PriceMarketLandscape';
// import { PriceDistribution } from './components/Descriptive/PriceDistribution';
// import { PriceEvaluation } from './components/Descriptive/PriceEvaluation';
// import { PriceEvaluationPatterns } from './components/Descriptive/PriceEvaluationPatterns';
// import { ProfitLoss } from './components/Descriptive/ProfitLoss';

// function App() {
//   const [isFiltersVisible, setIsFiltersVisible] = useState(false);

//   const toggleFiltersVisibility = (isVisible) => {
//     setIsFiltersVisible(isVisible);
//   };

//   return (
//     <Router>
//       <div className="flex min-h-screen bg-[#f5f5f5]">
//         {/* Navigation Sidebar */}
//         <Navigation />

//         {/* Main Content Area */}
//         <div className="flex-1 flex flex-col pl-16"> {/* Fixed padding for navigation */}
//           <Header />

//           <main className="flex-1 px-6 py-4 flex overflow-hidden">
//             {/* Main Content */}
//             <div className="flex-1 overflow-y-auto">
//               <Routes>
//                 <Route path="/" element={<ExecutiveSummary />} />
//                 <Route path="/executive-summary" element={<ExecutiveSummary />} />
//                 <Route path="/category-summary" element={<CategorySummary />} />
//                 <Route path="/regional-summary" element={<RegionalSummary />} />
//                 <Route path="/price-market-landscape" element={<PriceMarketLandscape />} />
//                 <Route path="/price-distribution" element={<PriceDistribution />} />
//                 <Route path="/price-evaluation" element={<PriceEvaluation />} />
//                 <Route path="/price-evaluation-patterns" element={<PriceEvaluationPatterns />} />
//                 <Route path="/profit-loss" element={<ProfitLoss />} />
//               </Routes>
//             </div>

//             {/* Hoverable Filters Sidebar */}
//             <Filters isVisible={isFiltersVisible} toggleVisibility={toggleFiltersVisibility} />
//           </main>

//           <Footer />
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;



// import React, { useState } from 'react';
// import { Header } from './components/common/Header/Header';
// import { Footer } from './components/common/Footer/Footer';
// import { Navigation } from './components/common/Navigation/Navigation';
// import { Filters } from './components/common/Filters/Filters';
// import { ExecutiveSummary } from './components/Descriptive/ExecutiveSummary';

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
//             {/* Render the Executive Summary or other views based on navigation */}
//             <ExecutiveSummary />
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













