// src/scripts/etl.ts
import 'dotenv/config';
import { AppDataSource } from '../config/database';
import { DimDate } from '../models/DimDate';
import { DimProduct } from '../models/DimProduct';
import { DimRegion } from '../models/DimRegion';
import { DimChannel } from '../models/DimChannel';
import { DimManufacturer } from '../models/DimManufacturer';
import { FactSales } from '../models/FactSales';

// Helper to parse numeric values, returning null if invalid
const parseNumeric = (value: any): number | null => {
  if (value === null || value === undefined) return null;
  const sValue = String(value).trim().replace(/,/g, ''); // Remove commas from numbers like "1,234.56"
  if (sValue === '' || isNaN(Number(sValue))) {
    return null;
  }
  return Number(sValue);
};

const runETL = async () => {
  console.log('Starting ETL process...');
  try {
    await AppDataSource.initialize();
    console.log('Database connected for ETL.');

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    console.log('Clearing existing dimensional and fact data (CASCADE will clear dependent facts)...');
    await queryRunner.query('TRUNCATE TABLE fact_sales RESTART IDENTITY CASCADE;');
    await queryRunner.query('TRUNCATE TABLE dim_date RESTART IDENTITY CASCADE;');
    await queryRunner.query('TRUNCATE TABLE dim_product RESTART IDENTITY CASCADE;');
    await queryRunner.query('TRUNCATE TABLE dim_region RESTART IDENTITY CASCADE;');
    await queryRunner.query('TRUNCATE TABLE dim_channel RESTART IDENTITY CASCADE;');
    await queryRunner.query('TRUNCATE TABLE dim_manufacturer RESTART IDENTITY CASCADE;');
    console.log('Star schema tables cleared.');

    console.log('Fetching data from debranded_sellout...');
    const rawData: any[] = await queryRunner.query('SELECT * FROM public.debranded_sellout;');
    console.log(`Fetched ${rawData.length} rows from debranded_sellout.`);

    if (rawData.length === 0) {
      console.log('No data in debranded_sellout to process.');
      await queryRunner.release();
      await AppDataSource.destroy();
      return;
    }

    const dateRepo = AppDataSource.getRepository(DimDate);
    const productRepo = AppDataSource.getRepository(DimProduct);
    const regionRepo = AppDataSource.getRepository(DimRegion);
    const channelRepo = AppDataSource.getRepository(DimChannel);
    const manufacturerRepo = AppDataSource.getRepository(DimManufacturer);
    const factRepo = AppDataSource.getRepository(FactSales);

    const dateLookup = new Map<string, number>();
    const productLookup = new Map<string, number>();
    const regionLookup = new Map<string, number>();
    const channelLookup = new Map<string, number>();
    const manufacturerLookup = new Map<string, number>();

    // --- 1. Gather Unique Dimension Values & Populate Dimension Tables ---
    console.log('Gathering unique dimension values and populating dimensions...');
    const uniqueDates = new Set<string>();
    const uniqueProducts = new Map<string, Partial<DimProduct>>();
    const uniqueRegions = new Map<string, Partial<DimRegion>>();
    const uniqueChannels = new Set<string>();
    const uniqueManufacturers = new Set<string>();

    for (const row of rawData) {
      if (row.date_col && typeof row.date_col === 'string' && row.date_col.trim() !== '') {
        try {
          const dateObj = new Date(row.date_col);
          if (!isNaN(dateObj.getTime())) {
            const year = dateObj.getUTCFullYear();
            const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getUTCDate()).padStart(2, '0');
            uniqueDates.add(`${year}-${month}-${day}`);
          }
        } catch { /* Skip unparseable dates */ }
      }
      if (row.ppg && !uniqueProducts.has(row.ppg)) {
        uniqueProducts.set(row.ppg, {
          ppg_source_id: row.ppg, product_name: row.product, brand: row.brand,
          category: row.category, segment: row.segment, product_type: row.type_col,
        });
      }
      if (row.region && !uniqueRegions.has(row.region)) {
        uniqueRegions.set(row.region, {
          region_name: row.region, market: row.market, business_unit: row.business_unit
        });
      }
      if (row.channel_retailer) uniqueChannels.add(row.channel_retailer);
      if (row.manufacturer) uniqueManufacturers.add(row.manufacturer);
    }

    // Populate DimDate
    const datesToCreate: Partial<DimDate>[] = [];
    for (const dateStr of uniqueDates) {
      const dateObj = new Date(dateStr + 'T00:00:00Z');
      const year = dateObj.getUTCFullYear();
      const month = dateObj.getUTCMonth() + 1;
      const day = dateObj.getUTCDate();
      datesToCreate.push({
        date_key: parseInt(`${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`),
        full_date: dateObj, year, quarter: Math.ceil(month / 3), month,
        month_name: dateObj.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' }),
        day_of_month: day,
        day_of_week_name: dateObj.toLocaleString('en-US', { weekday: 'long', timeZone: 'UTC' }),
      });
    }
    if (datesToCreate.length > 0) {
      const savedDates = await dateRepo.save(datesToCreate);
      savedDates.forEach(d => {
        const mapKeyDateStr = `${d.full_date.getUTCFullYear()}-${String(d.full_date.getUTCMonth() + 1).padStart(2, '0')}-${String(d.full_date.getUTCDate()).padStart(2, '0')}`;
        dateLookup.set(mapKeyDateStr, d.date_key);
      });
    }
    console.log(`Populated ${dateLookup.size} DimDate records.`);

    // Populate other dimensions (Product, Region, Channel, Manufacturer)
    const productsToCreate = Array.from(uniqueProducts.values());
    if (productsToCreate.length > 0) {
      const saved = await productRepo.save(productsToCreate);
      saved.forEach(p => productLookup.set(p.ppg_source_id, p.product_key));
    }
    console.log(`Populated ${productLookup.size} DimProduct records.`);

    const regionsToCreate = Array.from(uniqueRegions.values());
    if (regionsToCreate.length > 0) {
      const saved = await regionRepo.save(regionsToCreate);
      saved.forEach(r => regionLookup.set(r.region_name, r.region_key));
    }
    console.log(`Populated ${regionLookup.size} DimRegion records.`);

    const channelsToCreate: Partial<DimChannel>[] = Array.from(uniqueChannels).map(c => ({ channel_retailer_name: c }));
    if (channelsToCreate.length > 0) {
      const saved = await channelRepo.save(channelsToCreate);
      saved.forEach(ch => channelLookup.set(ch.channel_retailer_name, ch.channel_key));
    }
    console.log(`Populated ${channelLookup.size} DimChannel records.`);

    const manufacturersToCreate: Partial<DimManufacturer>[] = Array.from(uniqueManufacturers).map(m => ({ manufacturer_source_id: m }));
    if (manufacturersToCreate.length > 0) {
      const saved = await manufacturerRepo.save(manufacturersToCreate);
      saved.forEach(mf => manufacturerLookup.set(mf.manufacturer_source_id, mf.manufacturer_key));
    }
    console.log(`Populated ${manufacturerLookup.size} DimManufacturer records.`);

    // --- 2. Aggregate Raw Data and Prepare Facts ---
    console.log('Aggregating raw data for FactSales...');
    const aggregatedFacts = new Map<string, Partial<FactSales & { count: number }>>(); // Key: "dkey_pkey_rkey_ckey_mkey"
    let rowsSkippedMissingKeys = 0;

    for (const row of rawData) {
      let keyDateStrForLookup: string | null = null;
      if (row.date_col && typeof row.date_col === 'string' && row.date_col.trim() !== '') {
        try {
          const dateObj = new Date(row.date_col);
          if (!isNaN(dateObj.getTime())) {
            keyDateStrForLookup = `${dateObj.getUTCFullYear()}-${String(dateObj.getUTCMonth() + 1).padStart(2, '0')}-${String(dateObj.getUTCDate()).padStart(2, '0')}`;
          }
        } catch { /* ignore */ }
      }

      const date_key = keyDateStrForLookup ? dateLookup.get(keyDateStrForLookup) : undefined;
      const product_key = row.ppg ? productLookup.get(row.ppg) : undefined;
      const region_key = row.region ? regionLookup.get(row.region) : undefined;
      const channel_key = row.channel_retailer ? channelLookup.get(row.channel_retailer) : undefined;
      const manufacturer_key = row.manufacturer ? manufacturerLookup.get(row.manufacturer) : undefined;

      if (date_key && product_key && region_key && channel_key && manufacturer_key) {
        const compositeKey = `${date_key}_${product_key}_${region_key}_${channel_key}_${manufacturer_key}`;

        const valSales = parseNumeric(row.value_sales) || 0;
        const unitSales = parseNumeric(row.unit_sales) || 0;
        const promoUnits = parseNumeric(row.promounits) || 0;
        const promoValue = parseNumeric(row.promovalue) || 0;

        if (aggregatedFacts.has(compositeKey)) {
          const existingFact = aggregatedFacts.get(compositeKey)!;
          existingFact.value_sales = (existingFact.value_sales || 0) + valSales;
          existingFact.unit_sales = (existingFact.unit_sales || 0) + unitSales;
          existingFact.promo_units = (existingFact.promo_units || 0) + promoUnits;
          existingFact.promo_value = (existingFact.promo_value || 0) + promoValue;
          existingFact.count = (existingFact.count || 0) + 1;
          // Non-additive measures (prices, discounts) are tricky.
          // If they can vary for the same grain, averaging them weighted by sales/units might be an option.
          // For simplicity now, we are NOT updating them, effectively taking the values from the *first* row encountered for this grain.
        } else {
          aggregatedFacts.set(compositeKey, {
            date_key, product_key, region_key, channel_key, manufacturer_key,
            value_sales: valSales,
            unit_sales: unitSales,
            promo_units: promoUnits,
            promo_value: promoValue,
            // For these, we take the first encountered. They might need recalculation or different handling.
            avg_price_per_unit_calculated: parseNumeric(row.avgpriceperunitcalculated),
            base_price: parseNumeric(row.baseprice),
            promo_price: parseNumeric(row.promoprice),
            discount: parseNumeric(row.discount),
            count: 1, // To count how many source rows contributed
          });
        }
      } else {
        rowsSkippedMissingKeys++;
      }
    }
    console.log(`Aggregation complete. Unique fact grains to insert: ${aggregatedFacts.size}. Rows skipped due to missing dimension keys: ${rowsSkippedMissingKeys}.`);

    // --- 3. Insert Aggregated Facts ---
    const factsToInsert: Partial<FactSales>[] = [];
    for (const fact of aggregatedFacts.values()) {
        // Recalculate avg_price_per_unit_calculated based on aggregated sums if desired,
        // or keep the one from the first row. Here, we'll keep the first one for simplicity,
        // but ideally, it should be (aggregated_value_sales / aggregated_unit_sales).
        // Let's recalculate it here.
        const { count, ...factData } = fact; // remove count before saving
        if (factData.unit_sales && factData.unit_sales !== 0) {
            factData.avg_price_per_unit_calculated = (factData.value_sales || 0) / factData.unit_sales;
        } else {
            factData.avg_price_per_unit_calculated = null; // Or 0, depending on business rule
        }
        factsToInsert.push(factData);
    }
    
    console.log('Populating FactSales with aggregated data. This might take a while...');
    let insertedFactCount = 0;
    const batchSize = 1000; // TypeORM's save can handle large arrays, but explicit batching gives more control/feedback.
                           // For .save on an array, TypeORM does batching internally with a default chunk size.
                           // Let's simplify and use .save on the whole array, relying on TypeORM's internal batching.

    if (factsToInsert.length > 0) {
      // TypeORM's save method handles chunking for large arrays internally (default chunk size is often around 1000-2000).
      // For very large arrays where you need explicit progress, manual batching loop is better.
      // For this amount, direct save should be fine and simpler.
      await factRepo.save(factsToInsert, { chunk: 2000 }); // Explicitly setting chunk size for clarity
      insertedFactCount = factsToInsert.length;
    }
    
    console.log(`Total aggregated facts inserted: ${insertedFactCount}.`);
    console.log('ETL process completed successfully.');

  } catch (error) {
    console.error('ETL process failed:', error);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('Database connection closed.');
    }
  }
};

runETL();