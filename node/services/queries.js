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

export default { getUsers };
