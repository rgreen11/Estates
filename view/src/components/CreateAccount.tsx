import React, { useState, useEffect } from "react";
import "./style/CreateAccount.css";

const CreateAccount = () => {
  // email
  // password
  useEffect(() => {}, []);
  const [credientals, setCredientals] = useState({ email: "", password: "" });
  // make the ids unique and link the admin account with the users table
  // that way 1 admin can link to 1 user
  const handleSignin = () => {
    const request = new Request("http://localhost:8080/admin_user/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...credientals }),
    });
    // We need to return something letting us know the user is logged in
    // return fetch(request)
    //   .then((status) => {
    //     console.log(status);
    //   })
    //   .catch((e) => {
    //     new Error(e);
    //   });
    console.log(credientals);
  };


//   // Frontend
// const login = async () => {
//   const response = await fetch('/login', {
//     method: 'POST',
//     // ...
//   });
//   const data = await response.json();
//   const encryptedSessionId = data.sessionToken;
//   // Store the encrypted session ID in a cookie or local storage
//   localStorage.setItem('sessionToken', encryptedSessionId);
// };


  //   const bcrypt = require('bcrypt');

  // const password = 'mySecurePassword';
  // const saltRounds = 10; // Adjust the salt rounds as needed

  // bcrypt.hash(password, saltRounds)
  //   .then(hash => {
  //     // Store the hash in the database
  //     console.log(hash);
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });

  const handleEmailChange = (event) => {
    console.log(event.target.value);
    setCredientals({ ...credientals, email: event.target.value });
  };

  const handlePasswordChange = (event) => {
    console.log(event.target.value);
    setCredientals({ ...credientals, password: event.target.value });
  };

  return (
    <div className="account_container">
      <input type="email" onChange={handleEmailChange} />
      <input type="password" onChange={handlePasswordChange} />
      <button onClick={handleSignin}>Create Account</button>
    </div>
  );
};

export default CreateAccount;
