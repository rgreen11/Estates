import express from "express";
import db from "../services/queries.js";
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// authentication
router.post("/signup", db.signup);
router.get("/login", db.login);

export default router;