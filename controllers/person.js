const db = require("../services/dbService/db");

exports.create = async (req, res) => {
  const { firstname, lastname } = req.body;
  const result = await db.query(
    `INSERT INTO people (firstname, lastname) 
      VALUES ($1,$2)`,
    [firstname, lastname]
  );

  res.status(201).end(); //without this, success callback on jquery doesn't fire
};

exports.read = async (req, res) => {
  const result = await db.query("SELECT * FROM people");
  const data = result.rows;

  res.render("index", { people: data });
};

exports.update = async (req, res) => {
  const { firstname, lastname, email } = req.body;

  const result = await db.query(
    `UPDATE people SET firstname=${firstname}, lastname=${lastname}  WHERE id=$1 `,
    [id]
  );

  const data = await (await db.query("SELECT * FROM people")).rows;

  res.send(200).render("index", { people: data });
};

exports.del = async (req, res) => {
  const { id } = req.params;

  const result = await db.query(`DELETE FROM people WHERE id=$1`, [id]);

  const data = result.rows[0];

  res.send(200).end();
};

exports.getOne = async (req, res) => {
  const { id } = req.params;

  const result = await db.query(
    `SELECT id, firstname, lastname FROM people WHERE id=$1`,
    [id]
  );

  const data = result.rows[0];

  res.render("person/form", data);
};
