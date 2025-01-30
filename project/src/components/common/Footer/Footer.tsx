import { Info } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t px-6 py-2">
      <div className="flex items-center justify-between text-xs text-gray-600">
        <p>Datasource: Nielsen | Note: Growth rates shown in KPI cards are for the selected Time Period</p>
      </div>
    </footer>
  );
}