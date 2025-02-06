import React from 'react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
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
));
Card.displayName = "Card";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const HeatMap = ({ data }) => {
  const getUniqueDimensions = (data) => {
    const rows = new Set();
    const cols = new Set();
    
    data.forEach(({ channel, ppg }) => {
      rows.add(`${channel} - ${ppg}`);
      cols.add(`${channel} - ${ppg}`);
    });
    
    return {
      rows: Array.from(rows),
      cols: Array.from(cols)
    };
  };

  const getCellValue = (row, col) => {
    const cell = data.find(item => `${item.channel} - ${item.ppg}` === row && `${item.affectedChannel} - ${item.affectedPpg}` === col);
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
          color: value > 2.0 ? 'white' : 'black'
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
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2"> </th>
                {cols.map(col => (
                  <th key={col} className="border p-2 min-w-[150px] text-sm">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row}>
                  <td className="border p-2 text-sm font-medium">{row}</td>
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
      </CardContent>
    </Card>
  );
};

export function Cannibalization() {
  const sampleData = [
    { channel: "C&C", ppg: "FRISCO251NAD PROMOCAO", affectedChannel: "C&C", affectedPpg: "MARATA301NAD PROMOCAO", value: 1.01 },
    { channel: "C&C", ppg: "FRISCO251NAD PROMOCAO", affectedChannel: "Hyper", affectedPpg: "TANG181NAD PROMOCAO", value: 1.36 },
    { channel: "C&C", ppg: "MARATA301NAD PROMOCAO", affectedChannel: "C&C", affectedPpg: "FRISCO251NAD PROMOCAO", value: 0.74 },
    { channel: "C&C", ppg: "MARATA301NAD PROMOCAO", affectedChannel: "Hyper", affectedPpg: "MARATA301NAD PROMOCAO", value: 0.85 },
    { channel: "C&C", ppg: "TANG181NAD PROMOCAO", affectedChannel: "C&C", affectedPpg: "MARATA301NAD PROMOCAO", value: 0.44 },
    { channel: "C&C", ppg: "TANG181NAD PROMOCAO", affectedChannel: "Hyper", affectedPpg: "FRISCO251NAD PROMOCAO", value: 0.14 },
    { channel: "C&C", ppg: "TANG1815 PROMOCAO", affectedChannel: "C&C", affectedPpg: "TRIN625NAD PROMOCAO", value: 0.3 },
    { channel: "C&C", ppg: "TRIN625NAD PROMOCAO", affectedChannel: "C&C", affectedPpg: "TANG1815 PROMOCAO", value: 2.99 },
    { channel: "Hyper", ppg: "FRESH151NAD PROMOCAO", affectedChannel: "C&C", affectedPpg: "MARATA301NAD PROMOCAO", value: 0.11 },
    { channel: "Hyper", ppg: "MARATA301NAD PROMOCAO", affectedChannel: "C&C", affectedPpg: "FRISCO251NAD PROMOCAO", value: 1.12 },
    { channel: "Hyper", ppg: "MARATA301NAD PROMOCAO", affectedChannel: "Hyper", affectedPpg: "TRIN625NAD PROMOCAO", value: 1.12 },
    { channel: "Hyper", ppg: "TANG181NAD PROMOCAO", affectedChannel: "C&C", affectedPpg: "MARATA301NAD PROMOCAO", value: 0.37 },
    { channel: "Hyper", ppg: "TRIN625NAD PROMOCAO", affectedChannel: "C&C", affectedPpg: "TRIN625NAD PROMOCAO", value: 0.51 },
  ];

  return <HeatMap data={sampleData} />;
}
