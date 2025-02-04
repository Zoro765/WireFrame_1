import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface MetricCardProps {
  mainLabel: string;
  subLabel: string;
  value: string;
  yoyLabel: string;
  change: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  mainLabel,
  subLabel,
  value,
  yoyLabel,
  change,
}) => (
  <div className="bg-white rounded-lg shadow-md border border-gray-200  h-18 min-w-[200px]">
    {/* Main KPI Content */}
    <div className="grid grid-cols-1 gap-0 p-1 px-10 py-1">
      {/* First Row: Label and Value */}
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-900">{mainLabel}</div>
        <div className="text-lg font-semibold text-gray-900">{value}</div>
      </div>
      {/* Second Row: YoY Change */}
      <div className="flex items-center justify-between mt-1">
        <div className="text-lg font-semibold text-gray-900">{subLabel}</div>
        <div className="text-lg flex items-center text-lg">
          {change > 0 ? (
            <TrendingUp className="w-4 h-4 text-green-600" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-600" />
          )}
          <span className={change > 0 ? 'text-green-600' : 'text-red-600'}>{yoyLabel}</span>
        </div>
      </div>
    </div>

  </div>
);
