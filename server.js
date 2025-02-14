require("dotenv").config({ path: "database.env" });

const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Check if DATABASE_URL is correctly loaded
if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is missing. Check your database.env file.");
    process.exit(1);
}

// Validate URL format
try {
    new URL(process.env.DATABASE_URL);
} catch (err) {
    console.error("❌ Invalid DATABASE_URL format:", process.env.DATABASE_URL);
    process.exit(1);
}

// Determine SSL configuration
const isLocal = process.env.DATABASE_URL.includes("localhost") || process.env.DATABASE_URL.includes("127.0.0.1");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isLocal ? false : { rejectUnauthorized: false }, // Disable SSL for local databases
});

// API Route
app.get("/api/kpi-data", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM kpi_data 
            ORDER BY 
                CASE main_label 
                    WHEN 'Sell Out Volume' THEN 1
                    WHEN 'Sell Out Value' THEN 2
                    WHEN 'Sell Out Units' THEN 3
                    WHEN 'Avg Price Per Unit' THEN 4
                    ELSE 5
                END
        `);

        res.json(result.rows);
    } catch (err) {
        console.error("Database Query Error:", err);
        res.status(500).send("Server Error");
    }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
