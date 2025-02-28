//App.jsx
import { useState } from 'react';
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
import { ModelResults } from './components/Diagnostic/ModelResult';
import { OptimizationGuide } from './components/PredictiveAndPrescriptive/OptimizationGuide';
import { TaskSummary } from './components/PredictiveAndPrescriptive/TaskSummary';
import { SimulationOptimization } from './components/PredictiveAndPrescriptive/SimulationOptimization';
import { ScenarioSummary } from './components/PredictiveAndPrescriptive/ScenarioSummary';
import { ScenarioReview } from './components/PredictiveAndPrescriptive/ScenarioReview';
import DataComponent from './DataComponent';
function App() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const toggleFiltersVisibility = (isVisible: boolean) => {
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

         {/*supbase */}
          <div>
           <DataComponent />
          </div>

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
                {/* Predictive & Prescriptive */}
                <Route path= "/Optimization-Guide" element={<OptimizationGuide />} />
                <Route path= "/Task-Summary" element={<TaskSummary />} />
                <Route path= "/Simulation-Optimization" element={<SimulationOptimization />} />
                <Route path= "/Scenario-Summary" element={<ScenarioSummary />} />
                <Route path= "/Scenario-Overall-Results" element={<ScenarioReview />} />
                <Route path= "/MFG-P&L-Waterfall" element={<ScenarioReview />} />
                <Route path= "/MFG-P&L-Tabular-View" element={<ScenarioReview />} />
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
