import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

const encrypt = (data, key) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  cipher.write(data);
  cipher.end();

  return cipher.read().toString("hex");
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
