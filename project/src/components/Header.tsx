import { Filter } from 'lucide-react';
import { Info } from 'lucide-react';

export function Header() {
  return (
    <div>
      <header className="bg-[#4a235a] text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5" />
          <h1 className="text-xl font-semibold">Executive Summary</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">Last Refreshed Date: 11/30/2022</span>
          <img 
            src="https://www.mondelezinternational.com/-/media/Mondelez/Snacking-Made-Right/Home/Mondelez_Logo_White_2.png" 
            alt="Mondelez" 
            className="h-8"
          />
        </div>
      </header>
      <nav className="bg-[#4a235a] text-white px-6 py-2 border-t border-purple-700">
        <div className="flex gap-6 text-sm">
          <button className="px-4 py-1 bg-[#6b3480] rounded">Descriptive</button>
          <button className="px-4 py-1 hover:bg-[#6b3480] rounded">Diagnostics</button>
          <button className="px-4 py-1 hover:bg-[#6b3480] rounded">Predictive & Prescriptive</button>
        </div>
      </nav>
      <div className="bg-[#4a235a] text-white px-6 py-2 border-t border-purple-700">
        <div className="flex gap-4 text-sm">
          <button className="px-3 py-1 bg-[#6b3480] rounded text-xs">Category Summary</button>
          <button className="px-3 py-1 hover:bg-[#6b3480] rounded text-xs">Regional Summary</button>
          <button className="px-3 py-1 hover:bg-[#6b3480] rounded text-xs">Price/Market Landscape</button>
          <button className="px-3 py-1 hover:bg-[#6b3480] rounded text-xs">Price & Distribution</button>
          <button className="px-3 py-1 hover:bg-[#6b3480] rounded text-xs">Price Evaluation</button>
          <button className="px-3 py-1 hover:bg-[#6b3480] rounded text-xs">Price Evaluation (Patterns)</button>
          <button className="px-3 py-1 hover:bg-[#6b3480] rounded text-xs">P&L</button>
        </div>
      </div>
    </div>
  );
}