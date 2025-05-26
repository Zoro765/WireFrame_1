// // src/controllers/kpiController.ts
// import { Request, Response } from 'express';
// import { AppDataSource } from '../config/database'; // For fetching default year
// import { DimDate } from '../models/DimDate'; // For fetching default year
// import {
//   getFilterOptions,
//   getExecutiveSummaryData,
//   KpiFilters, // Import the interface
// } from '../services/kpiService';

// // Helper to format YoY changes for KPI cards
// const formatYoy = (current: number, previous: number, unit: string = '', prefix: string = '') => {
//   const absoluteChange = current - previous;
//   const percentageChange = previous !== 0 ? (absoluteChange / previous) * 100 : 0; // Avoid division by zero

//   let formattedAbsolute = (absoluteChange / (unit === 'K' ? 1000 : 1)).toFixed(0);
//   if (unit === 'K') formattedAbsolute += 'K';
  
//   const yoyLabel = `YoY: ${absoluteChange >= 0 ? '+' : ''}${prefix}${formattedAbsolute} (${percentageChange.toFixed(1)}%)`;
//   return {
//     yoyLabel,
//     yoyPercentage: parseFloat(percentageChange.toFixed(2)), // For 'change' field if needed by frontend
//     yoyAbsolute: absoluteChange, // Raw absolute change
//     isPositive: absoluteChange >= 0,
//   };
// };


// export const getExecutiveSummary = async (req: Request, res: Response) => {
//   try {
//     const filters: KpiFilters = {
//       year: req.query.year ? parseInt(req.query.year as string) : undefined,
//       quarter: req.query.quarter ? parseInt(req.query.quarter as string) : undefined,
//       region: req.query.region as string || 'All',
//       channel: req.query.channel as string || 'All',
//       manufacturer: req.query.manufacturer as string || 'All',
//       category: req.query.category as string || 'All',
//       brand: req.query.brand as string || 'All',
//     };

//     // If no year is provided, default to the latest available year in the data
//     if (!filters.year) {
//       const latestYearData = await AppDataSource.getRepository(DimDate)
//         .createQueryBuilder('dd')
//         .select('MAX(dd.year)', 'maxYear')
//         .getRawOne();
//       filters.year = latestYearData?.maxYear || new Date().getFullYear(); // Fallback to current system year
//     }

//     const { kpiCardsData, chartsData } = await getExecutiveSummaryData(filters);

//     // Process kpiCardsData into the format your frontend expects
//     const processedKpiCards = kpiCardsData.map(card => {
//       const generalYoy = formatYoy(card.currentValue, card.previousValue, card.unit, card.prefix);
      
//       let mdlzInfo: any = {};
//       if (card.id === 'sellOutVolume' || card.id === 'sellOutValue') { // Only for cards that have Mdlz data
//         const mdlzYoy = formatYoy(card.mdlzCurrentValue!, card.mdlzPreviousValue!, card.unit, card.prefix);
//         mdlzInfo = {
//           mdlzLabel: card.id === 'sellOutVolume' ? 'Volume (Mdlz)' : 'Value (Mdlz)',
//           mdlzValue: `${card.prefix}${(card.mdlzCurrentValue! / (card.unit === 'K' ? 1000 : 1)).toFixed(0)}${card.unit || ''}`,
//           mdlzYoyChange: mdlzYoy.yoyLabel,
//           mdlzIsPositive: mdlzYoy.isPositive,
//         };
//       }
      
//       return {
//         mainLabel: card.mainLabel,
//         value: `${card.prefix}${(card.currentValue / (card.unit === 'K' ? 1000 : 1)).toFixed(0)}${card.unit || ''}`,
//         yoyLabel: generalYoy.yoyLabel,
//         change: generalYoy.yoyPercentage, // Percentage change for the trend indicator
//         ...mdlzInfo,
//       };
//     });

//     res.json({
//       kpis: processedKpiCards,
//       charts: chartsData, // Pass raw chart data; frontend will process for charting libraries
//     });

//   } catch (error) {
//     console.error('Error fetching executive summary:', error);
//     if (error instanceof Error) {
//         res.status(500).json({ message: 'Error fetching executive summary data', error: error.message });
//     } else {
//         res.status(500).json({ message: 'An unknown error occurred while fetching executive summary data' });
//     }
//   }
// };


// // getFilters function (from previous step)
// export const getFilters = async (req: Request, res: Response) => {
//   try {
//     const filterOptions = await getFilterOptions();
//     res.json(filterOptions);
//   } catch (error) {
//     console.error('Error fetching filter options:', error);
//      if (error instanceof Error) {
//         res.status(500).json({ message: 'Error fetching filter options', error: error.message });
//     } else {
//         res.status(500).json({ message: 'An unknown error occurred while fetching filter options' });
//     }
//   }
// };









// // src/controllers/kpiController.ts
// import { Request, Response } from 'express';
// import { AppDataSource } from '../config/database'; // For fetching default year
// import { DimDate } from '../models/DimDate';       // For fetching default year
// import {
//   getFilterOptions,
//   getExecutiveSummaryData,
//   KpiFilters, // Make sure KpiFilters interface from service includes ppg
// } from '../services/kpiService';

// // Helper to format YoY changes for KPI cards
// const formatYoy = (current: number, previous: number, unit: string = '', prefix: string = '', isPrice: boolean = false) => {
//   const absoluteChange = current - previous;
//   let percentageChange = 0;

//   if (previous !== 0) {
//     percentageChange = (absoluteChange / previous) * 100;
//   } else if (current !== 0 && previous === 0) { // Handle growth from zero
//     percentageChange = Infinity; // Or a large number like 99999 if Infinity causes issues with parseFloat
//   } else { // current is 0, previous is 0
//     percentageChange = 0;
//   }

//   let formattedAbsolute: string;
//   if (unit === 'K' && !isPrice) {
//     formattedAbsolute = (absoluteChange / 1000).toFixed(0) + 'K';
//   } else if (isPrice) {
//     formattedAbsolute = absoluteChange.toFixed(2);
//   } else {
//     formattedAbsolute = absoluteChange.toFixed(0); // For raw unit counts
//   }
  
//   let yoyLabel = `YoY: ${absoluteChange >= 0 ? '+' : ''}${prefix}${formattedAbsolute}`;
//   if (percentageChange === Infinity) {
//     yoyLabel += ` (New)`; // Or similar indicator
//   } else if (!isNaN(percentageChange)) {
//     yoyLabel += ` (${percentageChange.toFixed(1)}%)`;
//   } else { // Handle NaN if current and previous are 0 resulting in 0/0
//       yoyLabel += ` (NaN%)`;
//       percentageChange = 0; // Or NaN, decide how to represent this
//   }

//   return {
//     yoyLabel,
//     yoyPercentage: parseFloat(percentageChange.toFixed(2)) || 0, // Default to 0 if NaN
//     yoyAbsolute: absoluteChange,
//     isPositive: absoluteChange >= 0,
//   };
// };


// export const getExecutiveSummary = async (req: Request, res: Response) => {
//   try {
//     const filters: KpiFilters = {
//       year: req.query.year ? parseInt(req.query.year as string) : undefined,
//       quarter: req.query.quarter ? parseInt(req.query.quarter as string) : undefined,
//       region: req.query.region as string || 'All',
//       channel: req.query.channel as string || 'All',
//       manufacturer: req.query.manufacturer as string || 'All',
//       category: req.query.category as string || 'All',
//       brand: req.query.brand as string || 'All',
//       ppg: req.query.ppg as string || 'All', // Added PPG filter from query
//     };

//     if (!filters.year) {
//       const latestYearData = await AppDataSource.getRepository(DimDate)
//         .createQueryBuilder('dd')
//         .select('MAX(dd.year)', 'maxYear')
//         .getRawOne();
//       filters.year = latestYearData?.maxYear || new Date().getFullYear();
//     }

//     const { kpiCardsData, chartsData } = await getExecutiveSummaryData(filters);
//     const processedKpiCards: any[] = [];

//     // Find the base data from the service response
//     const volumeBase = kpiCardsData.find(k => k.id === 'sellOutVolume');
//     const valueBase = kpiCardsData.find(k => k.id === 'sellOutValue');
//     const avgPriceBase = kpiCardsData.find(k => k.id === 'avgPricePerUnit');

//     // Card 1: Sell Out Volume
//     if (volumeBase) {
//       const generalYoy = formatYoy(volumeBase.currentValue, volumeBase.previousValue, 'K', '');
//       const mdlzYoy = formatYoy(volumeBase.mdlzCurrentValue!, volumeBase.mdlzPreviousValue!, 'K', '');
//       processedKpiCards.push({
//         mainLabel: 'Sell Out Volume',
//         value: `${(volumeBase.currentValue / 1000).toFixed(0)}K`,
//         yoyLabel: generalYoy.yoyLabel, change: generalYoy.yoyPercentage,
//         mdlzLabel: 'Volume (Mdlz)',
//         mdlzValue: `${(volumeBase.mdlzCurrentValue! / 1000).toFixed(0)}K`,
//         mdlzYoyChange: mdlzYoy.yoyLabel, mdlzIsPositive: mdlzYoy.isPositive,
//       });
//     }

//     // Card 2: Sell Out Value
//     if (valueBase) {
//       const generalYoy = formatYoy(valueBase.currentValue, valueBase.previousValue, 'K', 'R$');
//       const mdlzYoy = formatYoy(valueBase.mdlzCurrentValue!, valueBase.mdlzPreviousValue!, 'K', 'R$');
//       processedKpiCards.push({
//         mainLabel: 'Sell Out Value',
//         value: `R$${(valueBase.currentValue / 1000).toFixed(0)}K`,
//         yoyLabel: generalYoy.yoyLabel, change: generalYoy.yoyPercentage,
//         mdlzLabel: 'Value (Mdlz)',
//         mdlzValue: `R$${(valueBase.mdlzCurrentValue! / 1000).toFixed(0)}K`,
//         mdlzYoyChange: mdlzYoy.yoyLabel, mdlzIsPositive: mdlzYoy.isPositive,
//       });
//     }
    
//     // Card 3: Sell Out Units (using data from volumeBase, but potentially different formatting/labeling)
//     if (volumeBase) { 
//       // Assuming "Units" are raw counts, not in "K" unless very large.
//       // The original image showed "297,284K" so it seems units are also presented in K.
//       // If it should be raw, remove '/1000' and 'K'.
//       const unitDisplayUnit = 'K'; // Or '' if raw numbers for units
//       const unitValue = (volumeBase.currentValue / (unitDisplayUnit === 'K' ? 1000 : 1)).toFixed(0) + (unitDisplayUnit || '');
//       const mdlzUnitValue = (volumeBase.mdlzCurrentValue! / (unitDisplayUnit === 'K' ? 1000 : 1)).toFixed(0) + (unitDisplayUnit || '');

//       const generalYoyUnits = formatYoy(volumeBase.currentValue, volumeBase.previousValue, unitDisplayUnit, '');
//       const mdlzYoyUnits = formatYoy(volumeBase.mdlzCurrentValue!, volumeBase.mdlzPreviousValue!, unitDisplayUnit, '');
      
//       processedKpiCards.push({
//         mainLabel: 'Sell Out Units',
//         value: unitValue,
//         yoyLabel: generalYoyUnits.yoyLabel, 
//         change: generalYoyUnits.yoyPercentage,
//         mdlzLabel: 'Units (Mdlz)',
//         mdlzValue: mdlzUnitValue,
//         mdlzYoyChange: mdlzYoyUnits.yoyLabel, 
//         mdlzIsPositive: mdlzYoyUnits.isPositive,
//       });
//     }

//     // Card 4: Avg Price Per Unit
//     if (avgPriceBase) {
//       const generalYoy = formatYoy(avgPriceBase.currentValue, avgPriceBase.previousValue, '', 'R$', true); // isPrice = true
//       const mdlzYoy = formatYoy(avgPriceBase.mdlzCurrentValue!, avgPriceBase.mdlzPreviousValue!, '', 'R$', true); // isPrice = true
//       processedKpiCards.push({
//         mainLabel: 'Avg Price Per Unit',
//         value: `R$${(avgPriceBase.currentValue).toFixed(2)}`, // Avg price typically has 2 decimal places
//         yoyLabel: generalYoy.yoyLabel, change: generalYoy.yoyPercentage,
//         mdlzLabel: 'Avg Price (Mdlz)',
//         mdlzValue: `R$${(avgPriceBase.mdlzCurrentValue!).toFixed(2)}`,
//         mdlzYoyChange: mdlzYoy.yoyLabel, mdlzIsPositive: mdlzYoy.isPositive,
//       });
//     }
    
//     // Ensure specific order for KPI cards to match the original UI
//     const kpiOrder = ['Sell Out Volume', 'Sell Out Value', 'Sell Out Units', 'Avg Price Per Unit'];
//     processedKpiCards.sort((a, b) => kpiOrder.indexOf(a.mainLabel) - kpiOrder.indexOf(b.mainLabel));

//     res.json({
//       kpis: processedKpiCards,
//       charts: chartsData,
//     });

//   } catch (error) {
//     console.error('Error fetching executive summary:', error);
//     if (error instanceof Error) {
//         res.status(500).json({ message: 'Error fetching executive summary data', error: error.message });
//     } else {
//         res.status(500).json({ message: 'An unknown error occurred while fetching executive summary data' });
//     }
//   }
// };

// // getFilters function (ensure it's the latest version that includes PPGs)
// export const getFilters = async (req: Request, res: Response) => {
//   try {
//     const filterOptions = await getFilterOptions(); // This service function needs to return PPGs
//     res.json(filterOptions);
//   } catch (error) {
//     console.error('Error fetching filter options:', error);
//     if (error instanceof Error) {
//         res.status(500).json({ message: 'Error fetching filter options', error: error.message });
//     } else {
//         res.status(500).json({ message: 'An unknown error occurred' });
//     }
//   }
// };










// src/controllers/kpiController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { DimDate } from '../models/DimDate';
import {
  getFilterOptions,
  getExecutiveSummaryData,
  KpiFilters, // This interface now includes ppg?: string
} from '../services/kpiService';

// Helper to format YoY changes for KPI cards
const formatYoy = (current: number, previous: number, unit: string = '', prefix: string = '', isPrice: boolean = false) => {
  const absoluteChange = current - previous;
  let percentageChange = 0;

  if (previous !== 0) {
    percentageChange = (absoluteChange / previous) * 100;
  } else if (current !== 0 && previous === 0) {
    percentageChange = Infinity; // Indicates growth from zero
  } else { // current is 0, previous is 0
    percentageChange = 0;
  }

  let formattedAbsolute: string;
  if (unit === 'K' && !isPrice) {
    // For non-price KPIs, format with "K" if unit is "K"
    formattedAbsolute = (absoluteChange / 1000).toFixed(0) + (absoluteChange !== 0 ? 'K' : '');
  } else if (isPrice) {
    // For prices, show 2 decimal places
    formattedAbsolute = absoluteChange.toFixed(2);
  } else {
    // For raw units (if unit is not 'K' and not a price)
    formattedAbsolute = absoluteChange.toFixed(0);
  }
  
  let yoyLabel = `YoY: ${absoluteChange >= 0 ? '+' : ''}${prefix}${formattedAbsolute}`;
  if (percentageChange === Infinity) {
    yoyLabel += ` (New)`; // Or a very large percentage, or specific label
  } else if (!isNaN(percentageChange)) {
    yoyLabel += ` (${percentageChange.toFixed(1)}%)`;
  } else { // Handle cases like 0/0 for percentage
      yoyLabel += ` (0.0%)`; // Or (NaN%) if you prefer to show NaN
      percentageChange = 0; 
  }

  return {
    yoyLabel,
    // Ensure yoyPercentage is a valid number for the 'change' prop
    yoyPercentage: isNaN(percentageChange) || !isFinite(percentageChange) ? 0 : parseFloat(percentageChange.toFixed(2)),
    yoyAbsolute: absoluteChange,
    isPositive: absoluteChange >= 0,
  };
};

export const getExecutiveSummary = async (req: Request, res: Response) => {
  try {
    // Extract and type filters from query parameters
    const filters: KpiFilters = {
      year: req.query.year ? parseInt(req.query.year as string) : undefined,
      quarter: req.query.quarter ? parseInt(req.query.quarter as string) : undefined,
      region: req.query.region as string || 'All',
      channel: req.query.channel as string || 'All',
      manufacturer: req.query.manufacturer as string || 'All',
      category: req.query.category as string || 'All',
      brand: req.query.brand as string || 'All',
      ppg: req.query.ppg as string || 'All', // Added PPG
    };

    // Default to latest year if no year is provided
    if (!filters.year) {
      const latestYearData = await AppDataSource.getRepository(DimDate)
        .createQueryBuilder('dd')
        .select('MAX(dd.year)', 'maxYear')
        .getRawOne();
      filters.year = latestYearData?.maxYear || new Date().getFullYear();
    }

    // Fetch data from the service layer
    const { kpiCardsData: serviceKpiData, chartsData } = await getExecutiveSummaryData(filters);
    
    const processedKpiCards: any[] = []; // To store the 4 formatted KPI cards

    // Find the base data objects from the service response
    const volumeBase = serviceKpiData.find(k => k.id === 'sellOutVolume');
    const valueBase = serviceKpiData.find(k => k.id === 'sellOutValue');
    const avgPriceBase = serviceKpiData.find(k => k.id === 'avgPricePerUnit');

    // Card 1: Sell Out Volume
    if (volumeBase) {
      const generalYoy = formatYoy(volumeBase.currentValue, volumeBase.previousValue, 'K', '');
      const mdlzYoy = formatYoy(volumeBase.mdlzCurrentValue!, volumeBase.mdlzPreviousValue!, 'K', '');
      processedKpiCards.push({
        mainLabel: 'Sell Out Volume',
        value: `${(volumeBase.currentValue / 1000).toFixed(0)}K`,
        yoyLabel: generalYoy.yoyLabel, 
        change: generalYoy.yoyPercentage,
        mdlzLabel: 'Volume (Mdlz)',
        mdlzValue: `${(volumeBase.mdlzCurrentValue! / 1000).toFixed(0)}K`,
        mdlzYoyChange: mdlzYoy.yoyLabel, 
        mdlzIsPositive: mdlzYoy.isPositive,
      });
    }

    // Card 2: Sell Out Value
    if (valueBase) {
      const generalYoy = formatYoy(valueBase.currentValue, valueBase.previousValue, 'K', 'R$');
      const mdlzYoy = formatYoy(valueBase.mdlzCurrentValue!, valueBase.mdlzPreviousValue!, 'K', 'R$');
      processedKpiCards.push({
        mainLabel: 'Sell Out Value',
        value: `R$${(valueBase.currentValue / 1000).toFixed(0)}K`,
        yoyLabel: generalYoy.yoyLabel, 
        change: generalYoy.yoyPercentage,
        mdlzLabel: 'Value (Mdlz)',
        mdlzValue: `R$${(valueBase.mdlzCurrentValue! / 1000).toFixed(0)}K`,
        mdlzYoyChange: mdlzYoy.yoyLabel, 
        mdlzIsPositive: mdlzYoy.isPositive,
      });
    }
    
    // Card 3: Sell Out Units (derived from volumeBase data)
    if (volumeBase) { 
      // Determine if "K" should be used based on your desired display for raw units
      const displayUnitForUnitsCard = 'K'; // Or '' if you want raw numbers like "297284" instead of "297K"
      const kDivisor = displayUnitForUnitsCard === 'K' ? 1000 : 1;
      const kSuffix = displayUnitForUnitsCard === 'K' ? 'K' : '';

      const mainUnitsValue = (volumeBase.currentValue / kDivisor).toFixed(0) + kSuffix;
      const mdlzUnitsValue = (volumeBase.mdlzCurrentValue! / kDivisor).toFixed(0) + kSuffix;

      // YoY for units should likely use the same 'unit' for consistency in the YoY label (e.g., changes in 'K')
      const generalYoyUnits = formatYoy(volumeBase.currentValue, volumeBase.previousValue, 'K', ''); 
      const mdlzYoyUnits = formatYoy(volumeBase.mdlzCurrentValue!, volumeBase.mdlzPreviousValue!, 'K', '');
      
      processedKpiCards.push({
        mainLabel: 'Sell Out Units',
        value: mainUnitsValue,
        yoyLabel: generalYoyUnits.yoyLabel, 
        change: generalYoyUnits.yoyPercentage,
        mdlzLabel: 'Units (Mdlz)',
        mdlzValue: mdlzUnitsValue,
        mdlzYoyChange: mdlzYoyUnits.yoyLabel, 
        mdlzIsPositive: mdlzYoyUnits.isPositive,
      });
    }

    // Card 4: Avg Price Per Unit
    if (avgPriceBase) {
      const generalYoy = formatYoy(avgPriceBase.currentValue, avgPriceBase.previousValue, '', 'R$', true);
      const mdlzYoy = formatYoy(avgPriceBase.mdlzCurrentValue!, avgPriceBase.mdlzPreviousValue!, '', 'R$', true);
      processedKpiCards.push({
        mainLabel: 'Avg Price Per Unit',
        value: `R$${(avgPriceBase.currentValue).toFixed(2)}`,
        yoyLabel: generalYoy.yoyLabel, 
        change: generalYoy.yoyPercentage,
        mdlzLabel: 'Avg Price (Mdlz)',
        mdlzValue: `R$${(avgPriceBase.mdlzCurrentValue!).toFixed(2)}`,
        mdlzYoyChange: mdlzYoy.yoyLabel, 
        mdlzIsPositive: mdlzYoy.isPositive,
      });
    }
    
    // Ensure specific order for KPI cards if the frontend relies on it (e.g., for grid layout)
    const kpiOrder = ['Sell Out Volume', 'Sell Out Value', 'Sell Out Units', 'Avg Price Per Unit'];
    processedKpiCards.sort((a, b) => kpiOrder.indexOf(a.mainLabel) - kpiOrder.indexOf(b.mainLabel));

    res.json({
      kpis: processedKpiCards,
      charts: chartsData,
    });

  } catch (error) {
    console.error('Error fetching executive summary:', error);
    if (error instanceof Error) {
        res.status(500).json({ message: 'Error fetching executive summary data', error: error.message });
    } else {
        // Handle cases where error might not be an Error instance
        res.status(500).json({ message: 'An unknown error occurred while fetching executive summary data' });
    }
  }
};

export const getFilters = async (req: Request, res: Response) => {
  try {
    const filterOptions = await getFilterOptions(); // This now returns PPGs
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