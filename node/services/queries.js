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

const getUsers = async (request, response) => {
  const { cookietoken } = request.headers;
  console.log(cookietoken);
  try {
    if (cookietoken) {
      const adminUserId = await new Promise((resolve, reject) => {
        pool.query(
          "SELECT admin_user_id FROM sessions WHERE encrypted_session_id = $1",
          [cookietoken],
          (error, results) => {
            if (error) {
              console.log({ error });
              reject(error);
            }
            // console.log(results.rows.admin_user_id)
            const { admin_user_id } = results.rows[0];

            resolve(admin_user_id);
          },
        );
      });

      if (adminUserId) {
        const listOfUsers = await new Promise((resolve, reject) => {
          console.log("here");
          pool.query(
            "SELECT u.name, u.email, u.phone_number, u.address, u.has_realtor FROM users u JOIN admin_users au ON u.id = ANY(au.user_ids) WHERE au.id = $1",
            [adminUserId],
            (error, results) => {
              if (error) {
                console.log({ error });
                reject(error);
              }
              console.log(results.rows)
              resolve(results.rows);
            },
          );
        });
        return response.status(200).send(listOfUsers);
      }
    }
    console.log('error')
  } catch (error) {
    // console.log("catch:", error);
    // return "Your email or password was incorrect.";
  }
};

const updateAdminUser = async (adminId, newUserId) => {
  console.log({ adminId, newUserId });
  try {
    const adminUserId = await new Promise((resolve, reject) => {
      pool.query(
        "UPDATE admin_users SET user_ids = array_append(user_ids, $2) WHERE id = $1",
        [adminId, newUserId],
        (error, results) => {
          if (error) {
            console.log({ error });
            reject(error);
          }
          console.log({ results });
          // const { adminUserId } = results.rows[0];

          // resolve(adminUserId);
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (request, response) => {
  const {
    name,
    email,
    phoneNumber,
    address,
    hasRealtor,
    brokerage,
    cookieToken,
  } = request.body;
  if (name && email && phoneNumber && address) {
    try {
      const result = await pool.query(
        "INSERT INTO users (name, email, phone_number, address, has_realtor, brokerage) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [name, email, phoneNumber, address, hasRealtor, brokerage],
      );

      const userId = result.rows[0].id;
      // console.log('User added with ID:', userId);
      response.status(201).send(`User added with ID: ${userId}`);

      // Update the admin user with the new user ID
      // console.log(request.body)
      const adminId = await pool.query(
        "SELECT admin_user_id FROM sessions WHERE encrypted_session_id = $1",
        [cookieToken],
      );

      const { admin_user_id } = adminId.rows[0];
      // const
      await updateAdminUser(admin_user_id, userId);
    } catch (error) {
      console.error("Error creating user:", error);
      response.status(500).send("Error creating user");
    }
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
    return "Your email or password was incorrect.";
  }
};

const authenticateRoute = async (req, res) => {
  const { cookietoken } = req.headers;
  try {
    if (cookietoken) {
      const results = await new Promise((resolve, reject) => {
        pool.query(
          "SELECT * FROM sessions WHERE encrypted_session_id = $1",
          [cookietoken],
          (error, results) => {
            if (error) {
              reject(error);
            }
            resolve(results);
          },
        );
      });
      if (results.rows.length > 0) {
        return res.status(200).send(true);
      }
      return res.status(404).send("false");
    }
  } catch (error) {
    console.log("catch:", error);
    return "Your email or password was incorrect.";
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

export default {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  signup,
  login,
  authenticateRoute,
};
