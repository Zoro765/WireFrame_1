import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface KPICardProps {
  mainLabel: string; // Main label for the KPI card (e.g., "Sell Out Volume")
  value: string; // Main value
  yoyLabel: string; // Year-over-Year label
  change: number; // Percentage change
  mdlzLabel?: string; // Label for the Mondelez metrics section (e.g., "Volume (Mdlz)")
  mdlzValue?: string; // Mondelez value
  mdlzYoyChange?: string; // Mondelez YoY change
  mdlzIsPositive?: boolean; // Mondelez change direction
}

export function KPICard({
  mainLabel,
  value,
  yoyLabel,
  change,
  mdlzLabel,
  mdlzValue,
  mdlzYoyChange,
  mdlzIsPositive,
}: KPICardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex flex-col">
        {/* Main Metrics */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-purple-900">{mainLabel}</h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            <div
              className={`flex items-center text-xs ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {isPositive ? (
                <ArrowUpIcon className="w-4 h-4" />
              ) : (
                <ArrowDownIcon className="w-4 h-4" />
              )}
              <span>({isPositive ? '+' : ''}{change}%)</span>
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {yoyLabel}
          </div>
        </div>

        {/* Mondelez Metrics */}
        {mdlzValue && mdlzYoyChange && mdlzIsPositive !== undefined && (
          <div className="mt-4 border-t pt-4">
            <h3 className="text-sm font-medium text-purple-900">{mdlzLabel}</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">{mdlzValue}</span>
              <div
                className={`flex items-center text-xs ${
                  mdlzIsPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {mdlzIsPositive ? (
                  <ArrowUpIcon className="w-4 h-4" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4" />
                )}
                <span>({mdlzIsPositive ? '+' : ''}{parseFloat(mdlzYoyChange.split(' ')[1].replace(/[()%]/g, ''))}%)</span>
              </div>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {mdlzYoyChange}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



