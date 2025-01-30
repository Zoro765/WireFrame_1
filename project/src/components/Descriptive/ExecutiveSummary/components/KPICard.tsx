import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface MetricCardProps {
  mainLabel: string;
  value: string;
  yoyLabel: string;
  change: number;
  mdlzLabel?: string;
  mdlzValue?: string;
  mdlzYoyChange?: string;
  mdlzIsPositive?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  mainLabel,
  value,
  yoyLabel,
  change,
  mdlzLabel,
  mdlzValue,
  mdlzYoyChange,
  mdlzIsPositive,
}) => (
  <div className="bg-white rounded-lg shadow-md border border-gray-200">
    {/* Main KPI Content */}
    <div className="grid grid-cols-1 gap-0 p-1 px-10 py-1">
      {/* First Row: Label and Value */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-bold text-gray-900">{mainLabel}</div>
        <div className="text-xs font-semibold text-gray-900">{value}</div>
      </div>
      {/* Second Row: YoY Change */}
      <div className="flex items-center justify-between mt-1">
        <div className="text-xs font-bold text-gray-900">YoY Change</div>
        <div className="text-xs flex items-center text-sm">
          {change > 0 ? (
            <TrendingUp className="w-4 h-4 text-green-600" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-600" />
          )}
          <span className={change > 0 ? 'text-green-600' : 'text-red-600'}>{yoyLabel}</span>
        </div>
      </div>
    </div>

    {/* Mondelez KPI Section */}
    {mdlzValue && (
      <div className="border-t border-gray-300 p-1 bg-gray-50 rounded-b-md">
        <div className="grid grid-cols-1 gap-0 px-9 py-1">
          {/* First Row: Mondelez Label and Value */}
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-purple-800">{mdlzLabel}</div>
            <div className="text-xs font-semibold text-purple-800">{mdlzValue}</div>
          </div>
          {/* Second Row: Mondelez YoY Change */}
          <div className="flex items-center justify-between mt-1">
            <div className="text-xs font-bold text-purple-800">YoY Change</div>
            <div className="text-xs flex items-center text-sm">
              {mdlzIsPositive ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className={mdlzIsPositive ? 'text-green-600' : 'text-red-600'}>{mdlzYoyChange}</span>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
