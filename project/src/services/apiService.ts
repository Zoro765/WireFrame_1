// // src/services/apiService.ts
// import axios, { AxiosResponse } from 'axios';
// import { API_BASE_URL } from '../config'; // Import from the config file we just created

// // Define interfaces for the expected API responses (optional but good practice)
// // These should match the structure your backend sends

// // For /api/filters response
// interface FilterOption {
//   value: string | number;
//   label: string;
// }

// export interface FilterOptionsResponse {
//   years: (string | number)[];
//   quarters: FilterOption[];
//   regions: FilterOption[];
//   channels: FilterOption[];
//   manufacturers: FilterOption[];
//   categories: FilterOption[];
//   brands: FilterOption[];
//   // Add ppgs and kpis here if your /api/filters endpoint starts returning them
// }

// // For /api/executive-summary KPI items
// export interface KpiItem {
//   mainLabel: string;
//   value: string;
//   yoyLabel: string;
//   change: number;
//   mdlzLabel?: string;
//   mdlzValue?: string;
//   mdlzYoyChange?: string;
//   mdlzIsPositive?: boolean;
// }

// // For /api/executive-summary charts data (define more specific types as needed)
// // Example for volumeMarketShare, adapt for others
// export interface VolumeMarketShareDataPoint {
//   year: number;
//   month: number;
//   monthName: string;
//   manufacturerGroup: string;
//   monthlyUnitSales: string; // API sends as string, will be parsed in component
// }
// export interface ValueSalesQuarterlyDataPoint {
//     regionName: string;
//     year: number;
//     quarter: number;
//     quarterlyValueSales: string;
// }
// export interface ValueSalesPerformanceDataPoint {
//     year: number;
//     month: number;
//     monthName: string;
//     manufacturerGroup: string;
//     monthlyValueSales: string;
// }


// export interface ExecutiveSummaryChartsData {
//   volumeMarketShare: VolumeMarketShareDataPoint[];
//   valueSalesQuarterly: ValueSalesQuarterlyDataPoint[];
//   valueSalesPerformance: ValueSalesPerformanceDataPoint[];
//   channelDistributionData?: any[]; // Define specific type later if data structure is known
//   // regionalSummaryData?: any[]; // Define specific type later
// }

// export interface ExecutiveSummaryResponse {
//   kpis: KpiItem[];
//   charts: ExecutiveSummaryChartsData;
// }

// // Define interface for query parameters for getExecutiveSummaryData
// export interface ExecutiveSummaryParams {
//     year?: string | number;
//     quarter?: string | number;
//     region?: string;
//     channel?: string;
//     manufacturer?: string;
//     category?: string;
//     brand?: string;
//     ppg?: string;
//     kpi?: string; // If you add this filter to backend
// }


// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export const getFiltersOptions = (): Promise<AxiosResponse<FilterOptionsResponse>> => {
//   return apiClient.get<FilterOptionsResponse>('/api/filters');
// };

// export const getExecutiveSummaryData = (params: ExecutiveSummaryParams): Promise<AxiosResponse<ExecutiveSummaryResponse>> => {
//   return apiClient.get<ExecutiveSummaryResponse>('/api/executive-summary', { params });
// };






// src/services/apiService.ts
import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../config'; // Ensure this path is correct

// For individual filter options that have a value and a display label
interface FilterOptionItem {
  value: string | number;
  label: string;
}

// Defines the structure of the response from your /api/filters endpoint
export interface FilterOptionsResponse {
  years: (string | number)[]; // Array of years
  quarters: FilterOptionItem[];
  regions: FilterOptionItem[];
  channels: FilterOptionItem[];
  manufacturers: FilterOptionItem[];
  categories: FilterOptionItem[];
  brands: FilterOptionItem[];
  ppgs?: FilterOptionItem[]; // PPGs will be an array of {value, label}
  // kpis?: FilterOptionItem[]; // If you make the "Display KPI" dropdown dynamic later
}

// Defines the structure of a single KPI card's data
export interface KpiItem {
  mainLabel: string;
  value: string;
  yoyLabel: string;
  change: number; // This is likely the YoY percentage change
  mdlzLabel?: string;
  mdlzValue?: string;
  mdlzYoyChange?: string;
  mdlzIsPositive?: boolean;
}

// Define structures for data points within each chart type
export interface VolumeMarketShareDataPoint {
  year: number;
  month: number;
  monthName: string;
  manufacturerGroup: string;
  monthlyUnitSales: string; // API might send numbers as strings
}

export interface ValueSalesQuarterlyDataPoint {
  regionName: string;
  year: number;
  quarter: number;
  quarterlyValueSales: string;
}

export interface ValueSalesPerformanceDataPoint {
  year: number;
  month: number;
  monthName: string;
  manufacturerGroup: string;
  monthlyValueSales: string;
}

// Example: Define structure for channel distribution data if backend provides it
export interface ChannelDistributionDataPoint {
  channelName: string;      // Or channel_retailer_name, matching backend
  valueSales?: string;      // Or unitSales, whatever the pie chart represents
  // percentage?: number;  // If backend calculates percentage
}

// Defines the structure of the 'charts' object in the /api/executive-summary response
export interface ExecutiveSummaryChartsData {
  volumeMarketShare: VolumeMarketShareDataPoint[];
  valueSalesQuarterly: ValueSalesQuarterlyDataPoint[];
  valueSalesPerformance: ValueSalesPerformanceDataPoint[];
  channelDistributionData?: ChannelDistributionDataPoint[]; // For Channel Distribution pie chart
  // regionalSummaryData?: any[]; // If you have a distinct data structure for regional summary beyond quarterly
}

// Defines the overall structure of the response from /api/executive-summary
export interface ExecutiveSummaryResponse {
  kpis: KpiItem[];
  charts: ExecutiveSummaryChartsData;
}

// Defines the allowed query parameters for the /api/executive-summary endpoint
export interface ExecutiveSummaryParams {
  year?: string | number;
  quarter?: string | number; // Or number if your select passes number
  region?: string;
  channel?: string;
  manufacturer?: string;
  category?: string;
  brand?: string;
  ppg?: string; // For PPG filter
  // kpi?: string; // If the "Display KPI" filter affects backend queries
}

// Create an axios instance with a base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetches the available filter options from the backend.
 */
export const getFiltersOptions = (): Promise<AxiosResponse<FilterOptionsResponse>> => {
  return apiClient.get<FilterOptionsResponse>('/api/filters');
};

/**
 * Fetches the executive summary data (KPIs and chart data) from the backend,
 * applying the given filter parameters.
 * @param params - An object containing the filter values.
 */
export const getExecutiveSummaryData = (params: ExecutiveSummaryParams): Promise<AxiosResponse<ExecutiveSummaryResponse>> => {
  return apiClient.get<ExecutiveSummaryResponse>('/api/executive-summary', { params });
};