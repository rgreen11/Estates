import bcrypt from "bcrypt";
import pg from "pg";
import { v4 as uuidv4 } from "uuid";
const { Pool } = pg;

const pool = new Pool({
  user: "richg",
  host: "localhost",
  database: "homes",
  password: "password",
  port: 5432,
});

const saltRounds = 10;

export const encryptPassword = async (myPlaintextPassword) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(myPlaintextPassword, salt);
    // Store hash in your password DB.
    return hash;
  } catch (error) {
    console.error("Error encrypting password:", error);
    return null; // Or handle the error as needed
  }
};

export const comparePasswords = async (plainTextPassword, hashedPassword) => {
  console.log({ plainTextPassword, hashedPassword });
  try {
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error; // Re-throw the error for proper handling
  }
};

export const generateSessionToken = async (admin_user_id) => {
  try {
    const sessionId = uuidv4();
    console.log(sessionId);
    // Encrypt the session ID
    const encrypted_session_id = await encryptPassword(sessionId);
    // Store the encrypted session ID in the database

    if (admin_user_id && encrypted_session_id) {
      const results = await new Promise((resolve, reject) => {
        pool.query(
          "INSERT INTO sessions (admin_user_id, encrypted_session_id) VALUES ($1, $2)",
          [admin_user_id, encrypted_session_id],
          (error, results) => {
            if (error) {
              reject(error);
            }
            // response.status(201).send(`Sessions ID: ${results.insertId}`);
            console.log({ encrypted_session_id });
            resolve(encrypted_session_id);
          },
        );
      });
      return results;
    }
  } catch (error) {
    console.error("Error encrypting password:", error);
    return null;
  }

  // Generate a unique session ID
};

console.log(generateSessionToken());

// bcrypt.compare(myPlaintextPassword, encrypt, function(err, result) {
//   // result == true
//   console.log(result)
// });
// bcrypt.compare(someOtherPlaintextPassword, encrypt, function(err, result) {
//   // result == false
//   console.log(result)
// });

// export default generateSessionToken;
