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
import { ModelEvaluation1 } from './components/Diagnostic/Model Evaluation 1';
import { ModelEvaluation2 } from './components/Diagnostic/Model Evaluation 2';
import { ModelResults } from './components/Diagnostic/Model Results';
import { ScenarioSummary } from './components/Predictive & Prescriptive/Scenario Summary';

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
                {/* Predictive & Perscriptive */}
                {/* <Route path="/optimization-guide" element={<OptimizationGuide />} /> */}
                {/* <Route path="/optimization-guide" element={<OptimizationGuide />} /> */}
                {/* <Route path="/scenario-summary" element={<ScenarioReview />} /> */}
                <Route path="/scenario-summary" element={<ScenarioSummary />} />
                {/* <Route path="/scenario-summary" element={<Simulation />} /> */}
                {/* <Route path="/scenario-summary" element={<TaskSummary />} /> */}

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