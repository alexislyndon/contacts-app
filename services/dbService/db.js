const { Pool } = require("pg");

const db = new Pool({
  user: "postgres",
  host: "localhost",
  port: "5432",
  password: "qwe123",
  database: "contacts",
});

console.log('Connected to DB')

module.exports = db;
