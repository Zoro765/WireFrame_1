import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface KPICardProps {
  mainLabel: string;
  subLabel: string;
  value: string;
  yoyLabel: string;
  change: number;
}

export function KPICard({ mainLabel, subLabel, value, yoyLabel, change }: KPICardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded shadow-sm p-4">
      <div className="flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-sm font-medium text-purple-900">{mainLabel}</h3>
            {subLabel && (
              <p className="text-xs text-purple-700">{subLabel}</p>
            )}
          </div>
          <div className="flex items-center gap-1">
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
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-600">
          <span>{yoyLabel}</span>
          <span>({change}%)</span>
        </div>
      </div>
    </div>
  );
}