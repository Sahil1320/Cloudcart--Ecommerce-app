const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.get("/orders", async (req, res) => {
  const result = await pool.query("SELECT * FROM orders");
  res.json(result.rows);
});

app.post("/orders", async (req, res) => {
  const { user_id, total_price, status } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO orders (user_id, total_price, status) VALUES ($1, $2, $3) RETURNING *",
      [user_id, total_price, status]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5002, "0.0.0.0", () => {
  console.log("Order Service running on port 5002");
});
