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
  const { name, email, phoneNumber, address, hasRealtor, brokerage } =
    request.body;
  console.log(response.body);
  if (name && email && phoneNumber && address) {
    pool.query(
      "INSERT INTO users (name, email, phone_number, address, has_realtor, brokerage) VALUES ($1, $2, $3, $4, $5, $6)",
      [name, email, phoneNumber, address, hasRealtor, brokerage],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`User added with ID: ${results.insertId}`);
      },
    );
  }
};

const signup = (request, response) => {
  const { name, email, password, realtor, brokerage } = request.body;
  if (name && email && password && realtor && brokerage) {
    pool.query(
      "INSERT INTO admin_users (name, email, password, realtor, brokerage) VALUES ($1, $2, $3, $4, $5)",
      [name, email, password, realtor, brokerage],
      (error, results) => {
        if (error) {
          throw error;
        }
        response
          .status(201)
          .send(`Successful signup added with ID: ${results.insertId}`);
      },
    );
  }
};

const login = (request, response) => {
  const { email, password } = request.body;
  if (email && password) {
    pool.query(
      "SELECT * FROM admin_users WHERE email = ? AND password = ? VALUES ($1, $2)",
      [email, password],
      (error, results) => {
        if (error) {
          return response.json("Login Failed");
        }
        response
          .status(200)
          .send(`Successful login added with ID: ${results.insertId}`);
      },
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

export default { getUsers, createUser, updateUser, deleteUser, signup, login };
