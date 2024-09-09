import express from "express";
import db from "../services/queries.js";
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// create openhouse
router.post("/save", db.createUser);
// router.get("/all-users", db.getAllUsers);

export default router;
