//App.jsx
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
import { ModelEvaluation1 } from './components/Diagonistic/ModelEvaluation1';
import { ModelEvaluation2 } from './components/Diagonistic/ModelEvaluation2';
import { ModelResults } from './components/Diagonistic/Model Results';
import { OptimizationGuide } from './components/PredictivePrescriptive/OptimizationGuide';
import { TaskSummary } from './components/PredictivePrescriptive/TaskSummary';
import { SimulationOptimization } from './components/PredictivePrescriptive/SimulationOptimization';
import { ScenarioSummary } from './components/PredictivePrescriptive/ScenarioSummary';
import { ScenarioReview } from './components/PredictivePrescriptive/ScenarioReview';


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
                <Route path="/Model-Evaluation-1" element={<ModelEvaluation1 />} />
                <Route path="/Model-Evaluation-2" element={<ModelEvaluation2 />} />
                <Route path="/Model-Results" element={<ModelResults />} />
                {/*Predictive & Prescriptive*/}
                <Route path= "/Optimization-Guide" element={<OptimizationGuide />} />
                <Route path= "/Task-Summary" element={<TaskSummary />} />
                <Route path= "/Simulation-Optimization" element={<SimulationOptimization />} />
                <Route path= "/Scenario-Summary" element={<ScenarioSummary />} />
                <Route path= "/Scenario-Overall-Results" element={<ScenarioReview />} />
                <Route path= "/MFG-P&L-Waterfall" element={<ScenarioReview />} />
                <Route path= "/MFG-P&L-Tabular-View" element={<ScenarioReview />} />
                <Route path= "/MixEva" element={<ScenarioReview />} />
                <Route path= "/Customer-Waterfall" element={<ScenarioReview />} />
                <Route path= "/Customer-Tabular-View" element={<ScenarioReview />} />
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













