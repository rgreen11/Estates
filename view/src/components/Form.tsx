import React, { useState } from "react";
// import "./style/Form.css";

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
      <input
        id="userNameInput"
        type="type"
        className="input-item"
        onChange={(e) => handleFullNameChange(e)}
      />
      <input
        id="userEmailInput"
        type="type"
        className="input-item"
        onChange={(e) => handleEmailChange(e)}
      />
      <input
        id="userNumberInput"
        type="type"
        className="input-item"
        onChange={(e) => handleNumberChange(e)}
      />
      <input
        id="userHasRealtorInput"
        type="checkbox"
        className="input-item"
        onChange={(e) => handleHasRealtor(e)}
      />
      <input
        id="userBrokerageInput"
        type="type"
        className="input-item"
        onChange={(e) => handleBrokerage(e)}
      />
    </div>
  );
};

const Form = ({ title }: { title: string }) => {
  const [texts, setTexts] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "123 main rich",
    hasRealtor: false,
    brokerage: "",
  });
  const [success, setSuccess] = useState(false);

  const submitData = (event) => {
    event.preventDefault();

    const { name, email, phoneNumber } = texts;
    if (!name || !email || !phoneNumber) {
      return new Error("Fill in the blanks");
    }
    const request = new Request("http://localhost:8080/users/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...texts }),
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
    <div className="form_container">
      <h1>123 Main st, Brooklyn, NY 11206</h1>
      <h3>Open house</h3>
      <div className="form">
        <InputForm handleForm={setTexts} texts={texts} />
        <button type="submit" onClick={submitData}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Form;
