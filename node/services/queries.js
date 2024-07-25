import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "homes",
  password: "password",
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    console.log("herrrrreeee!");
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { name, email, phone_number, address, has_realtor, brokerage } =
    request.body;
  if ((name, email, phone_number, address, has_realtor, brokerage)) {
    pool.query(
      "INSERT INTO users (name, email, phone_number, address, has_realtor, brokerage) VALUES ($1, $2, $3, $4, $5, $6)",
      [name, email, phone_number, address, has_realtor, brokerage],
      (error) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`User added with ID: ${results.insertId}`);
      }
    );
  }
};

const updateUser = (request, response) => {
  // const id = parseInt(request.params.id)
  // const { name, email } = request.body
  // pool.query(
  //   'UPDATE users SET name = $1, email = $2 WHERE id = $3',
  //   [name, email, id],
  //   (error, results) => {
  //     if (error) {
  //       throw error
  //     }
  //     response.status(200).send(`User modified with ID: ${id}`)
  //   }
  // )
};

const deleteUser = (request, response) => {
  // const id = parseInt(request.params.id)
  // pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
  //   if (error) {
  //     throw error
  //   }
  //   response.status(200).send(`User deleted with ID: ${id}`)
  // })
};

export default { getUsers, createUser, updateUser, deleteUser };
