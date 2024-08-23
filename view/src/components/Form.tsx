import React, { useState } from "react";
import "./style/Form.css";

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
        phone_number: event.target.value,
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
    </div>
  );
};

const Form = ({ title }: { title: string }) => {
  const [texts, setTexts] = useState({ name: "", email: "", phone_number: "", address: '123 main rich', has_realtor: false,  brokerage: ''});

  const submitData = (event) => {
    event.preventDefault();

    const { name, email, phone_number } = texts;
    if (!name || !email || !phone_number) {
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
      .catch((e) => {
        new Error(e)
      });
  };
  return (
    <div className="form_container">
      <div className="form">
        <InputForm handleForm={setTexts} texts={texts} />
        <button type="submit" onClick={submitData}>
          {title}
        </button>
      </div>
    </div>
  );
};

export default Form;
