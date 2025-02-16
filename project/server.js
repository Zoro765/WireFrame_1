import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// PostgreSQL Connection Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10, // Allow up to 10 connections
  idleTimeoutMillis: 30000, // 30 seconds before closing idle connections
  connectionTimeoutMillis: 20000, // 20 seconds before failing
});


// Route to fetch KPI data
app.get('/api/kpis', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM kpi_data');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.get('/api/kpis_mix_eva', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM kpi_data_mix_eva');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database query failed' });
    }
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
