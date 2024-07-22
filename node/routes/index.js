import express from 'express'
import pg from "pg";
const { Pool } = pg;
var router = express.Router();

// put this into another file to handle db work
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'homes',
  password: 'password',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    console.log('herrrrreeee!')
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

router.post('/hit_db', getUsers)

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
