import React, { useState, useEffect } from "react";
import { getCookie } from "../Authentication/Cookies";
import "./Form.css";
import { useNavigate } from "react-router-dom";

const InputForm = ({ handleForm, texts }) => {
  const handleTextChange = (event) => {
    const { name, type, value, checked } = event.target;

    // Use `checked` for checkbox, `value` for other input types
    const newValue = type === "checkbox" ? checked : value;

    handleForm({
      ...texts,
      [name]: newValue,
    });
  };

  return (
    <div className="form_container">
      <label className="label_nme">Name:</label>
      <input
        name="name"
        id="userNameInput"
        type="type"
        className="input-item"
        value={texts.name}
        onChange={handleTextChange}
      />
      <label className="label_nme">Email:</label>
      <input
        name="email"
        id="userEmailInput"
        type="type"
        className="input-item"
        value={texts.email}
        onChange={handleTextChange}
      />
      <label className="label_nme">Contact:</label>
      <input
        name="phoneNumber"
        id="userNumberInput"
        type="type"
        className="input-item"
        value={texts.phoneNumber}
        onChange={handleTextChange}
      />
      <label className="label_nme">Check box if you have a realtor:</label>
      <input
        id="userHasRealtorInput"
        type="checkbox"
        className="input-item"
        value={texts.hasRealtor}
        onChange={handleTextChange}
      />
      <label className="label_nme">What's the brokerage:</label>
      <input
        name="brokerage"
        id="userBrokerageInput"
        type="type"
        className="input-item"
        value={texts.brokerage}
        onChange={handleTextChange}
      />
    </div>
  );
};

const UserForm = ({ addressId }) => {
  const navigate = useNavigate();
  const [texts, setTexts] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    hasRealtor: false,
    brokerage: "",
  });

  console.log(texts)
  const [address, setAddress] = useState({
    id: "",
    street: "",
    zip_code: "",
    city: "",
    state: "",
  });

  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!addressId && getCookie("addy")) {
      addressId = getCookie("addy");
    }

    const fetchAddress = async () => {
      try {
        if (addressId) {
          const response = await fetch(
            "http://localhost:8080/admin/retrieve_address",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                addressId,
              },
            },
          );
          const result = await response.json();

          setAddress(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAddress();
  }, []);
  const submitData = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const cookieToken = getCookie("RichAuth");
    const { name, email, phoneNumber } = texts;
    if (!name || !email || !phoneNumber) {
      return new Error("Fill in the blanks");
    }
    try {
      console.log({addressId: address.id})
      const response = await fetch("http://localhost:8080/users/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...texts, cookieToken, addressId: address.id }),
      });
      console.log("hereee");

      setSuccess(true);

      console.log(await response);
    } catch (error) {
      console.log(error);
    }
  };



  if (address && address.street) {
    const { street, zip_code, city, state } = address;

    return (
      <>
        {success ? (
          // render this for a few seconds
          <h1>Success</h1>
        ) : (
          <form className="form_container" onSubmit={submitData}>
            <h1 className="form_address">
              {street},{city},{state},{zip_code}
            </h1>
            <h3>Open house</h3>
            <div className="form">
              <InputForm handleForm={setTexts} texts={texts} />
              <input type="submit" value="Submit" />
            </div>
          </form>
        )}
      </>
    );
  }

  return (
    <div>
      <h1>Create an address first</h1>
      <button onClick={() => navigate("/form")}>Address</button>
    </div>
  );
};

export default UserForm;
