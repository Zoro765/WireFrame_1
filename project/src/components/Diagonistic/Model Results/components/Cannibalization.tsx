import React from 'react';

import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const HeatMap = ({ data, title }) => {
  const getUniqueDimensions = (data) => {
    const rows = new Set();
    const cols = new Set();
    
    data.forEach(item => {
      rows.add(item.row);
      cols.add(item.col);
    });
    
    return {
      rows: Array.from(rows),
      cols: Array.from(cols)
    };
  };

  const getCellValue = (row, col) => {
    const cell = data.find(item => item.row === row && item.col === col);
    return cell ? cell.value : null;
  };

  const getBackgroundColor = (value) => {
    if (!value) return 'transparent';
    const opacity = Math.min(value / 4, 0.8);
    return `rgba(147, 112, 219, ${opacity})`;
  };

  const renderCell = (value) => {
    if (!value) return null;
    return (
      <div
        className="p-2 text-center"
        style={{
          backgroundColor: getBackgroundColor(value),
          color: value > 1.0 ? 'white' : 'black'
        }}
      >
        {value.toFixed(2)}
      </div>
    );
  };

  const { rows, cols } = getUniqueDimensions(data);

  return (
    <Card className="w-full h-full">
     <CardContent>
        <div className="w-full overflow-x-auto">
          <div className="min-w-max">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2"> </th>
                  {cols.map(col => (
                    <th key={col} className="border p-2 min-w-[100px] text-sm">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row}>
                    <td className="border p-2 text-sm">{row}</td>
                    {cols.map(col => (
                      <td key={`${row}-${col}`} className="border p-2">
                        {renderCell(getCellValue(row, col))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function Cannibalization() {
  const sampleData = [
    { row: "C&C-FRISCO251NAD PROMOCAO", col: "FRISCO251NAD PROMOCAO", value: 1.01 },
    { row: "C&C-MARATA301NAD PROMOCAO", col: "MARATA301NAD PROMOCAO", value: 0.74 },
    { row: "C&C-TANG181NAD PROMOCAO", col: "TANG181NAD PROMOCAO", value: 0.44 },
    { row: "C&C-TANG1815PROMOCAO", col: "TANG1815PROMOCAO", value: 0.36 },
    { row: "C&C-TRIN625NAD PROMOCAO", col: "TRIN625NAD PROMOCAO", value: 3.99 },
    { row: "Hyper-FRESH151NAD PROMOCAO", col: "FRESH151NAD PROMOCAO", value: 0.11 },
    { row: "Hyper-MARATA301NAD PROMOCAO", col: "MARATA301NAD PROMOCAO", value: 1.12 },
    { row: "Hyper-TANG181NAD PROMOCAO", col: "TANG181NAD PROMOCAO", value: 0.37 },
    { row: "Hyper-TRIN625NAD PROMOCAO", col: "TRIN625NAD PROMOCAO", value: 0.51 },
  ];

  return <HeatMap data={sampleData} />;
}
