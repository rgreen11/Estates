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
        value={texts.name}
        onChange={(e) => handleFullNameChange(e)}
      />
      <label className="label_nme">Email:</label>
      <input
        id="userEmailInput"
        type="type"
        className="input-item"
        value={texts.email}
        onChange={(e) => handleEmailChange(e)}
      />
      <label className="label_nme">Contact:</label>
      <input
        id="userNumberInput"
        type="type"
        className="input-item"
        value={texts.phoneNumber}
        onChange={(e) => handleNumberChange(e)}
      />
      <label className="label_nme">Check box if you have a realtor:</label>
      <input
        id="userHasRealtorInput"
        type="checkbox"
        className="input-item"
        value={texts.hasRealtor}
        onChange={(e) => handleHasRealtor(e)}
      />
      <label className="label_nme">What's the brokerage:</label>
      <input
        id="userBrokerageInput"
        type="type"
        className="input-item"
        value={texts.brokerage}
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
    console.log(event.target.value)
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
        <form className="form_container" onSubmit={submitData}>
          <h1 className="form_address">123 Main st, Brooklyn, NY 11206</h1>
          <h3>Open house</h3>
          <div className="form">
            <InputForm handleForm={setTexts} texts={texts} />
            <input type="submit" value="Submit" />
          </div>
        </form>
      )}
    </>
  );
};

export default Form;
