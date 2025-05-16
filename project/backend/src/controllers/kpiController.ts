// src/controllers/kpiController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../config/database'; // For fetching default year
import { DimDate } from '../models/DimDate'; // For fetching default year
import {
  getFilterOptions,
  getExecutiveSummaryData,
  KpiFilters, // Import the interface
} from '../services/kpiService';

// Helper to format YoY changes for KPI cards
const formatYoy = (current: number, previous: number, unit: string = '', prefix: string = '') => {
  const absoluteChange = current - previous;
  const percentageChange = previous !== 0 ? (absoluteChange / previous) * 100 : 0; // Avoid division by zero

  let formattedAbsolute = (absoluteChange / (unit === 'K' ? 1000 : 1)).toFixed(0);
  if (unit === 'K') formattedAbsolute += 'K';
  
  const yoyLabel = `YoY: ${absoluteChange >= 0 ? '+' : ''}${prefix}${formattedAbsolute} (${percentageChange.toFixed(1)}%)`;
  return {
    yoyLabel,
    yoyPercentage: parseFloat(percentageChange.toFixed(2)), // For 'change' field if needed by frontend
    yoyAbsolute: absoluteChange, // Raw absolute change
    isPositive: absoluteChange >= 0,
  };
};


export const getExecutiveSummary = async (req: Request, res: Response) => {
  try {
    const filters: KpiFilters = {
      year: req.query.year ? parseInt(req.query.year as string) : undefined,
      quarter: req.query.quarter ? parseInt(req.query.quarter as string) : undefined,
      region: req.query.region as string || 'All',
      channel: req.query.channel as string || 'All',
      manufacturer: req.query.manufacturer as string || 'All',
      category: req.query.category as string || 'All',
      brand: req.query.brand as string || 'All',
    };

    // If no year is provided, default to the latest available year in the data
    if (!filters.year) {
      const latestYearData = await AppDataSource.getRepository(DimDate)
        .createQueryBuilder('dd')
        .select('MAX(dd.year)', 'maxYear')
        .getRawOne();
      filters.year = latestYearData?.maxYear || new Date().getFullYear(); // Fallback to current system year
    }

    const { kpiCardsData, chartsData } = await getExecutiveSummaryData(filters);

    // Process kpiCardsData into the format your frontend expects
    const processedKpiCards = kpiCardsData.map(card => {
      const generalYoy = formatYoy(card.currentValue, card.previousValue, card.unit, card.prefix);
      
      let mdlzInfo: any = {};
      if (card.id === 'sellOutVolume' || card.id === 'sellOutValue') { // Only for cards that have Mdlz data
        const mdlzYoy = formatYoy(card.mdlzCurrentValue!, card.mdlzPreviousValue!, card.unit, card.prefix);
        mdlzInfo = {
          mdlzLabel: card.id === 'sellOutVolume' ? 'Volume (Mdlz)' : 'Value (Mdlz)',
          mdlzValue: `${card.prefix}${(card.mdlzCurrentValue! / (card.unit === 'K' ? 1000 : 1)).toFixed(0)}${card.unit || ''}`,
          mdlzYoyChange: mdlzYoy.yoyLabel,
          mdlzIsPositive: mdlzYoy.isPositive,
        };
      }
      
      return {
        mainLabel: card.mainLabel,
        value: `${card.prefix}${(card.currentValue / (card.unit === 'K' ? 1000 : 1)).toFixed(0)}${card.unit || ''}`,
        yoyLabel: generalYoy.yoyLabel,
        change: generalYoy.yoyPercentage, // Percentage change for the trend indicator
        ...mdlzInfo,
      };
    });

    res.json({
      kpis: processedKpiCards,
      charts: chartsData, // Pass raw chart data; frontend will process for charting libraries
    });

  } catch (error) {
    console.error('Error fetching executive summary:', error);
    if (error instanceof Error) {
        res.status(500).json({ message: 'Error fetching executive summary data', error: error.message });
    } else {
        res.status(500).json({ message: 'An unknown error occurred while fetching executive summary data' });
    }
  }
};


// getFilters function (from previous step)
export const getFilters = async (req: Request, res: Response) => {
  try {
    const filterOptions = await getFilterOptions();
    res.json(filterOptions);
  } catch (error) {
    console.error('Error fetching filter options:', error);
     if (error instanceof Error) {
        res.status(500).json({ message: 'Error fetching filter options', error: error.message });
    } else {
        res.status(500).json({ message: 'An unknown error occurred while fetching filter options' });
    }
  }
};