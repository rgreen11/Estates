import express from 'express';
import db from '../services/queries.js';
var router = express.Router();

// put this into another file to handle db work


/* CREATE */
router.post('/add_user', db.createUser)

/* READ */
router.get('/', function(req, res, next) {
  
  // res.send(db.getUsers(_,))
  // res.send('index', { title: 'Rich' });
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
// npm start

export default router;
