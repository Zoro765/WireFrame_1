// backend/src/config/database.ts
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

// Import new Star Schema Entities
import { DimDate } from '../models/DimDate';
import { DimProduct } from '../models/DimProduct';
import { DimRegion } from '../models/DimRegion';
import { DimChannel } from '../models/DimChannel';
import { DimManufacturer } from '../models/DimManufacturer';
import { FactSales } from '../models/FactSales';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    // Add new entities
    DimDate,
    DimProduct,
    DimRegion,
    DimChannel,
    DimManufacturer,
    FactSales,
    // HubProduct, LinkSalesTransaction, SatSalesMetrics, // Keep or remove as needed
  ],
  synchronize: true, // IMPORTANT: true for dev to auto-create tables. False for prod (use migrations).
  ssl: {
    ca: fs.readFileSync(path.join(__dirname, '../../ca.pem')).toString(),
    rejectUnauthorized: false, // Required for Aiven, use with caution
  },
  // logging: true, // Optional: enable logging to see SQL queries
});