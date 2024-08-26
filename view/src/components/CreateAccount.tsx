import React, { useState, useEffect } from "react";
import "./style/CreateAccount.css";

const CreateAccount = () => {
  // email
  // password
  useEffect(() => {}, []);
  const [credientals, setCredientals] = useState({ email: "", password: "" });

  const handleSignin = () => {
    const request = new Request("http://localhost:8080/admin_user/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...credientals }),
    });
    // return fetch(request)
    //   .then((status) => {
    //     console.log(status);
    //   })
    //   .catch((e) => {
    //     new Error(e);
    //   });
    console.log(credientals)
  };

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
