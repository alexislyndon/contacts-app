const db = require("./db");

module.exports = async () => {
  const result = await db.query("SELECT p_id id, firstname, lastname FROM people");
  const data = result.rows;

  return data;
  //res.render("index", { people: data });
};
