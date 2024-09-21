import pg from "pg";
import {
  generateSessionToken,
  encryptPassword,
  comparePasswords,
} from "./generateSessionToken.js";
const { Pool } = pg;

const pool = new Pool({
  user: "richg",
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

const signup = async (request, response) => {
  console.log("signup");
  const { name, email, password, brokerage } = request.body;
  try {
    if (name && email && password && brokerage) {
      const encryptedPassword = await encryptPassword(password);
      console.log(encryptedPassword);
      pool.query(
        "INSERT INTO admin_users (name, email, password, brokerage) VALUES ($1, $2, $3, $4) RETURNING id",
        [name, email, encryptedPassword, brokerage],
        (error, results) => {
          if (error) {
            console.log(error);
            throw error;
          }

          const { id } = results.rows[0];
          generateSessionToken(id).then((key) => {
            // change to 201
            response.status(200).send({ key });
          });
        },
      );
    }
  } catch (error) {
    console.log("catch:", error);
  }
};

const login = async (request, response) => {
  const { email, password } = JSON.parse(request.headers.params);
  console.log({ email, password });
  try {
    if (email && password) {
      const results = await new Promise((resolve, reject) => {
        pool.query(
          "SELECT * FROM admin_users WHERE email = $1",
          [email],
          (error, results) => {
            if (error) {
              reject(error);
            }
            resolve(results);
          },
        );
      });

      const { id } = results.rows[results.rows.length - 1];

      const isValidPassword = await comparePasswords(
        password,
        results.rows[results.rows.length - 1].password,
      );

      console.log({ isValidPassword });
      if (isValidPassword) {
        const key = await generateSessionToken(id);
        response.status(200).send({ key });
      }
    }
  } catch (error) {
    console.log("catch:", error);
    return error;
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
