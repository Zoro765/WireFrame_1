import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  BarChart3,
  LineChart,
  PieChart,
  GanttChart,
  BarChart2,
  CircleDot,
  Map,
  DollarSign,
  ShoppingCart,
  Calculator,
  Brain,
  Target,
  ClipboardList,
  Settings,
  Table,
  ArrowDownUp,
  MenuIcon,
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string; // Add path for routing
  subItems?: NavItem[];
}

const navigationData: NavItem[] = [
  {
    label: 'Descriptive',
    icon: <BarChart3 size={18} />,
    subItems: [
      { label: 'Executive Summary', icon: <LineChart size={18} />, path: '/executive-summary' },
      { label: 'Category Summary', icon: <PieChart size={18} />, path: '/category-summary' },
      { label: 'Regional Summary', icon: <Map size={18} />, path: '/regional-summary' },
      { label: 'Price - Market Landscape', icon: <DollarSign size={18} />, path: '/price-market-landscape' },
      { label: 'Price & Distribution', icon: <ShoppingCart size={18} />, path: '/price-distribution' },
      { label: 'Price Evaluation', icon: <Calculator size={18} />, path: '/price-evaluation' },
      { label: 'Price Evaluation (Patterns)', icon: <Calculator size={18} />, path: '/price-evaluation-patterns' },
      { label: 'P&L', icon: <Calculator size={18} />, path: '/profit-loss' },
    ],
  },
  {
    label: 'Diagnostic',
    icon: <Brain size={18} />,
    subItems: [
      { label: 'Model Evaluation 1', icon: <GanttChart size={18} />, path: '/Model-Evaluation-1' },
      { label: 'Model Evaluation 2', icon: <BarChart2 size={18} />, path: '/Model-Evaluation-2' },
      { label: 'Model Results', icon: <CircleDot size={18} />, path: '/Model-Results' },
    ],
  },
  {
    label: 'Predictive & Prescriptive',
    icon: <Target size={18} />,
    subItems: [
      { label: 'Optimization Guide', icon: <Settings size={18} /> },
      { label: 'Task Summary', icon: <ClipboardList size={18} /> },
      { label: 'Simulation/Optimization', icon: <Calculator size={18} /> },
      { label: 'Scenario Summary', icon: <Table size={18} /> },
      {
        label: 'Scenario Review',
        icon: <ArrowDownUp size={18} />,
        subItems: [
          { label: 'Scenario Overall Results', icon: <BarChart3 size={18} /> },
          { label: 'MFG P&L Waterfall', icon: <LineChart size={18} /> },
          { label: 'MFG P&L Tabular View', icon: <Table size={18} /> },
          { label: 'Customer Waterfall', icon: <LineChart size={18} /> },
          { label: 'Customer Tabular View', icon: <Table size={18} /> },
        ],
      },
    ],
  },
];

interface NavItemProps {
  item: NavItem;
  level?: number;
  isExpanded?: boolean;
}

function NavItemComponent({ item, level = 0, isExpanded = true }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const paddingLeft = level * 16 + 16;

  return (
    <div>
      {item.path ? (
        <Link
          to={item.path}
          className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-900 transition-colors ${
            !isExpanded ? 'justify-center' : ''
          }`}
          style={{ paddingLeft: isExpanded ? paddingLeft : undefined }}
        >
          <span className="flex-shrink-0">{item.icon}</span>
          {isExpanded && (
            <>
              <span className="flex-grow text-left">{item.label}</span>
              {hasSubItems && (
                <span className="flex-shrink-0">
                  {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
              )}
            </>
          )}
        </Link>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-900 transition-colors ${
            !isExpanded ? 'justify-center' : ''
          }`}
          style={{ paddingLeft: isExpanded ? paddingLeft : undefined }}
        >
          <span className="flex-shrink-0">{item.icon}</span>
          {isExpanded && (
            <>
              <span className="flex-grow text-left">{item.label}</span>
              {hasSubItems && (
                <span className="flex-shrink-0">
                  {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
              )}
            </>
          )}
        </button>
      )}

      {isExpanded && isOpen && hasSubItems && (
        <div className="ml-4">
          {item.subItems.map((subItem, index) => (
            <NavItemComponent
              key={index}
              item={subItem}
              level={level + 1}
              isExpanded={isExpanded}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Navigation() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-white shadow-lg transition-all duration-300 z-50 ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
    >
      <div className="p-4 border-b flex items-center justify-between">
        {isExpanded && <span className="font-semibold text-purple-900">Navigation</span>}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-purple-50 rounded-md"
        >
          <MenuIcon size={20} className="text-purple-900" />
        </button>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-64px)]">
        {navigationData.map((item, index) => (
          <NavItemComponent key={index} item={item} isExpanded={isExpanded} />
        ))}
      </div>
    </div>
  );
}


// import React, { useState } from 'react';
// import { 
//   ChevronDown, 
//   ChevronRight, 
//   BarChart3, 
//   LineChart, 
//   PieChart, 
//   GanttChart, 
//   BarChart2, 
//   CircleDot, // Changed from PieChart3 to CircleDot
//   Map, 
//   DollarSign, 
//   ShoppingCart, 
//   Calculator, 
//   Brain, 
//   Target, 
//   ClipboardList, 
//   Settings, 
//   Table, 
//   ArrowDownUp, 
//   MenuIcon 
// } from 'lucide-react';

// interface NavItem {
//   label: string;
//   icon: React.ReactNode;
//   subItems?: NavItem[];
// }

// const navigationData: NavItem[] = [
//   {
//     label: 'Descriptive',
//     icon: <BarChart3 size={18} />,
//     subItems: [
//       { label: 'Executive Summary', icon: <LineChart size={18} /> },
//       { label: 'Category Summary', icon: <PieChart size={18} /> },
//       { label: 'Regional Summary', icon: <Map size={18} /> },
//       { label: 'Price - Market Landscape', icon: <DollarSign size={18} /> },
//       { label: 'Price & Distribution', icon: <ShoppingCart size={18} /> },
//       { label: 'P&L', icon: <Calculator size={18} /> }
//     ]
//   },
//   {
//     label: 'Diagnostic',
//     icon: <Brain size={18} />,
//     subItems: [
//       { label: 'Model Evaluation 1', icon: <GanttChart size={18} /> },
//       { label: 'Model Evaluation 2', icon: <BarChart2 size={18} /> },
//       { label: 'Model Results', icon: <CircleDot size={18} /> } // Changed icon here
//     ]
//   },
//   {
//     label: 'Predictive & Prescriptive',
//     icon: <Target size={18} />,
//     subItems: [
//       { label: 'Optimization Guide', icon: <Settings size={18} /> },
//       { label: 'Task Summary', icon: <ClipboardList size={18} /> },
//       { label: 'Simulation/Optimization', icon: <Calculator size={18} /> },
//       { label: 'Scenario Summary', icon: <Table size={18} /> },
//       {
//         label: 'Scenario Review',
//         icon: <ArrowDownUp size={18} />,
//         subItems: [
//           { label: 'Scenario Overall Results', icon: <BarChart3 size={18} /> },
//           { label: 'MFG P&L Waterfall', icon: <LineChart size={18} /> },
//           { label: 'MFG P&L Tabular View', icon: <Table size={18} /> },
//           { label: 'Customer Waterfall', icon: <LineChart size={18} /> },
//           { label: 'Customer Tabular View', icon: <Table size={18} /> }
//         ]
//       }
//     ]
//   }
// ];

// interface NavItemProps {
//   item: NavItem;
//   level?: number;
//   isExpanded?: boolean;
// }

// function NavItemComponent({ item, level = 0, isExpanded = true }: NavItemProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const hasSubItems = item.subItems && item.subItems.length > 0;
//   const paddingLeft = level * 16 + 16;

//   return (
//     <div>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-900 transition-colors ${
//           !isExpanded ? 'justify-center' : ''
//         }`}
//         style={{ paddingLeft: isExpanded ? paddingLeft : undefined }}
//       >
//         <span className="flex-shrink-0">{item.icon}</span>
//         {isExpanded && (
//           <>
//             <span className="flex-grow text-left">{item.label}</span>
//             {hasSubItems && (
//               <span className="flex-shrink-0">
//                 {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
//               </span>
//             )}
//           </>
//         )}
//       </button>
//       {isExpanded && isOpen && hasSubItems && (
//         <div className="ml-4">
//           {item.subItems.map((subItem, index) => (
//             <NavItemComponent
//               key={index}
//               item={subItem}
//               level={level + 1}
//               isExpanded={isExpanded}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export function Navigation() {
//   const [isExpanded, setIsExpanded] = useState(false); // Internal state for expanded/collapsed

//   return (
//     <div
//       className={`fixed left-0 top-0 h-screen bg-white shadow-lg transition-all duration-300 z-50 ${
//         isExpanded ? 'w-64' : 'w-16'
//       }`}
//     >
//       <div className="p-4 border-b flex items-center justify-between">
//         {isExpanded && <span className="font-semibold text-purple-900">Navigation</span>}
//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="p-1 hover:bg-purple-50 rounded-md"
//         >
//           <MenuIcon size={20} className="text-purple-900" />
//         </button>
//       </div>
//       <div className="overflow-y-auto h-[calc(100vh-64px)]">
//         {navigationData.map((item, index) => (
//           <NavItemComponent key={index} item={item} isExpanded={isExpanded} />
//         ))}
//       </div>
//     </div>
//   );
// }