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
router.get("/authenticate-route", db.authenticateRoute);
router.get("/all_users", db.getUsers);

// router.get("/all_users", async () => {
//   const {cookieToken} = request.headers;
//   try{
//     if(cookieToken){
//       const query = "SELECT admin_user_id FROM sessions WHERE encrypted_session_id = $1"

//     }

//   }catch(error){

//   }
// });

router.post("/store_address", async (req, res) => {
  const { street, zipCode, city, state } = req.body;
  try {
    const savedAddress = await db.saveAddress(street, zipCode, city, state);
    res.status(201).json(savedAddress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/retrieve_address", async (req, res) => {
  const { addressid } = req.headers;

  try {
    const address = await db.getAddress(addressid);
    if (!address) return res.status(404).json({ error: "Address not found" });
    res.json(address);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/logout", (req, res) => {
  // console.log('heree')
  res.clearCookie("RichAuth");
  res.redirect("/");
});

export default router;
