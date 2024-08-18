import React, { useState } from "react";
import "./style/Form.css";

const InputForm = () => {
  const customerInfo = [
    "name",
    "email",
    "phone_number",
    // "address",
    // "has_realtor",
    // "brokerage",
  ];
  const [texts, setTexts] = useState({});

  const handleChange = (event, type) => {
    if (event.target.value) {
      texts[type] = event.target.value
       setTexts({...texts});
       console.log(texts)
    }
  };

  return (
    <>
      {customerInfo.map((type, idx) => {
        return (
          <input
            id={`user${type}Input`}
            type="type"
            key={idx}
            onChange={(e) => handleChange(e, type)}
          />
        );
      })}
    </>
  );
};

const Form = ({ title }: { title: string }) => {
  const submitData = (event) => {
    event.preventDefault();
    const {
      usernameInput,
      useremailInput,
      userphoneNumberInput,
      userhasRealtorInput,
      userbrokerageInput,
    } = event.currentTarget.elements;

    if (!usernameInput || !useremailInput || !userphoneNumberInput) {
    }

    return fetch("http://localhost:8080/users", {
      method: "post",
      mode: "no-cors", // I intsalled cors so I may not need this
    })
      .then((data) => {
        console.log(data, data.body);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // <form className="form_container" onSubmit={submitData}></form>
  return (
    <div className="form_container">
      <InputForm />
      <button type="submit">{title}</button>
    </div>
  );
};

export default Form;
