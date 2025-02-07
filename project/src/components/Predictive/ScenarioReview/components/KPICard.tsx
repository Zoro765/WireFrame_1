import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface KPICardProps {
  mainLabel: string;
  subLabel?: string;
  value: string;
  yoyLabel: string;
  change: number;
}

export function KPICard({
  mainLabel,
  subLabel,
  value,
  yoyLabel,
  change,
}: KPICardProps) {
  const isPositive = change >= 0;
  const colorClass = isPositive ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col space-y-2">
        {/* Main Label */}
        <h3 className="text-lg font-medium text-gray-500">
          {mainLabel} {subLabel && <span className="text-sm text-gray-400">({subLabel})</span>}
        </h3>

        {/* Value and YoY Section */}
        <div className="flex items-end justify-between">
          <span className="text-3xl font-bold text-gray-900">{value}</span>
          <div className="flex flex-col items-end">
            <div className={`flex items-center space-x-1 text-base ${colorClass}`}>
              {isPositive ? <ArrowUpIcon className="w-5 h-5" /> : <ArrowDownIcon className="w-5 h-5" />}
              <span>({isPositive ? '+' : ''}{change}%)</span>
            </div>
            <div className={`text-lg ${colorClass}`}>{yoyLabel}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

