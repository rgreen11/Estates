import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../Authentication/Cookies";
import "./Form.css";

const InputForm = ({ handleForm, texts }) => {
  const handleChange = (event) => {
    if (event.target.value) {
      return handleForm({
        ...texts,
        [event.target.name]: event.target.value,
      });
    }
  };

  return (
    <div className="form_container">
      <label className="label_nme">Street:</label>
      <input
        name="street"
        id="userNameInput"
        type="text"
        className="input-item"
        value={texts.name}
        onChange={(e) => handleChange(e)}
      />
      <label className="label_nme">City:</label>
      <input
        name="city"
        id="userEmailInput"
        type="text"
        className="input-item"
        value={texts.email}
        onChange={(e) => handleChange(e)}
      />
      <label className="label_nme">Zip Code:</label>
      <input
        name="zipCode"
        id="userNumberInput"
        type="text"
        className="input-item"
        value={texts.phoneNumber}
        onChange={(e) => handleChange(e)}
      />
      <label className="label_nme">State:</label>
      <input
        name="state"
        id="userHasRealtorInput"
        type="text"
        className="input-item"
        value={texts.hasRealtor}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

const AddressForm = ({ setAddressId }) => {
  const [texts, setTexts] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitData = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const { street, city, state, zipCode } = texts;
    if (!street || !city || !state || !zipCode) {
      return new Error("Fill in the blanks");
    }
    const response = await fetch("http://localhost:8080/admin/store_address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // add admin user id
      body: JSON.stringify({ ...texts }),
    });
    // something is off with this
    const result = await response.json();
    console.log({ result });
    setAddressId(result.rows[0].id);
    setCookie('addy', result.rows[0].id);
    navigate("/usr_info");
  };
  return (
    <>
      {success ? (
        // render this for a few seconds
        <h1>Success</h1>
      ) : (
        <form className="form_container" onSubmit={submitData}>
          <h3>Open house Address form</h3>
          <div className="form">
            <InputForm handleForm={setTexts} texts={texts} />
            <input type="submit" value="Submit" />
          </div>
        </form>
      )}
    </>
  );
};

export default AddressForm;
