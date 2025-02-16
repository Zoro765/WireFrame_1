import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface MetricCardProps {
  main_label: string;
  value: string;
  sub_label: string;
  yoy_label: string;
  change: string | number;
  mdlz_label?: string;
  mdlz_value?: string;
  mdlz_sub_label?: string;
  mdlz_yoy_change?: string;
  mdlz_is_positive?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  main_label,
  value,
  sub_label,
  yoy_label,
  change,
  mdlz_label,
  mdlz_value,
  mdlz_sub_label,
  mdlz_yoy_change,
  mdlz_is_positive,
}) => {
  // Convert change to number if it's a string
  const numericChange = typeof change === 'string' ? parseFloat(change) : change;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 h-36 w-200">
      {/* Main KPI Content */}
      <div className="grid grid-cols-1 gap-0 p-1 px-10 py-1">
        {/* First Row: Label and Value */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-gray-900">{main_label}</div>
          <div className="text-lg font-semibold text-gray-900">{value}</div>
        </div>
        {/* Second Row: YoY Change */}
        <div className="flex items-center justify-between mt-1">
          <div className="text-lg font-semibold text-gray-900">{sub_label}</div>
          <div className="text-lg flex items-center text-lg">
            {numericChange > 0 ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
            <span className={numericChange > 0 ? 'text-green-600' : 'text-red-600'}>{yoy_label}</span>
          </div>
        </div>
      </div>

      {/* Mondelez KPI Section */}
      {mdlz_value && (
        <div className="border-t border-gray-300 p-1 bg-gray-50 rounded-b-md">
          <div className="grid grid-cols-1 gap-0 px-9 py-1">
            {/* First Row: Mondelez Label and Value */}
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-purple-800">{mdlz_label}</div>
              <div className="text-lg font-semibold text-purple-800">{mdlz_value}</div>
            </div>
            {/* Second Row: Mondelez YoY Change */}
            <div className="flex items-center justify-between mt-1">
              <div className="text-lg font-semibold text-purple-800">{mdlz_sub_label}</div>
              <div className="text-lg flex items-center text-lg">
                {mdlz_is_positive ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <span className={mdlz_is_positive ? 'text-green-600' : 'text-red-600'}>{mdlz_yoy_change}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
