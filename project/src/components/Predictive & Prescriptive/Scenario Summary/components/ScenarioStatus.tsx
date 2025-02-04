const ScenarioStatusChart = () => {
  return (
    <div className="bg-white rounded-lg shadow flex flex-col items-center justify-center h-full w-full">
      <div className="flex items-center justify-center w-full h-full">
        <svg className="w-full max-w-[300px] max-h-[300px]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgb(1, 102, 15)"
            strokeWidth="10"
            strokeDasharray="282.7"
            strokeDashoffset="0"
            transform="rotate(-90 50 50)"
          />
          <text
            x="50"
            y="45"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs font-medium"
            fill="rgb(1, 102, 15)"
          >
            Output Saved
          </text>
          <text
            x="50"
            y="65"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs"
            fill="#666"
          >
            (100.0%)
          </text>
        </svg>
      </div>
    </div>
  );
};

export default ScenarioStatusChart;
