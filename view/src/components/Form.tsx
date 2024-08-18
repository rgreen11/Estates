import React from "react";
import "./style/Form.css";



const Form = ({ title }: { title: string }) => {

  const handleChange = (event) =>{
  
  }


  const submitData = (event) => {
    event.preventDefault();
    const {
      usernameInput,
      useremailInput,
      userphoneNumberInput,

      userhasRealtorInput,
      userbrokerageInput,
    } = event.currentTarget.elements;

    if(!usernameInput || !useremailInput || !userphoneNumberInput){

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

  return (
    <form className="form_container" onSubmit={submitData}>
      <input id="usernameInput" type="name" onChange={handleChange} />
      <input id="useremailInput" type="email" onChange={handleChange} />
      <input id="userphoneNumberInput" type="text" onChange={handleChange} />
      {/* <input id="userHasRealtorInput" type="radio" onChange={handleChange} />
      <input id="userNoRealtorInput" type="radio" onChange={handleChange} /> */}
      <input id="userbrokerageInput" type="text" onChange={handleChange} />
      <button type="submit">{title}</button>
    </form>
  );
};

export default Form;
