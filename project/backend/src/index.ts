// // backend/src/index.ts
// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import { AppDataSource } from './config/database';
// import { getKPIs } from './controllers/kpiController';

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Enable CORS
// app.use(cors({
//   origin: 'http://localhost:5173/', // Replace with your frontend URL
// }));

// // Initialize database connection
// AppDataSource.initialize()
//   .then(() => {
//     console.log('Database connected');
//   })
//   .catch((err) => {
//     console.error('Database connection failed', err);
//   });

// // Parse JSON bodies
// app.use(express.json());

// // Define API endpoint
// app.get('/api/kpis', getKPIs);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });




// backend/src/index.ts
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/database';
import { getFilters, getExecutiveSummary } from './controllers/kpiController'; // Add getExecutiveSummary

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
}));

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Database connection failed', err);
  });

app.use(express.json());

// API Endpoints
app.get('/api/filters', getFilters);
app.get('/api/executive-summary', getExecutiveSummary); // <-- Add this line

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});