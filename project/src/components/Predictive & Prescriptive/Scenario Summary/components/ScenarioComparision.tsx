// ChartData Interface
export interface ChartData {
  label: string;
  values: {
    sellOutVolume: number;
    netRevenue: number;
    grossMargin: number;
    avgPricePerUnit: number;
  };
}

// ScenarioChart Component
export function ScenarioChart() {
  const data: ChartData[] = [
    {
      label: '3%\nincreaseMDLZ_Refresh_Area 2',
      values: {
        sellOutVolume: 2.5,
        netRevenue: 3.5,
        grossMargin: 4.2,
        avgPricePerUnit: -1.5
      }
    }
  ];

  const gridValues = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5];
  const negativeGridValues = [-2, -1.5, -1, -0.5];

  const maxBarWidth = 6.5;

  return (
    <div className="w-[100%] h-[410px] bg-white rounded-lg shadow-lg p-6">
      
      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index} className="relative">
            {/* Label */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 text-sm text-gray-600 whitespace-pre-line">
              {item.label}
            </div>
            
            {/* Chart Container */}
            <div className="ml-48 relative h-[calc(100%-2rem)]">
              {/* Grid lines */}
              <div className="absolute w-full h-full mt-8">
                {/* Positive grid lines */}
                {gridValues.map((value, i) => (
                  <div
                    key={i}
                    className="absolute h-full border-l border-gray-200"
                    style={{ 
                      left: `${((value + 2) / maxBarWidth) * 100}%`,
                      borderLeftWidth: value === 0 ? '2px' : '1px',
                      borderLeftColor: value === 0 ? '#9CA3AF' : '#E5E7EB'
                    }}
                  />
                ))}
                {/* Negative grid lines */}
                {negativeGridValues.map((value, i) => (
                  <div
                    key={`neg-${i}`}
                    className="absolute h-full border-l border-gray-200"
                    style={{ 
                      left: `${((value + 2) / maxBarWidth) * 100}%`,
                      borderLeftColor: '#E5E7EB'
                    }}
                  />
                ))}
              </div>

              {/* X-axis labels */}
              <div className="relative h-8 mb-4">
                {/* Positive labels */}
                {gridValues.map((value, i) => (
                  <div
                    key={i}
                    className="absolute transform -translate-x-1/2 text-xs text-gray-500"
                    style={{ left: `${((value + 2) / maxBarWidth) * 100}%` }}
                  >
                    {value.toFixed(1)}%
                  </div>
                ))}
                {/* Negative labels */}
                {negativeGridValues.map((value, i) => (
                  <div
                    key={`neg-${i}`}
                    className="absolute transform -translate-x-1/2 text-xs text-gray-500"
                    style={{ left: `${((value + 2) / maxBarWidth) * 100}%` }}
                  >
                    {value.toFixed(1)}%
                  </div>
                ))}
              </div>
              
              {/* Bars */}
              <div className="space-y-3 relative">
                {/* Delta Sell Out Volume */}
                <div className="relative h-5">
                  <div 
                    className="absolute h-full bg-[#6A4E71]" 
                    style={{ 
                      width: `${(item.values.sellOutVolume / maxBarWidth) * 100}%`,
                      left: `${(2 / maxBarWidth) * 100}%`
                    }}
                  />
                </div>
                
                {/* Delta Gross Margin */}
                <div className="relative h-5">
                  <div 
                    className="absolute h-full bg-[#8C7355]" 
                    style={{ 
                      width: `${(item.values.grossMargin / maxBarWidth) * 100}%`,
                      left: `${(2 / maxBarWidth) * 100}%`
                    }}
                  />
                </div>
                
                {/* Delta Net Revenue */}
                <div className="relative h-5">
                  <div 
                    className="absolute h-full bg-[#4F96A6]" 
                    style={{ 
                      width: `${(item.values.netRevenue / maxBarWidth) * 100}%`,
                      left: `${(2 / maxBarWidth) * 100}%`
                    }}
                  />
                </div>
                
                {/* Delta Avg Price Per Unit */}
                <div className="relative h-5">
                  <div 
                    className="absolute h-full bg-[#E6C3CE]" 
                    style={{ 
                      width: `${(Math.abs(item.values.avgPricePerUnit) / maxBarWidth) * 100}%`,
                      left: `${(2 / maxBarWidth) * 100}%`,
                      transform: 'translateX(-100%)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex gap-8 mt-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#6A4E71]"></div>
          <span>% Delta Sell Out Volume</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#8C7355]"></div>
          <span>% Delta Gross Margin</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#4F96A6]"></div>
          <span>% Delta Net Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#E6C3CE]"></div>
          <span>% Delta Avg Price Per Unit</span>
        </div>
      </div>
    </div>
  );
}
