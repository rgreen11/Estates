import express from "express";
import db from "../services/queries.js";
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/save", db.createUser);

export default router;
