import React, { useState } from "react";
import { getCookie } from "../Authentication/Cookies";
import "./Form.css";

const InputForm = ({ handleForm, texts }) => {
  const handleFullNameChange = (event) => {
    if (event.target.value) {
      return handleForm({
        ...texts,
        name: event.target.value,
      });
    }
  };

  const handleEmailChange = (event) => {
    if (event.target.value) {
      return handleForm({
        ...texts,
        email: event.target.value,
      });
    }
  };

  const handleNumberChange = (event) => {
    if (event.target.value) {
      return handleForm({
        ...texts,
        phoneNumber: event.target.value,
      });
    }
  };

  const handleHasRealtor = (event) => {
    if (event.target.value) {
      return handleForm({
        ...texts,
        hasRealtor: event.target.value,
      });
    }
  };

  const handleBrokerage = (event) => {
    if (event.target.value) {
      return handleForm({
        ...texts,
        brokerage: event.target.value,
      });
    }
  };

  return (
    <div className="form_container">
      <label className="label_nme">Name:</label>
      <input
        id="userNameInput"
        type="type"
        className="input-item"
        onChange={(e) => handleFullNameChange(e)}
      />
      <label className="label_nme">Email:</label>
      <input
        id="userEmailInput"
        type="type"
        className="input-item"
        onChange={(e) => handleEmailChange(e)}
      />
      <label className="label_nme">Contact:</label>
      <input
        id="userNumberInput"
        type="type"
        className="input-item"
        onChange={(e) => handleNumberChange(e)}
      />
      <label className="label_nme">Check box if you have a realtor:</label>
      <input
        id="userHasRealtorInput"
        type="checkbox"
        className="input-item"
        onChange={(e) => handleHasRealtor(e)}
      />
      <label className="label_nme">What's the brokerage:</label>
      <input
        id="userBrokerageInput"
        type="type"
        className="input-item"
        onChange={(e) => handleBrokerage(e)}
      />
    </div>
  );
};

const Form = () => {
  const [texts, setTexts] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "123 main rich",
    hasRealtor: false,
    brokerage: "",
  });
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitData = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const cookieToken = getCookie("RichAuth");
    const { name, email, phoneNumber } = texts;
    if (!name || !email || !phoneNumber) {
      return new Error("Fill in the blanks");
    }
    const request = new Request("http://localhost:8080/users/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // add admin user id
      body: JSON.stringify({ ...texts, cookieToken }),
    });
    return fetch(request)
      .then((status) => {
        console.log({ status });
        setSuccess(true);
      })
      .catch((e) => {
        new Error(e);
      });
  };
  return (
    <>
      {success ? (
        // render this for a few seconds
        <h1>Success</h1>
      ) : (
        <div className="form_container">
          <h1 className="form_address">123 Main st, Brooklyn, NY 11206</h1>
          <h3>Open house</h3>
          <div className="form">
            <InputForm handleForm={setTexts} texts={texts} />
            <button type="submit" onClick={submitData}>
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
