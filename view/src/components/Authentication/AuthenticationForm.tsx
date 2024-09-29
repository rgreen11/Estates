import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./style/CreateAccount.css";

import { handleSignup, handleSignin } from "./authApi";

const CreateAccount = () => {
  const [activeSignIn, setActiveSignIn] = useState(true);
  const [signInCredientals, setSignInCredientals] = useState({
    email: "",
    password: "",
  });
  const [signUpCredientals, setSignUpCredientals] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    brokerage: "",
  });


  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/profile');
  };

  const handleSignUpNameChange = (e) => {
    setSignUpCredientals({
      ...signUpCredientals,
      name: e.target.value,
    });
  };

  const handleSignUpEmailChange = (e) => {
    setSignUpCredientals({
      ...signUpCredientals,
      email: e.target.value,
    });
  };

  const handleSignUpPasswordChange = (e) => {
    setSignUpCredientals({
      ...signUpCredientals,
      password: e.target.value,
    });
  };

  const handleConfirmPasswordChange = (e) => {
    setSignUpCredientals({
      ...signUpCredientals,
      confirmPassword: e.target.value,
    });
  };

  const handleSignUpBrokerageChange = (e) => {
    setSignUpCredientals({
      ...signUpCredientals,
      brokerage: e.target.value,
    });
  };
  // --------------------- Sign In Methods -----------------------
  const handleSignInEmailChange = (event) => {
    setSignInCredientals({ ...signInCredientals, email: event.target.value });
  };

  const handleSignInPasswordChange = (event) => {
    setSignInCredientals({
      ...signInCredientals,
      password: event.target.value,
    });
  };

 
  return (
    <>
      <div className="form-container">
        <div className="form_types">
          <a
            className={`btn ${activeSignIn && "active_sign_in"}`}
            onClick={() => setActiveSignIn(!activeSignIn)}
          >
            Sign in
          </a>

          <a
            className={`btn ${!activeSignIn && "active_sign_in"}`}
            onClick={() => setActiveSignIn(!activeSignIn)}
          >
            Sign up
          </a>
        </div>
        {activeSignIn ? (
          <>
            <label className="label_nme">Email:</label>
            <input
              type="email"
              className="input"
              onChange={handleSignInEmailChange}
            />
            <label className="label_nme">Password:</label>
            <input
              type="password"
              className="input"
              onChange={handleSignInPasswordChange}
            />
            <div className="btn_cont">
              <Button
                className="sub_btn"
                onClick={() => handleSignin(signInCredientals, handleRedirect)}
              >
                Sign In
              </Button>
            </div>
          </>
        ) : (
          <>
            <label className="label_nme">Name:</label>
            <input
              type="text"
              className="input"
              onChange={handleSignUpNameChange}
            />
            <label className="label_nme">Email:</label>
            <input
              type="email"
              className="input"
              onChange={handleSignUpEmailChange}
            />
            <label className="label_nme">Password:</label>
            <input
              type="password"
              className="input"
              onChange={handleSignUpPasswordChange}
            />
            <label className="label_nme">Confirm Password:</label>
            <input
              type="password"
              className="input"
              onChange={handleConfirmPasswordChange}
            />
            <label className="label_nme">Brokerage:</label>
            <input
              type="text"
              className="input"
              onChange={handleSignUpBrokerageChange}
            />
            <div className="btn_cont">
              <Button
                color="primary"
                size="sm"
                className="sub_btn"
                onClick={() =>
                  handleSignup(signUpCredientals, handleRedirect)
                }
              >
                Create Account
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CreateAccount;
