import { v4 as uuidv4 } from "uuid";
import crypto from "crypto-js";

const encrypt = (data, key) => {
  const iv = crypto.randomBytes(16); // Generate a random IV
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  cipher.write(data);
  cipher.end();

  // Combine the IV and encrypted data for storage/transmission
  const encryptedData = {
    iv: iv.toString("hex"),
    data: cipher.read().toString("hex"),
  };

  return encryptedData;
};

const generateSessionToken = () => {
  // Generate a unique session ID
  const sessionId = uuidv4();
  // Encrypt the session ID
  const encryptedSessionId = encrypt(sessionId);
  // Store the encrypted session ID in the database
  // ...
  return encryptedSessionId;
};

export default generateSessionToken;
