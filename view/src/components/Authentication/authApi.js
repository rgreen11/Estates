import { setCookie } from "./Cookies";

export const handleSignup = async (signUpCredientals) => {
  if (
    signUpCredientals.name &&
    signUpCredientals.email &&
    signUpCredientals.password &&
    signUpCredientals.brokerage
  ) {
    const request = new Request("http://localhost:8080/admin/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...signUpCredientals }),
    });
    try {
      const data = await fetch(request);
      const { key } = await data.json();

      setCookie("RichAuth", key, 2);
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};

// const login = async () => {
//   const response = await fetch("/login", {
//     method: "POST",
//     // ...
//   });
//   const data = await response.json();
//   const encryptedSessionId = data.sessionToken;
//   // Store the encrypted session ID in a cookie or local storage
//   localStorage.setItem("sessionToken", encryptedSessionId);
// };

// const bcrypt = require("bcrypt");

// const password = "mySecurePassword";
// const saltRounds = 10; // Adjust the salt rounds as needed

// bcrypt
//   .hash(password, saltRounds)
//   .then((hash) => {
//     // Store the hash in the database
//     console.log(hash);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
