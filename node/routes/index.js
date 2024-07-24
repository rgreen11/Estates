import express from 'express';
import db from '../services/queries';

var router = express.Router();

// put this into another file to handle db work

router.post('/hit_db', db.getUsers)

/* GET home page. */
router.get('/testing', function(req, res, next) {
  // res.render('index', { title: 'Rich' });
 
  res.send('index', { title: 'Rich' });
});

router.post('/testing', function(req, res, next) {
  res.send('ya hit me!');
});

// app.post('/', (req, res) => {
//   res.send('Got a POST request')
// })


// app.put('/user', (req, res) => {
//   res.send('Got a PUT request at /user')
// })

// app.delete('/user', (req, res) => {
//   res.send('Got a DELETE request at /user')
// })


export default router;
