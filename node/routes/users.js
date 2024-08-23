import express from 'express'
import db from '../services/queries.js';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/save', function(req, res, next) {
  // console.log(req)
  // console.log(req.body)
  // console.log(req.params)
  db.createUser(req)

  res.send(200, 'Success')
});

export default router;
