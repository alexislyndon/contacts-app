const express = require("express");
const router = express.Router();
const fetchPeople = require("../services/dbService/fetchPeople");

router.get("/", async (req, res) => {
  const data = await fetchPeople();

  res.render("index", { people: data });
});

module.exports = router;
