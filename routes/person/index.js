const fetchPerson = require("../../services/dbService/fetchPerson");
const upsertPerson = require("../../services/dbService/upsertPerson");

const route = require("express").Router();

route
  .get('/new',(req,res) => {
    res.render('person/new')
  })
  .get("/:id", async (req, res) => {
    const { id } = req.params;

    const data = await fetchPerson(id);

    res.render("person/form", data);
  })

  .post("/", async (req, res) => {
    const { p_id } = await upsertPerson(req.body);
    res.send({ p_id });
  });

module.exports = route;