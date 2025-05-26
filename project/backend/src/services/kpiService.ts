// // src/services/kpiService.ts
// import { AppDataSource } from '../config/database';
// import { DimDate } from '../models/DimDate';
// import { DimProduct } from '../models/DimProduct';
// import { DimRegion } from '../models/DimRegion';
// import { DimChannel } from '../models/DimChannel';
// import { DimManufacturer } from '../models/DimManufacturer';
// import { FactSales } from '../models/FactSales';
// import { SelectQueryBuilder } from 'typeorm'; // Brackets might not be needed anymore

// // Interface for filter parameters
// export interface KpiFilters {
//   year?: number;
//   quarter?: number;
//   region?: string;
//   channel?: string;
//   manufacturer?: string;
//   category?: string;
//   brand?: string;
// }

// // Helper to apply filters to a QueryBuilder instance
// const applySalesFilters = (
//   qb: SelectQueryBuilder<FactSales>,
//   filters: KpiFilters,
//   mainAlias: string = 'fact' // Alias for FactSales in the query
// ): SelectQueryBuilder<FactSales> => {
//   qb.innerJoin(`${mainAlias}.dimDate`, 'filter_date_dim');

//   if (filters.year) {
//     qb.andWhere(`filter_date_dim.year = :year`, { year: filters.year });
//   }
//   if (filters.quarter) {
//     qb.andWhere(`filter_date_dim.quarter = :quarter`, { quarter: filters.quarter });
//   }

//   if (filters.region && filters.region.toLowerCase() !== 'all') {
//     qb.innerJoin(`${mainAlias}.dimRegion`, 'filter_region_dim')
//       .andWhere('filter_region_dim.region_name = :region', { region: filters.region });
//   }

//   if (filters.channel && filters.channel.toLowerCase() !== 'all') {
//     qb.innerJoin(`${mainAlias}.dimChannel`, 'filter_channel_dim')
//       .andWhere('filter_channel_dim.channel_retailer_name = :channel', { channel: filters.channel });
//   }
  
//   // Product related filters need to join DimProduct
//   // We use a flag and a helper to ensure DimProduct is joined only once if multiple product filters are applied
//   let productDimJoinedForMainFilter = false;
//   const ensureProductDimJoinedForMainFilter = (alias: string = 'filter_product_dim_main') => {
//     if (!productDimJoinedForMainFilter) {
//       qb.innerJoin(`${mainAlias}.dimProduct`, alias);
//       productDimJoinedForMainFilter = true;
//     }
//     return alias; // Return the alias used
//   };
  
//   let manufacturerDimJoinedForMainFilter = false;
//   const ensureManufacturerDimJoinedForMainFilter = (alias: string = 'filter_manufacturer_dim_main') => {
//       if (!manufacturerDimJoinedForMainFilter) {
//          qb.innerJoin(`${mainAlias}.dimManufacturer`, alias);
//          manufacturerDimJoinedForMainFilter = true;
//       }
//       return alias;
//   };

//   if (filters.manufacturer && filters.manufacturer.toLowerCase() !== 'all') {
//     const manufacturerAlias = ensureManufacturerDimJoinedForMainFilter();
//     qb.andWhere(`${manufacturerAlias}.manufacturer_source_id = :manufacturer`, { manufacturer: filters.manufacturer });
//   }

//   if (filters.category && filters.category.toLowerCase() !== 'all') {
//     const productAlias = ensureProductDimJoinedForMainFilter();
//     qb.andWhere(`${productAlias}.category = :category`, { category: filters.category });
//   }

//   if (filters.brand && filters.brand.toLowerCase() !== 'all') {
//     const productAlias = ensureProductDimJoinedForMainFilter(); // ensure joined, get alias
//     qb.andWhere(`${productAlias}.brand = :brand`, { brand: filters.brand });
//   }
  
//   return qb;
// };


// export const getExecutiveSummaryData = async (filters: KpiFilters) => {
//   const factRepo = AppDataSource.getRepository(FactSales);

//   // --- 1. Main KPI Card Data (Sell Out Volume, Value, etc.) ---
//   const currentQb = factRepo.createQueryBuilder('fact');
//   applySalesFilters(currentQb, filters);
//   const currentPeriodAggregates = await currentQb
//     .select('SUM(fact.unit_sales)', 'totalUnitSales')
//     .addSelect('SUM(fact.value_sales)', 'totalValueSales')
//     .addSelect('SUM(fact.value_sales) / NULLIF(SUM(fact.unit_sales), 0)', 'avgPricePerUnit')
//     .getRawOne();

//   let previousPeriodAggregatesData: any = { totalUnitSales: null, totalValueSales: null, avgPricePerUnit: null };
//   if (filters.year) {
//     const previousYearFilters: KpiFilters = { ...filters, year: filters.year - 1 };
//     const previousQb = factRepo.createQueryBuilder('fact');
//     applySalesFilters(previousQb, previousYearFilters);
//     previousPeriodAggregatesData = await previousQb
//       .select('SUM(fact.unit_sales)', 'totalUnitSales')
//       .addSelect('SUM(fact.value_sales)', 'totalValueSales')
//       .addSelect('SUM(fact.value_sales) / NULLIF(SUM(fact.unit_sales), 0)', 'avgPricePerUnit')
//       .getRawOne() || { totalUnitSales: null, totalValueSales: null, avgPricePerUnit: null };
//   }

//   const currentUnits = Number(currentPeriodAggregates?.totalUnitSales) || 0;
//   const currentValue = Number(currentPeriodAggregates?.totalValueSales) || 0;
//   const currentAvgPrice = Number(currentPeriodAggregates?.avgPricePerUnit) || 0;

//   const previousUnits = Number(previousPeriodAggregatesData?.totalUnitSales) || 0;
//   const previousValue = Number(previousPeriodAggregatesData?.totalValueSales) || 0;
//   const previousAvgPrice = Number(previousPeriodAggregatesData?.avgPricePerUnit) || 0;

//   // --- "Mdlz" (Mondelez) specific data ---
//   // !!! IMPORTANT: REPLACE 'MAN_715cc2' WITH YOUR ACTUAL MONDELEZ ID FROM /api/filters !!!
//   const mondelezManufacturerId = 'MAN_715cc2'; 
  
//   const mdlzCurrentFilters: KpiFilters = { ...filters, manufacturer: mondelezManufacturerId };
//   const mdlzCurrentQb = factRepo.createQueryBuilder('fact');
//   applySalesFilters(mdlzCurrentQb, mdlzCurrentFilters);
//   const mdlzCurrentAggregates = await mdlzCurrentQb
//     .select('SUM(fact.unit_sales)', 'totalUnitSales')
//     .addSelect('SUM(fact.value_sales)', 'totalValueSales')
//     .getRawOne();
  
//   let mdlzPreviousAggregatesData: any = { totalUnitSales: null, totalValueSales: null };
//   if (filters.year) {
//     const mdlzPreviousFilters: KpiFilters = { ...mdlzCurrentFilters, year: filters.year - 1 };
//     const mdlzPreviousQb = factRepo.createQueryBuilder('fact');
//     applySalesFilters(mdlzPreviousQb, mdlzPreviousFilters);
//     mdlzPreviousAggregatesData = await mdlzPreviousQb
//       .select('SUM(fact.unit_sales)', 'totalUnitSales')
//       .addSelect('SUM(fact.value_sales)', 'totalValueSales')
//       .getRawOne() || { totalUnitSales: null, totalValueSales: null };
//   }

//   const mdlzCurrentUnits = Number(mdlzCurrentAggregates?.totalUnitSales) || 0;
//   const mdlzPreviousUnits = Number(mdlzPreviousAggregatesData?.totalUnitSales) || 0;

//   const kpiCardsData = [
//     {
//       id: 'sellOutVolume', mainLabel: 'Sell Out Volume',
//       currentValue: currentUnits, previousValue: previousUnits,
//       mdlzCurrentValue: mdlzCurrentUnits, mdlzPreviousValue: mdlzPreviousUnits,
//       unit: 'K', prefix: '',
//     },
//     {
//       id: 'sellOutValue', mainLabel: 'Sell Out Value',
//       currentValue: currentValue, previousValue: previousValue,
//       mdlzCurrentValue: Number(mdlzCurrentAggregates?.totalValueSales) || 0,
//       mdlzPreviousValue: Number(mdlzPreviousAggregatesData?.totalValueSales) || 0,
//       unit: 'K', prefix: 'R$',
//     },
//     {
//       id: 'avgPricePerUnit', mainLabel: 'Avg Price Per Unit',
//       currentValue: currentAvgPrice, previousValue: previousAvgPrice,
//       unit: '', prefix: 'R$',
//     },
//   ];

//   // --- Chart Data Setup ---
//   // !!! IMPORTANT: REPLACE THESE WITH YOUR ACTUAL IDs AND DESIRED DISPLAY NAMES !!!
//   type ManufacturerNameMap = { [key: string]: string; };
//   const trackedManufacturerIds = [
//     'MAN_715cc2', // Example: Mondelez Intl (MUST BE IN YOUR /api/filters output)
//     'MAN_920d0c', // Example: LU (MUST BE IN YOUR /api/filters output)
//     'MAN_a75436', // Example: BIMBO (MUST BE IN YOUR /api/filters output)
//     // Add more MAN_... codes for other manufacturers you want to track by name
//   ];
//   const trackedManufacturerNames: ManufacturerNameMap = { 
//     'MAN_715cc2': 'MONDELEZ',
//     'MAN_920d0c': 'LU',
//     'MAN_a75436': 'BIMBO',
//     // Add mappings for any other IDs in trackedManufacturerIds
//   };
//   const getManufacturerGroupName = (id: string) => trackedManufacturerNames[id] || 'OUTROS';

//   // Helper to generate the CASE expression for manufacturer grouping
//   const manufacturerGroupCaseExpression = (manufacturerTableAlias: string) => `
//     CASE ${trackedManufacturerIds.map(id => 
//       `WHEN ${manufacturerTableAlias}.manufacturer_source_id = '${id}' THEN '${getManufacturerGroupName(id)}'`
//     ).join(' ')}
//        ELSE 'OUTROS' 
//      END
//   `;

//   // --- 2. Volume Market Share Chart Data ---
//   const marketShareQb = factRepo.createQueryBuilder('fact_ms'); // Use distinct alias for fact table
//   applySalesFilters(marketShareQb, filters, 'fact_ms'); 
//   marketShareQb
//     .innerJoin('fact_ms.dimManufacturer', 'ms_manufacturer_dim')
//     .innerJoin('fact_ms.dimDate', 'ms_date_dim') // Ensure this alias for dimDate is used by applySalesFilters or is distinct
//     .select('ms_date_dim.year', 'year')
//     .addSelect('ms_date_dim.month', 'month')
//     .addSelect('ms_date_dim.month_name', 'monthName')
//     .addSelect(manufacturerGroupCaseExpression('ms_manufacturer_dim'), 'manufacturerGroup')
//     .addSelect('SUM(fact_ms.unit_sales)', 'monthlyUnitSales')
//     .groupBy(`ms_date_dim.year, ms_date_dim.month, ms_date_dim.month_name, ${manufacturerGroupCaseExpression('ms_manufacturer_dim')}`)
//     .orderBy('ms_date_dim.year, ms_date_dim.month');
  
//   const volumeMarketShareRaw = await marketShareQb.getRawMany();

//   // --- 3. Value Sales - Quarter Analysis Chart Data ---
//   const quarterlySalesQb = factRepo.createQueryBuilder('fact_qs');
//   applySalesFilters(quarterlySalesQb, filters, 'fact_qs');
//   quarterlySalesQb
//     .innerJoin('fact_qs.dimRegion', 'qs_region_dim') 
//     .innerJoin('fact_qs.dimDate', 'qs_date_dim') // Ensure this alias for dimDate is used by applySalesFilters or is distinct
//     .select('qs_date_dim.year', 'year')
//     .addSelect('qs_date_dim.quarter', 'quarter')
//     .addSelect('qs_region_dim.region_name', 'regionName')
//     .addSelect('SUM(fact_qs.value_sales)', 'quarterlyValueSales')
//     .groupBy('qs_date_dim.year, qs_date_dim.quarter, qs_region_dim.region_name')
//     .orderBy('qs_date_dim.year, qs_date_dim.quarter, qs_region_dim.region_name');
    
//   const valueSalesQuarterlyRaw = await quarterlySalesQb.getRawMany();

//   // --- 4. Value Sales - Performance Over Time (by manufacturer group) ---
//   const performanceOverTimeQb = factRepo.createQueryBuilder('fact_pot');
//   applySalesFilters(performanceOverTimeQb, filters, 'fact_pot');
//   performanceOverTimeQb
//     .innerJoin('fact_pot.dimManufacturer', 'pot_manufacturer_dim')
//     .innerJoin('fact_pot.dimDate', 'pot_date_dim') // Ensure this alias for dimDate is used by applySalesFilters or is distinct
//     .select('pot_date_dim.year', 'year')
//     .addSelect('pot_date_dim.month', 'month')
//     .addSelect('pot_date_dim.month_name', 'monthName')
//     .addSelect(manufacturerGroupCaseExpression('pot_manufacturer_dim'), 'manufacturerGroup')
//     .addSelect('SUM(fact_pot.value_sales)', 'monthlyValueSales')
//     .groupBy(`pot_date_dim.year, pot_date_dim.month, pot_date_dim.month_name, ${manufacturerGroupCaseExpression('pot_manufacturer_dim')}`)
//     .orderBy('pot_date_dim.year, pot_date_dim.month');

//   const valueSalesPerformanceRaw = await performanceOverTimeQb.getRawMany();

//   return {
//     kpiCardsData,
//     chartsData: {
//       volumeMarketShare: volumeMarketShareRaw,
//       valueSalesQuarterly: valueSalesQuarterlyRaw,
//       valueSalesPerformance: valueSalesPerformanceRaw,
//     },
//   };
// };

// // getFilterOptions function (This should be correct from previous steps)
// export const getFilterOptions = async () => {
//   const dateRepo = AppDataSource.getRepository(DimDate);
//   const productRepo = AppDataSource.getRepository(DimProduct);
//   const regionRepo = AppDataSource.getRepository(DimRegion);
//   const channelRepo = AppDataSource.getRepository(DimChannel);
//   const manufacturerRepo = AppDataSource.getRepository(DimManufacturer);

//   const years = await dateRepo.createQueryBuilder('d')
//     .select('DISTINCT d.year', 'year')
//     .orderBy('d.year', 'DESC')
//     .getRawMany();

//   const regions = await regionRepo.createQueryBuilder('r')
//     .select('DISTINCT r.region_name', 'name')
//     .orderBy('r.region_name', 'ASC')
//     .getRawMany();

//   const channels = await channelRepo.createQueryBuilder('c')
//     .select('DISTINCT c.channel_retailer_name', 'name')
//     .orderBy('c.channel_retailer_name', 'ASC')
//     .getRawMany();

//   const manufacturers = await manufacturerRepo.createQueryBuilder('m')
//     .select('DISTINCT m.manufacturer_source_id', 'id') // This now fetches MAN_... codes
//     .orderBy('m.manufacturer_source_id', 'ASC')
//     .getRawMany();

//   const categories = await productRepo.createQueryBuilder('p')
//     .select('DISTINCT p.category', 'name')
//     .andWhere("p.category IS NOT NULL AND p.category != ''")
//     .orderBy('p.category', 'ASC')
//     .getRawMany();

//   const brands = await productRepo.createQueryBuilder('p')
//     .select('DISTINCT p.brand', 'name')
//     .andWhere("p.brand IS NOT NULL AND p.brand != ''")
//     .orderBy('p.brand', 'ASC')
//     .getRawMany();

//   return {
//     years: years.map(y => y.year),
//     quarters: [
//       { value: 1, label: 'Q1' }, { value: 2, label: 'Q2' },
//       { value: 3, label: 'Q3' }, { value: 4, label: 'Q4' },
//     ],
//     regions: [{ value: 'All', label: 'All Regions' }, ...regions.map(r => ({ value: r.name, label: r.name }))],
//     channels: [{ value: 'All', label: 'All Channels' }, ...channels.map(c => ({ value: c.name, label: c.name }))],
//     manufacturers: [{ value: 'All', label: 'All Manufacturers' }, ...manufacturers.map(m => ({ value: m.id, label: m.id }))],
//     categories: [{ value: 'All', label: 'All Categories' }, ...categories.map(cat => ({ value: cat.name, label: cat.name }))],
//     brands: [{ value: 'All', label: 'All Brands' }, ...brands.map(b => ({ value: b.name, label: b.name }))],
//   };
// };







// // src/services/kpiService.ts
// import { AppDataSource } from '../config/database';
// import { DimDate } from '../models/DimDate';
// import { DimProduct } from '../models/DimProduct';
// import { DimRegion } from '../models/DimRegion';
// import { DimChannel } from '../models/DimChannel';
// import { DimManufacturer } from '../models/DimManufacturer';
// import { FactSales } from '../models/FactSales';
// import { SelectQueryBuilder } from 'typeorm';

// // Interface for filter parameters passed from the controller
// export interface KpiFilters {
//   year?: number;
//   quarter?: number;
//   region?: string;
//   channel?: string;
//   manufacturer?: string; // This will be a MAN_... code when filtering
//   category?: string;
//   brand?: string;
//   ppg?: string;
// }

// // Helper to apply filters to a QueryBuilder instance
// const applySalesFilters = (
//   qb: SelectQueryBuilder<FactSales>,
//   filters: KpiFilters,
//   mainFactAlias: string = 'fact'
// ): SelectQueryBuilder<FactSales> => {
//   const dateDimAlias = `${mainFactAlias}_filter_date_dim`;
//   if (!qb.expressionMap.aliases.find(alias => alias.name === dateDimAlias)) {
//     qb.innerJoin(`${mainFactAlias}.dimDate`, dateDimAlias);
//   }

//   if (filters.year) qb.andWhere(`${dateDimAlias}.year = :year`, { year: filters.year });
//   if (filters.quarter) qb.andWhere(`${dateDimAlias}.quarter = :quarter`, { quarter: filters.quarter });

//   if (filters.region && filters.region.toLowerCase() !== 'all') {
//     const regionDimAlias = `${mainFactAlias}_filter_region_dim`;
//     if (!qb.expressionMap.aliases.find(alias => alias.name === regionDimAlias)) {
//         qb.innerJoin(`${mainFactAlias}.dimRegion`, regionDimAlias);
//     }
//     qb.andWhere(`${regionDimAlias}.region_name = :region`, { region: filters.region });
//   }

//   if (filters.channel && filters.channel.toLowerCase() !== 'all') {
//     const channelDimAlias = `${mainFactAlias}_filter_channel_dim`;
//      if (!qb.expressionMap.aliases.find(alias => alias.name === channelDimAlias)) {
//         qb.innerJoin(`${mainFactAlias}.dimChannel`, channelDimAlias);
//     }
//     qb.andWhere(`${channelDimAlias}.channel_retailer_name = :channel`, { channel: filters.channel });
//   }
  
//   let productDimJoinedAlias: string | undefined;
//   const ensureProductDimJoined = (): string => {
//       if (!productDimJoinedAlias) {
//           productDimJoinedAlias = `${mainFactAlias}_filter_product_dim`;
//           if (!qb.expressionMap.aliases.find(a => a.name === productDimJoinedAlias)) {
//               qb.innerJoin(`${mainFactAlias}.dimProduct`, productDimJoinedAlias);
//           }
//       }
//       return productDimJoinedAlias;
//   };
  
//   let manufacturerDimJoinedAlias: string | undefined;
//    const ensureManufacturerDimJoined = (): string => {
//       if (!manufacturerDimJoinedAlias) {
//           manufacturerDimJoinedAlias = `${mainFactAlias}_filter_manufacturer_dim`;
//           if (!qb.expressionMap.aliases.find(a => a.name === manufacturerDimJoinedAlias)) {
//              qb.innerJoin(`${mainFactAlias}.dimManufacturer`, manufacturerDimJoinedAlias);
//           }
//       }
//       return manufacturerDimJoinedAlias;
//   };

//   if (filters.manufacturer && filters.manufacturer.toLowerCase() !== 'all') {
//     const manufacturerAlias = ensureManufacturerDimJoined();
//     qb.andWhere(`${manufacturerAlias}.manufacturer_source_id = :manufacturer`, { manufacturer: filters.manufacturer });
//   }
//   if (filters.category && filters.category.toLowerCase() !== 'all') {
//     const productAlias = ensureProductDimJoined();
//     qb.andWhere(`${productAlias}.category = :category`, { category: filters.category });
//   }
//   if (filters.brand && filters.brand.toLowerCase() !== 'all') {
//     const productAlias = ensureProductDimJoined(); 
//     qb.andWhere(`${productAlias}.brand = :brand`, { brand: filters.brand });
//   }
//   if (filters.ppg && filters.ppg.toLowerCase() !== 'all') {
//     const productAlias = ensureProductDimJoined(); 
//     qb.andWhere(`${productAlias}.ppg_source_id = :ppg`, { ppg: filters.ppg });
//   }
//   return qb;
// };

// export const getExecutiveSummaryData = async (filters: KpiFilters) => {
//   const factRepo = AppDataSource.getRepository(FactSales);

//   // --- 1. Main KPI Card Data ---
//   // (This section remains the same as it correctly calculates base and Mdlz figures)
//   const currentQb = factRepo.createQueryBuilder('fact_current');
//   applySalesFilters(currentQb, filters, 'fact_current');
//   const currentPeriodAggregates = await currentQb
//     .select(`SUM(fact_current.unit_sales)`, 'totalUnitSales')
//     .addSelect(`SUM(fact_current.value_sales)`, 'totalValueSales')
//     .addSelect(`SUM(fact_current.value_sales) / NULLIF(SUM(fact_current.unit_sales), 0)`, 'avgPricePerUnit')
//     .getRawOne();

//   let previousPeriodAggregatesData: any = { totalUnitSales: null, totalValueSales: null, avgPricePerUnit: null };
//   if (filters.year) {
//     const previousYearFilters: KpiFilters = { ...filters, year: filters.year - 1 };
//     const previousQb = factRepo.createQueryBuilder('fact_previous');
//     applySalesFilters(previousQb, previousYearFilters, 'fact_previous');
//     previousPeriodAggregatesData = await previousQb
//       .select(`SUM(fact_previous.unit_sales)`, 'totalUnitSales')
//       .addSelect(`SUM(fact_previous.value_sales)`, 'totalValueSales')
//       .addSelect(`SUM(fact_previous.value_sales) / NULLIF(SUM(fact_previous.unit_sales), 0)`, 'avgPricePerUnit')
//       .getRawOne() || { totalUnitSales: null, totalValueSales: null, avgPricePerUnit: null };
//   }

//   const currentUnits = Number(currentPeriodAggregates?.totalUnitSales) || 0;
//   const currentValue = Number(currentPeriodAggregates?.totalValueSales) || 0;
//   const currentAvgPrice = Number(currentPeriodAggregates?.avgPricePerUnit) || 0;
//   const previousUnits = Number(previousPeriodAggregatesData?.totalUnitSales) || 0;
//   const previousValue = Number(previousPeriodAggregatesData?.totalValueSales) || 0;
//   const previousAvgPrice = Number(previousPeriodAggregatesData?.avgPricePerUnit) || 0;

//   const mondelezManufacturerId = 'MAN_715cc2'; // This ID is used for the "Mdlz" specific KPI values
  
//   const mdlzCurrentFilters: KpiFilters = { ...filters, manufacturer: mondelezManufacturerId };
//   const mdlzCurrentQb = factRepo.createQueryBuilder('fact_mdlz_current');
//   applySalesFilters(mdlzCurrentQb, mdlzCurrentFilters, 'fact_mdlz_current');
//   const mdlzCurrentAggregates = await mdlzCurrentQb
//     .select(`SUM(fact_mdlz_current.unit_sales)`, 'totalUnitSales')
//     .addSelect(`SUM(fact_mdlz_current.value_sales)`, 'totalValueSales')
//     .getRawOne();
  
//   let mdlzPreviousAggregatesData: any = { totalUnitSales: null, totalValueSales: null };
//   if (filters.year) {
//     const mdlzPreviousFilters: KpiFilters = { ...mdlzCurrentFilters, year: filters.year - 1 };
//     const mdlzPreviousQb = factRepo.createQueryBuilder('fact_mdlz_previous');
//     applySalesFilters(mdlzPreviousQb, mdlzPreviousFilters, 'fact_mdlz_previous');
//     mdlzPreviousAggregatesData = await mdlzPreviousQb
//       .select(`SUM(fact_mdlz_previous.unit_sales)`, 'totalUnitSales')
//       .addSelect(`SUM(fact_mdlz_previous.value_sales)`, 'totalValueSales')
//       .getRawOne() || { totalUnitSales: null, totalValueSales: null };
//   }
//   const mdlzCurrentUnits = Number(mdlzCurrentAggregates?.totalUnitSales) || 0;
//   const mdlzPreviousUnits = Number(mdlzPreviousAggregatesData?.totalUnitSales) || 0;
//   const mdlzCurrentValue = Number(mdlzCurrentAggregates?.totalValueSales) || 0;
//   const mdlzPreviousValue = Number(mdlzPreviousAggregatesData?.totalValueSales) || 0;

//   const kpiCardsData = [
//     { id: 'sellOutVolume', mainLabel: 'Base Sell Out Volume/Units', currentValue: currentUnits, previousValue: previousUnits,
//       mdlzCurrentValue: mdlzCurrentUnits, mdlzPreviousValue: mdlzPreviousUnits, unit: 'K', prefix: '' },
//     { id: 'sellOutValue', mainLabel: 'Base Sell Out Value', currentValue: currentValue, previousValue: previousValue,
//       mdlzCurrentValue: mdlzCurrentValue, mdlzPreviousValue: mdlzPreviousValue, unit: 'K', prefix: 'R$' },
//     { id: 'avgPricePerUnit', mainLabel: 'Base Avg Price Per Unit', currentValue: currentAvgPrice, previousValue: previousAvgPrice,
//       mdlzCurrentValue: mdlzCurrentUnits !== 0 ? mdlzCurrentValue / mdlzCurrentUnits : 0, 
//       mdlzPreviousValue: mdlzPreviousUnits !== 0 ? mdlzPreviousValue / mdlzPreviousUnits : 0,
//       unit: '', prefix: 'R$' },
//   ];

//   // --- Chart Data Setup ---
//   // <<<< CHANGED: This array now holds the DEBRANDED IDs you want to see as separate lines/segments on charts >>>>
//   const trackedManufacturerDebrandedIds = [ 
//     'MAN_715cc2', // Debranded ID for Mondelez
//     'MAN_920d0c', // Debranded ID for LU
//     'MAN_a75436', // Debranded ID for BIMBO
//     // Add other MAN_... debranded codes you want to specifically track on charts
//   ];

//   // <<<< CHANGED: This CASE expression will now output the debranded ID itself for tracked ones, or 'OUTROS' >>>>
//   const manufacturerGroupCaseExpression = (manufacturerTableAlias: string) => 
//     `CASE 
//       ${trackedManufacturerDebrandedIds.map(id => 
//         `WHEN ${manufacturerTableAlias}.manufacturer_source_id = '${id}' THEN '${id}'` // Output the debranded ID
//       ).join(' ')} 
//       ELSE 'OUTROS' 
//     END`;

//   // Volume Market Share
//   const marketShareQb = factRepo.createQueryBuilder('fact_ms'); 
//   applySalesFilters(marketShareQb, filters, 'fact_ms'); 
//   const volumeMarketShareRaw = await marketShareQb
//     .innerJoin('fact_ms.dimManufacturer', 'ms_manufacturer_dim')
//     .innerJoin('fact_ms.dimDate', 'ms_date_dim') 
//     .select([
//         'ms_date_dim.year AS year', 
//         'ms_date_dim.month AS month', 
//         'ms_date_dim.month_name AS "monthName"', 
//         `${manufacturerGroupCaseExpression('ms_manufacturer_dim')} AS "manufacturerGroup"`, // This will be MAN_... or OUTROS
//         'SUM(fact_ms.unit_sales) AS "monthlyUnitSales"'
//     ])
//     .groupBy(`ms_date_dim.year, ms_date_dim.month, ms_date_dim.month_name, ${manufacturerGroupCaseExpression('ms_manufacturer_dim')}`)
//     .orderBy('year, month')
//     .getRawMany();
  
//   // Value Sales - Quarter Analysis (No change needed here as it's by region)
//   const quarterlySalesQb = factRepo.createQueryBuilder('fact_qs');
//   applySalesFilters(quarterlySalesQb, filters, 'fact_qs');
//   const valueSalesQuarterlyRaw = await quarterlySalesQb
//     .innerJoin('fact_qs.dimRegion', 'qs_region_dim') 
//     .innerJoin('fact_qs.dimDate', 'qs_date_dim') 
//     .select([
//         'qs_date_dim.year AS year', 
//         'qs_date_dim.quarter AS quarter', 
//         'qs_region_dim.region_name AS "regionName"', 
//         'SUM(fact_qs.value_sales) AS "quarterlyValueSales"'
//     ])
//     .groupBy('qs_date_dim.year, qs_date_dim.quarter, qs_region_dim.region_name')
//     .orderBy('year, quarter, "regionName"')
//     .getRawMany();
    
//   // Value Sales - Performance Over Time
//   const performanceOverTimeQb = factRepo.createQueryBuilder('fact_pot');
//   applySalesFilters(performanceOverTimeQb, filters, 'fact_pot');
//   const valueSalesPerformanceRaw = await performanceOverTimeQb
//     .innerJoin('fact_pot.dimManufacturer', 'pot_manufacturer_dim')
//     .innerJoin('fact_pot.dimDate', 'pot_date_dim') 
//     .select([
//         'pot_date_dim.year AS year', 
//         'pot_date_dim.month AS month', 
//         'pot_date_dim.month_name AS "monthName"', 
//         `${manufacturerGroupCaseExpression('pot_manufacturer_dim')} AS "manufacturerGroup"`, // This will be MAN_... or OUTROS
//         'SUM(fact_pot.value_sales) AS "monthlyValueSales"'
//     ])
//     .groupBy(`pot_date_dim.year, pot_date_dim.month, pot_date_dim.month_name, ${manufacturerGroupCaseExpression('pot_manufacturer_dim')}`)
//     .orderBy('year, month')
//     .getRawMany();

//   // TODO: Implement query for channelDistributionDataRaw
//   const channelDistributionDataRaw: any[] = []; 

//   return {
//     kpiCardsData, // This provides base metrics for the controller
//     chartsData: {
//       volumeMarketShare: volumeMarketShareRaw,
//       valueSalesQuarterly: valueSalesQuarterlyRaw,
//       valueSalesPerformance: valueSalesPerformanceRaw,
//       channelDistributionData: channelDistributionDataRaw, 
//     },
//   };
// };

// // getFilterOptions function remains unchanged from the last version that correctly fetches PPGs
// export const getFilterOptions = async () => {
//   const dateRepo = AppDataSource.getRepository(DimDate);
//   const productRepo = AppDataSource.getRepository(DimProduct);
//   const regionRepo = AppDataSource.getRepository(DimRegion);
//   const channelRepo = AppDataSource.getRepository(DimChannel);
//   const manufacturerRepo = AppDataSource.getRepository(DimManufacturer);

//   const [
//     yearsData, regionsData, channelsData, manufacturersData,
//     categoriesData, brandsData, ppgsDataRaw
//   ] = await Promise.all([
//     dateRepo.createQueryBuilder('d').select('DISTINCT d.year', 'year').orderBy('d.year', 'DESC').getRawMany(),
//     regionRepo.createQueryBuilder('r').select('DISTINCT r.region_name', 'name').orderBy('r.region_name', 'ASC').getRawMany(),
//     channelRepo.createQueryBuilder('c').select('DISTINCT c.channel_retailer_name', 'name').orderBy('c.channel_retailer_name', 'ASC').getRawMany(),
//     manufacturerRepo.createQueryBuilder('m').select('DISTINCT m.manufacturer_source_id', 'id').orderBy('m.manufacturer_source_id', 'ASC').getRawMany(),
//     productRepo.createQueryBuilder('p_cat').select('DISTINCT p_cat.category', 'name').andWhere("p_cat.category IS NOT NULL AND p_cat.category != ''").orderBy('p_cat.category', 'ASC').getRawMany(),
//     productRepo.createQueryBuilder('p_brand').select('DISTINCT p_brand.brand', 'name').andWhere("p_brand.brand IS NOT NULL AND p_brand.brand != ''").orderBy('p_brand.brand', 'ASC').getRawMany(),
//     productRepo.createQueryBuilder('p_ppg')
//       .select('p_ppg.ppg_source_id', 'ppg_id')
//       .distinct(true)
//       .andWhere("p_ppg.ppg_source_id IS NOT NULL AND p_ppg.ppg_source_id != ''")
//       .orderBy('p_ppg.ppg_source_id', 'ASC')
//       .limit(1000)
//       .getRawMany()
//   ]);

//   const ppgsMapped = ppgsDataRaw.map(p => ({ value: p.ppg_id, label: p.ppg_id }));

//   return {
//     years: yearsData.map(y => y.year),
//     quarters: [ { value: 1, label: 'Q1' }, { value: 2, label: 'Q2' }, { value: 3, label: 'Q3' }, { value: 4, label: 'Q4' }],
//     regions: [{ value: 'All', label: 'All Regions' }, ...regionsData.map(r => ({ value: r.name, label: r.name }))],
//     channels: [{ value: 'All', label: 'All Channels' }, ...channelsData.map(c => ({ value: c.name, label: c.name }))],
//     manufacturers: [{ value: 'All', label: 'All Manufacturers' }, ...manufacturersData.map(m => ({ value: m.id, label: m.id }))], // This sends MAN_... as value and label
//     categories: [{ value: 'All', label: 'All Categories' }, ...categoriesData.map(cat => ({ value: cat.name, label: cat.name }))],
//     brands: [{ value: 'All', label: 'All Brands' }, ...brandsData.map(b => ({ value: b.name, label: b.name }))],
//     ppgs: [{ value: 'All', label: 'All PPGs' }, ...ppgsMapped]
//   };
// };







// src/services/kpiService.ts
import { AppDataSource } from '../config/database';
import { DimDate } from '../models/DimDate';
import { DimProduct } from '../models/DimProduct';
import { DimRegion } from '../models/DimRegion';
import { DimChannel } from '../models/DimChannel';
import { DimManufacturer } from '../models/DimManufacturer';
import { FactSales } from '../models/FactSales';
import { SelectQueryBuilder } from 'typeorm';

// Interface for filter parameters passed from the controller
export interface KpiFilters {
  year?: number;
  quarter?: number;
  region?: string;
  channel?: string;
  manufacturer?: string; // This will be a MAN_... code when filtering
  category?: string;
  brand?: string;
  ppg?: string;
}

// Helper to apply filters to a QueryBuilder instance
const applySalesFilters = (
  qb: SelectQueryBuilder<FactSales>,
  filters: KpiFilters,
  mainFactAlias: string = 'fact'
): SelectQueryBuilder<FactSales> => {
  // Ensure DimDate is joined, using a consistent alias for it within this helper
  const dateDimAlias = `${mainFactAlias}_filter_date_dim`;
  // Check if an alias with this name targeting DimDate already exists for this mainFactAlias context
  if (!qb.expressionMap.aliases.find(alias => alias.name === dateDimAlias && alias.metadata.target === DimDate)) {
    qb.innerJoin(`${mainFactAlias}.dimDate`, dateDimAlias);
  }

  if (filters.year) qb.andWhere(`${dateDimAlias}.year = :year`, { year: filters.year });
  if (filters.quarter) qb.andWhere(`${dateDimAlias}.quarter = :quarter`, { quarter: filters.quarter });

  if (filters.region && filters.region.toLowerCase() !== 'all') {
    const regionDimAlias = `${mainFactAlias}_filter_region_dim`;
    if (!qb.expressionMap.aliases.find(alias => alias.name === regionDimAlias && alias.metadata.target === DimRegion)) {
        qb.innerJoin(`${mainFactAlias}.dimRegion`, regionDimAlias);
    }
    qb.andWhere(`${regionDimAlias}.region_name = :region`, { region: filters.region });
  }

  if (filters.channel && filters.channel.toLowerCase() !== 'all') {
    const channelDimAlias = `${mainFactAlias}_filter_channel_dim`;
     if (!qb.expressionMap.aliases.find(alias => alias.name === channelDimAlias && alias.metadata.target === DimChannel)) {
        qb.innerJoin(`${mainFactAlias}.dimChannel`, channelDimAlias);
    }
    qb.andWhere(`${channelDimAlias}.channel_retailer_name = :channel`, { channel: filters.channel });
  }
  
  // For product and manufacturer related filters, manage join aliases carefully
  // These helpers create unique aliases by suffixing with current alias count to avoid clashes if called multiple times on same qb
  // Note: For applySalesFilters, these helpers are re-instantiated on each call, so their internal state doesn't persist across calls.
  // The uniqueness of mainFactAlias handles separation between different base queries (e.g., fact_current vs fact_ms).
  let productDimJoinedAliasCache: string | undefined; // Cache for the current applySalesFilters call
  const ensureProductDimJoined = (): string => {
      if (!productDimJoinedAliasCache) {
          productDimJoinedAliasCache = `${mainFactAlias}_filter_product_dim`;
          if (!qb.expressionMap.aliases.find(a => a.name === productDimJoinedAliasCache && a.metadata.target === DimProduct)) {
              qb.innerJoin(`${mainFactAlias}.dimProduct`, productDimJoinedAliasCache);
          }
      }
      return productDimJoinedAliasCache;
  };
  
  let manufacturerDimJoinedAliasCache: string | undefined; // Cache for the current applySalesFilters call
   const ensureManufacturerDimJoined = (): string => {
      if (!manufacturerDimJoinedAliasCache) {
          manufacturerDimJoinedAliasCache = `${mainFactAlias}_filter_manufacturer_dim`;
          if (!qb.expressionMap.aliases.find(a => a.name === manufacturerDimJoinedAliasCache && a.metadata.target === DimManufacturer)) {
             qb.innerJoin(`${mainFactAlias}.dimManufacturer`, manufacturerDimJoinedAliasCache);
          }
      }
      return manufacturerDimJoinedAliasCache;
  };

  if (filters.manufacturer && filters.manufacturer.toLowerCase() !== 'all') {
    const manufacturerAlias = ensureManufacturerDimJoined();
    qb.andWhere(`${manufacturerAlias}.manufacturer_source_id = :manufacturer`, { manufacturer: filters.manufacturer });
  }
  if (filters.category && filters.category.toLowerCase() !== 'all') {
    const productAlias = ensureProductDimJoined();
    qb.andWhere(`${productAlias}.category = :category`, { category: filters.category });
  }
  if (filters.brand && filters.brand.toLowerCase() !== 'all') {
    const productAlias = ensureProductDimJoined(); 
    qb.andWhere(`${productAlias}.brand = :brand`, { brand: filters.brand });
  }
  if (filters.ppg && filters.ppg.toLowerCase() !== 'all') {
    const productAlias = ensureProductDimJoined(); 
    qb.andWhere(`${productAlias}.ppg_source_id = :ppg`, { ppg: filters.ppg });
  }
  return qb;
};

export const getExecutiveSummaryData = async (filters: KpiFilters) => {
  const factRepo = AppDataSource.getRepository(FactSales);

  // --- Setup KPI Aggregate Promises ---
  const currentQb = factRepo.createQueryBuilder('fact_current');
  applySalesFilters(currentQb, filters, 'fact_current');
  const currentPeriodAggregatesPromise = currentQb
    .select(`SUM(fact_current.unit_sales)`, 'totalUnitSales')
    .addSelect(`SUM(fact_current.value_sales)`, 'totalValueSales')
    .addSelect(`SUM(fact_current.value_sales) / NULLIF(SUM(fact_current.unit_sales), 0)`, 'avgPricePerUnit')
    .getRawOne();

  let previousPeriodAggregatesPromise: Promise<any> = Promise.resolve(null); // Default to null
  if (filters.year) {
    const previousYearFilters: KpiFilters = { ...filters, year: filters.year - 1 };
    const previousQb = factRepo.createQueryBuilder('fact_previous');
    applySalesFilters(previousQb, previousYearFilters, 'fact_previous');
    previousPeriodAggregatesPromise = previousQb
      .select(`SUM(fact_previous.unit_sales)`, 'totalUnitSales')
      .addSelect(`SUM(fact_previous.value_sales)`, 'totalValueSales')
      .addSelect(`SUM(fact_previous.value_sales) / NULLIF(SUM(fact_previous.unit_sales), 0)`, 'avgPricePerUnit')
      .getRawOne();
  }

  const mondelezManufacturerId = 'MAN_715cc2'; // Ensure this is your correct Mondelez MAN_ ID
  
  const mdlzCurrentFilters: KpiFilters = { ...filters, manufacturer: mondelezManufacturerId };
  const mdlzCurrentQb = factRepo.createQueryBuilder('fact_mdlz_current');
  applySalesFilters(mdlzCurrentQb, mdlzCurrentFilters, 'fact_mdlz_current');
  const mdlzCurrentAggregatesPromise = mdlzCurrentQb
    .select(`SUM(fact_mdlz_current.unit_sales)`, 'totalUnitSales')
    .addSelect(`SUM(fact_mdlz_current.value_sales)`, 'totalValueSales')
    .getRawOne();
  
  let mdlzPreviousAggregatesPromise: Promise<any> = Promise.resolve(null); // Default to null
  if (filters.year) {
    const mdlzPreviousFilters: KpiFilters = { ...mdlzCurrentFilters, year: filters.year - 1 };
    const mdlzPreviousQb = factRepo.createQueryBuilder('fact_mdlz_previous');
    applySalesFilters(mdlzPreviousQb, mdlzPreviousFilters, 'fact_mdlz_previous');
    mdlzPreviousAggregatesPromise = mdlzPreviousQb
      .select(`SUM(fact_mdlz_previous.unit_sales)`, 'totalUnitSales')
      .addSelect(`SUM(fact_mdlz_previous.value_sales)`, 'totalValueSales')
      .getRawOne();
  }

  // --- Setup Chart Query Builders (filters applied before Promise.all) ---
  const trackedManufacturerDebrandedIds = [ 'MAN_715cc2', 'MAN_920d0c', 'MAN_a75436' ]; // Update with your actual MAN_ codes
  const manufacturerGroupCaseExpression = (manufacturerTableAlias: string) => 
    `CASE ${trackedManufacturerDebrandedIds.map(id => 
        `WHEN ${manufacturerTableAlias}.manufacturer_source_id = '${id}' THEN '${id}'`
      ).join(' ')} ELSE 'OUTROS' END`;

  const marketShareQb = factRepo.createQueryBuilder('fact_ms');
  applySalesFilters(marketShareQb, filters, 'fact_ms');

  const quarterlySalesQb = factRepo.createQueryBuilder('fact_qs');
  applySalesFilters(quarterlySalesQb, filters, 'fact_qs');

  const performanceOverTimeQb = factRepo.createQueryBuilder('fact_pot');
  applySalesFilters(performanceOverTimeQb, filters, 'fact_pot');

  const channelDistributionQb = factRepo.createQueryBuilder('fact_cd');
  applySalesFilters(channelDistributionQb, filters, 'fact_cd');

  // --- Execute all promises concurrently ---
  const [
    currentPeriodAggregates,
    unprocessedPreviousPeriodAggregates, // Renamed to avoid confusion
    mdlzCurrentAggregates,
    unprocessedMdlzPreviousAggregates,   // Renamed
    volumeMarketShareRaw,
    valueSalesQuarterlyRaw,
    valueSalesPerformanceRaw,
    channelDistributionDataRaw
  ] = await Promise.all([
    currentPeriodAggregatesPromise,
    previousPeriodAggregatesPromise,
    mdlzCurrentAggregatesPromise,
    mdlzPreviousAggregatesPromise,

    marketShareQb
      .innerJoin('fact_ms.dimManufacturer', 'ms_manufacturer_dim')
      .innerJoin('fact_ms.dimDate', 'ms_date_dim') 
      .select([
          'ms_date_dim.year AS year', 'ms_date_dim.month AS month', 'ms_date_dim.month_name AS "monthName"', 
          `${manufacturerGroupCaseExpression('ms_manufacturer_dim')} AS "manufacturerGroup"`, 
          'SUM(fact_ms.unit_sales) AS "monthlyUnitSales"'
      ])
      .groupBy(`ms_date_dim.year, ms_date_dim.month, ms_date_dim.month_name, ${manufacturerGroupCaseExpression('ms_manufacturer_dim')}`)
      .orderBy('year, month')
      .getRawMany(),
    
    quarterlySalesQb
      .innerJoin('fact_qs.dimRegion', 'qs_region_dim') 
      .innerJoin('fact_qs.dimDate', 'qs_date_dim') 
      .select([
          'qs_date_dim.year AS year', 'qs_date_dim.quarter AS quarter', 
          'qs_region_dim.region_name AS "regionName"', 
          'SUM(fact_qs.value_sales) AS "quarterlyValueSales"'
      ])
      .groupBy('qs_date_dim.year, qs_date_dim.quarter, qs_region_dim.region_name')
      .orderBy('year, quarter, "regionName"')
      .getRawMany(),
      
    performanceOverTimeQb
      .innerJoin('fact_pot.dimManufacturer', 'pot_manufacturer_dim')
      .innerJoin('fact_pot.dimDate', 'pot_date_dim') 
      .select([
          'pot_date_dim.year AS year', 'pot_date_dim.month AS month', 'pot_date_dim.month_name AS "monthName"', 
          `${manufacturerGroupCaseExpression('pot_manufacturer_dim')} AS "manufacturerGroup"`, 
          'SUM(fact_pot.value_sales) AS "monthlyValueSales"'
      ])
      .groupBy(`pot_date_dim.year, pot_date_dim.month, pot_date_dim.month_name, ${manufacturerGroupCaseExpression('pot_manufacturer_dim')}`)
      .orderBy('year, month')
      .getRawMany(),

    channelDistributionQb
      .innerJoin('fact_cd.dimChannel', 'cd_channel_dim')
      .select([
          'cd_channel_dim.channel_retailer_name AS "channelName"',
          'SUM(fact_cd.value_sales) AS "salesValue"'
      ])
      .groupBy('cd_channel_dim.channel_retailer_name')
      .orderBy('"salesValue"', 'DESC') 
      .getRawMany()
  ]);
  
  // Process KPI aggregates with safe defaults
  const previousPeriodAggregatesData = unprocessedPreviousPeriodAggregates || { totalUnitSales: null, totalValueSales: null, avgPricePerUnit: null };
  const mdlzPreviousAggregatesData = unprocessedMdlzPreviousAggregates || { totalUnitSales: null, totalValueSales: null };

  const currentUnits = Number(currentPeriodAggregates?.totalUnitSales) || 0;
  const currentValue = Number(currentPeriodAggregates?.totalValueSales) || 0;
  const currentAvgPrice = Number(currentPeriodAggregates?.avgPricePerUnit) || 0;
  const previousUnits = Number(previousPeriodAggregatesData?.totalUnitSales) || 0;
  const previousValue = Number(previousPeriodAggregatesData?.totalValueSales) || 0;
  const previousAvgPrice = Number(previousPeriodAggregatesData?.avgPricePerUnit) || 0;
  
  const mdlzCurrentUnits = Number(mdlzCurrentAggregates?.totalUnitSales) || 0;
  const mdlzPreviousUnits = Number(mdlzPreviousAggregatesData?.totalUnitSales) || 0;
  const mdlzCurrentValue = Number(mdlzCurrentAggregates?.totalValueSales) || 0;
  const mdlzPreviousValue = Number(mdlzPreviousAggregatesData?.totalValueSales) || 0;

  const kpiCardsData = [
    { id: 'sellOutVolume', mainLabel: 'Base Sell Out Volume/Units', currentValue: currentUnits, previousValue: previousUnits,
      mdlzCurrentValue: mdlzCurrentUnits, mdlzPreviousValue: mdlzPreviousUnits, unit: 'K', prefix: '' },
    { id: 'sellOutValue', mainLabel: 'Base Sell Out Value', currentValue: currentValue, previousValue: previousValue,
      mdlzCurrentValue: mdlzCurrentValue, mdlzPreviousValue: mdlzPreviousValue, unit: 'K', prefix: 'R$' },
    { id: 'avgPricePerUnit', mainLabel: 'Base Avg Price Per Unit', currentValue: currentAvgPrice, previousValue: previousAvgPrice,
      mdlzCurrentValue: mdlzCurrentUnits !== 0 ? mdlzCurrentValue / mdlzCurrentUnits : 0, 
      mdlzPreviousValue: mdlzPreviousUnits !== 0 ? mdlzPreviousValue / mdlzPreviousUnits : 0,
      unit: '', prefix: 'R$' },
  ];

  return {
    kpiCardsData,
    chartsData: {
      volumeMarketShare: volumeMarketShareRaw,
      valueSalesQuarterly: valueSalesQuarterlyRaw,
      valueSalesPerformance: valueSalesPerformanceRaw,
      channelDistributionData: channelDistributionDataRaw, 
    },
  };
};

export const getFilterOptions = async () => {
  const dateRepo = AppDataSource.getRepository(DimDate);
  const productRepo = AppDataSource.getRepository(DimProduct);
  const regionRepo = AppDataSource.getRepository(DimRegion);
  const channelRepo = AppDataSource.getRepository(DimChannel);
  const manufacturerRepo = AppDataSource.getRepository(DimManufacturer);

  const [
    yearsData, regionsData, channelsData, manufacturersData,
    categoriesData, brandsData, ppgsDataRaw
  ] = await Promise.all([
    dateRepo.createQueryBuilder('d').select('DISTINCT d.year', 'year').orderBy('d.year', 'DESC').getRawMany(),
    regionRepo.createQueryBuilder('r').select('DISTINCT r.region_name', 'name').orderBy('r.region_name', 'ASC').getRawMany(),
    channelRepo.createQueryBuilder('c').select('DISTINCT c.channel_retailer_name', 'name').orderBy('c.channel_retailer_name', 'ASC').getRawMany(),
    manufacturerRepo.createQueryBuilder('m').select('DISTINCT m.manufacturer_source_id', 'id').orderBy('m.manufacturer_source_id', 'ASC').getRawMany(),
    productRepo.createQueryBuilder('p_cat').select('DISTINCT p_cat.category', 'name').andWhere("p_cat.category IS NOT NULL AND p_cat.category != ''").orderBy('p_cat.category', 'ASC').getRawMany(),
    productRepo.createQueryBuilder('p_brand').select('DISTINCT p_brand.brand', 'name').andWhere("p_brand.brand IS NOT NULL AND p_brand.brand != ''").orderBy('p_brand.brand', 'ASC').getRawMany(),
    productRepo.createQueryBuilder('p_ppg')
      .select('p_ppg.ppg_source_id', 'ppg_id')
      .distinct(true)
      .andWhere("p_ppg.ppg_source_id IS NOT NULL AND p_ppg.ppg_source_id != ''")
      .orderBy('p_ppg.ppg_source_id', 'ASC')
      .limit(1000)
      .getRawMany()
  ]);

  const ppgsMapped = ppgsDataRaw.map(p => ({ value: p.ppg_id, label: p.ppg_id }));

  return {
    years: yearsData.map(y => y.year),
    quarters: [ { value: 1, label: 'Q1' }, { value: 2, label: 'Q2' }, { value: 3, label: 'Q3' }, { value: 4, label: 'Q4' }],
    regions: [{ value: 'All', label: 'All Regions' }, ...regionsData.map(r => ({ value: r.name, label: r.name }))],
    channels: [{ value: 'All', label: 'All Channels' }, ...channelsData.map(c => ({ value: c.name, label: c.name }))],
    manufacturers: [{ value: 'All', label: 'All Manufacturers' }, ...manufacturersData.map(m => ({ value: m.id, label: m.id }))],
    categories: [{ value: 'All', label: 'All Categories' }, ...categoriesData.map(cat => ({ value: cat.name, label: cat.name }))],
    brands: [{ value: 'All', label: 'All Brands' }, ...brandsData.map(b => ({ value: b.name, label: b.name }))],
    ppgs: [{ value: 'All', label: 'All PPGs' }, ...ppgsMapped]
  };
};