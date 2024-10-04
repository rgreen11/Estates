import { useState, useEffect } from "react";
import { getCookie } from "../Authentication/Cookies";
import "./style/ViewMyClients.css"

const ViewMyClients = () => {
  const cookieToken = getCookie("RichAuth");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/admin/all_users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            cookieToken,
          },
        });

        const customers = await response.json();
        setUsers(customers);
      } catch (e) {
        console.error(e);
      }
    };

    getUsers();
  }, [cookieToken]);

  return (
    <div>
      <h1>List of Clients</h1>
      {users.length > 0 ? (
        <div className="client-list">
          {users.map(({ name, email, phone_number, has_realtor, address }, index) => (
            <div key={index} className="client-card">
              <h2 className="cl_name">{name}</h2>
              <p>Email: {email}</p>
              <p>Phone: {phone_number}</p>
              <p>Status: {has_realtor ? "Has Realtor" : "No Realtor"}</p>
              <p>Address: {address}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No clients found.</p>
      )}
    </div>
  );
};

export default ViewMyClients;
