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
              <div className="user_info"><span className="title_span">Email:</span> <p className="user_info_text">{email}</p></div>
              <div className="user_info"><span className="title_span">Phone:</span> <p className="user_info_text">{phone_number}</p></div>
              <div className="user_info"><span className="title_span">Status:</span> <p className="user_info_text">{has_realtor ? "Has Realtor" : "No Realtor"}</p></div>
              <div className="user_info"><span className="title_span">Address:</span> <p className="user_info_text">{address}</p></div>
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
