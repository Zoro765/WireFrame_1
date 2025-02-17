// backend/src/index.ts
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/database';
import { getKPIs } from './controllers/kpiController';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173/', // Replace with your frontend URL
}));

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Database connection failed', err);
  });

// Parse JSON bodies
app.use(express.json());

// Define API endpoint
app.get('/api/kpis', getKPIs);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




// // backend/src/index.ts
// import express from 'express';
// import { AppDataSource } from './config/database';
// import { getKPIs } from './controllers/kpiController';

// const app = express();
// const PORT = process.env.PORT || 5000;

// AppDataSource.initialize()
//   .then(() => {
//     console.log('Database connected');
//   })
//   .catch((err) => {
//     console.error('Database connection failed', err);
//   });

// app.get('/api/kpis', getKPIs);

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });