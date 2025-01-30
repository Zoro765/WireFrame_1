import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface KPICardProps {
  mainLabel: string;
  value: string;
  yoyLabel: string;
  change: number;
}

export function KPICard({ mainLabel, value, yoyLabel, change }: KPICardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex flex-col">
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
        <div className="text-xs text-gray-600 mt-1">{yoyLabel}</div>
      </div>
    </div>
  );
}