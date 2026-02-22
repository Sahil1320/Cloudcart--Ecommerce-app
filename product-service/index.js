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

app.get("/products", async (req, res) => {
  const result = await pool.query("SELECT * FROM products");
  res.json(result.rows);
});

app.post("/products", async (req, res) => {
  const { name, price, description, stock } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO products (name, price, description, stock) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, price, description, stock]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5001, "0.0.0.0", () => {
  console.log("Product Service running on port 5001");
});
