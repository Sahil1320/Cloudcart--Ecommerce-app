const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

async function connectWithRetry() {
  while (true) {
    try {
      await pool.query("SELECT 1");
      console.log("Connected to DB");
      break;
    } catch (err) {
      console.log("DB not ready, retrying in 2 seconds...");
      await new Promise(res => setTimeout(res, 2000));
    }
  }
}

connectWithRetry();

app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});

app.listen(5000, () => {
  console.log("User Service running on port 5000");
});

app.post("/users", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, password, role]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});
