const express = require("express");
const router = express.Router();

const { create, read, update, del, getOne } = require("../controllers/person");

router.route("/").get(read); //get all
router.route("/person").post(create); //new contact
router.route("/person/:id").get(getOne); //get ONE contact
router.route("/person/:id").put(update); //update contact
router.route("/person/:id").delete(del); //delete?

module.exports = router;