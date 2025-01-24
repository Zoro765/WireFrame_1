export interface KPIData {
  label: string;
  value: string;
  change: number;
  prefix?: string;
}

export interface RegionalData {
  region: string;
  value: number;
  percentage: number;
}

export interface TimeSeriesData {
  date: string;
  value: number;
  category: string;
}

export interface ChannelData {
  channel: string;
  value: number;
  percentage: number;
}