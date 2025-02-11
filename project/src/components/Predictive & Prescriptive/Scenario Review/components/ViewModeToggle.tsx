import React from "react";

interface ViewModeToggleProps {
  mode: "perUnit" | "total";
  onToggle: (mode: "perUnit" | "total") => void;
}

export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ mode, onToggle }) => {
  return (
    <div className="flex items-center justify-end mb-4">
      <span className="text-sm font-medium mr-3">View Mode:</span>
      <div className="flex bg-white border border-gray-300 rounded-full p-1 shadow-inner">
        <button
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 
            ${mode === "perUnit" ? "bg-[#6b3480] text-white shadow-md" : "text-gray-600 hover:bg-gray-200"}`}
          onClick={() => onToggle("perUnit")}
        >
          Per Unit
        </button>
        <button
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 
            ${mode === "total" ? "bg-[#6b3480] text-white shadow-md" : "text-gray-600 hover:bg-gray-200"}`}
          onClick={() => onToggle("total")}
        >
          Total
        </button>
      </div>
    </div>
  );
};
