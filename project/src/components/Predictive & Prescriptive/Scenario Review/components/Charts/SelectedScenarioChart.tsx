import React from "react";
import Plot from "react-plotly.js";

interface SelectedScenarioChartProps {
  rawData: { name: string; total: number; perUnit: number }[];
  viewMode: "perUnit" | "total";
}

const SelectedScenarioChart: React.FC<SelectedScenarioChartProps> = ({ rawData, viewMode }) => {
  let cumulative = 0;
  const labels = rawData.map((d) => d.name);

  // Labels that should always be blue
  const blueLabels = [
    "Net Invoiced Sales",
    "Invoice Sale",
    "Acquisition Cost",
    "Customer Net Sales",
    "PTR",
    "PTC",
  ];

  const xValues: string[] = [];
  const yValues: number[] = [];
  const baseValues: number[] = [];
  const colors: string[] = [];

  rawData.forEach((item) => {
    const value = item[viewMode];
    xValues.push(item.name);
    yValues.push(value);
    baseValues.push(cumulative);

    // Apply correct colors following Chart.js logic
    if (blueLabels.includes(item.name)) {
      colors.push("#6b3480"); // Dark pastel blue for specific bars
    } else if (value > 0) {
      colors.push("#76A371"); // Dark pastel green for positive values
    } else {
      colors.push("#C85C5C"); // Dark pastel red for negative values
    }

    cumulative += value;
  });

  const trace = {
    type: "bar",
    x: xValues,
    y: yValues,
    base: baseValues,
    marker: { color: colors },
    text: yValues.map((v) => `$${v.toLocaleString("en-US")}`),
    textposition: "outside",
  };

  const layout = {
    title: `Selected Scenario (${viewMode})`,
    height: 650,
    width: 1300, // Same width as BaseScenarioChart
    margin: { l: 80, r: 50, t: 50, b: 200 }, // Adjusted left margin for y-axis labels
    xaxis: {
      tickangle: 0,
      tickmode: "array",
      tickvals: labels.map((_, i) => i),
      ticktext: labels.map((label) => label.split(" ").join("<br>")), // Multi-line labels
      tickfont: { size: 12 },
      showgrid: false, // No x-axis grid lines
      zeroline: false, // No zero line
      showline: true, // Show only the main x-axis line
      linecolor: "black",
    },
    yaxis: {
      title: "Value",
      titlefont: { size: 14 },
      tickformat: ",", // Adds commas to large numbers
      showgrid: false, // No y-axis grid lines
      zeroline: false, // No zero line
      showline: true, // Show only the main y-axis line
      linecolor: "black",
    },
    showlegend: false,
    bargap: 0.1, // Maintain similar spacing as BaseScenarioChart
  };

  return (
    <div className="w-full h-[700px] p-6">
      <Plot data={[trace]} layout={layout} config={{ responsive: true }} />
    </div>
  );
};

export default SelectedScenarioChart;
