const express = require("express");
const app = express();
const db = require("./config/db");

app.use(express.urlencoded({ urlencoded: true }));
//routes
app.use("/", require("./routes/person"));

app

  .use(express.static("public"))  

  .set("view engine", "ejs")

  // .get("/", async (req, res) => {
  //   const result = await db.query("SELECT * FROM people");
  //   const data = result.rows;

  //   res.render("index", { people: data });
  // })

  // .get("/person/:id", async (req, res) => {
  //   const { id } = req.params;

  //   const result = await db.query(
  //     `SELECT id, firstname, lastname FROM people WHERE id=$1`,
  //     [id]
  //   );

  //   const data = result.rows[0];

  //   res.render("person/form", data);
  // })

  // .post("/person", async (req, res) => {
  //   const { firstname, lastname } = req.body;
  //   const result = await db.query(
  //     `INSERT INTO people (firstname, lastname) 
  //     VALUES ($1,$2)`,
  //     [firstname, lastname]
  //   );

  //   res.status(200).end();
  // })

  .listen(5000, () => console.log(`Server Running`));
