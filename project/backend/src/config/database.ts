// backend/src/config/database.ts
import { DataSource } from 'typeorm';
import { HubProduct } from '../models/HubProduct';
import { LinkSalesTransaction } from '../models/LinkSalesTransaction';
import { SatSalesMetrics } from '../models/SatSalesMetrics';
import * as fs from 'fs';
import * as path from 'path';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST, // Must match Aiven host
  port: parseInt(process.env.DB_PORT || '5432'), // Must match Aiven port
  username: process.env.DB_USER, // avnadmin
  password: process.env.DB_PASSWORD, // Aiven password
  database: process.env.DB_NAME, // defaultdb
  entities: [HubProduct, LinkSalesTransaction, SatSalesMetrics],
  synchronize: false,
  ssl: {
    ca: fs.readFileSync(path.join(__dirname, '../../ca.pem')).toString(),
    rejectUnauthorized: false, // Required for Aiven
  },
});