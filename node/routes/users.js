import express from 'express'
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  res.json({user: 'ya hit the body'});
});

export default router;
