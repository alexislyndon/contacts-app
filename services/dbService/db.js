const { Pool } = require("pg");

const db = new Pool({
  user: "postgres",
  host: "localhost",
  port: "9999",
  password: "santacruz",
  database: "contacts",
});

console.log('Connected to DB')

module.exports = db;
